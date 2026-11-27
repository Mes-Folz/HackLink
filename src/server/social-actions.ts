"use server";

import { revalidatePath } from "next/cache";
import { ALLOWED_REGIONS } from "@/config/regions";
import { getPrisma } from "@/server/db";
import { canUseCommunityAccount, commentSchema, postSchema } from "@/server/community-validation";
import { requireUserId } from "@/server/permissions";
import type { FormActionState } from "@/server/profile-actions";

export async function createPost(_previous: FormActionState, formData: FormData): Promise<FormActionState> {
  const parsed = postSchema.safeParse({ body: formData.get("body") });
  if (!parsed.success) return { error: "Write a post of up to 2,000 characters." };
  const authorId = await requireUserId();
  await getPrisma().post.create({ data: { authorId, body: parsed.data.body } });
  revalidatePath("/home");
  return { success: "Your post is live." };
}

export async function togglePostLike(postId: string, _formData: FormData) {
  const userId = await requireUserId();
  const db = getPrisma();
  await db.$transaction(async (tx) => {
    const existing = await tx.postLike.findUnique({
      where: { postId_userId: { postId, userId } },
      select: { id: true },
    });
    if (existing) {
      await tx.postLike.delete({ where: { id: existing.id } });
      return;
    }

    const post = await tx.post.findUnique({
      where: { id: postId },
      select: { authorId: true, author: { select: { adultAttestedAt: true } } },
    });
    if (!post || !post.author.adultAttestedAt) throw new Error("Post not found.");
    await tx.postLike.create({ data: { postId, userId } });
    if (post.authorId !== userId) {
      await tx.notification.create({
        data: {
          recipientId: post.authorId,
          actorId: userId,
          type: "POST_LIKE",
          title: "Someone liked your post",
          message: "Your post received a new like.",
          href: "/home",
        },
      });
    }
  });
  revalidatePath("/home");
  revalidatePath("/profile");
}

export async function addComment(postId: string, _previous: FormActionState, formData: FormData): Promise<FormActionState> {
  const parsed = commentSchema.safeParse({ body: formData.get("body") });
  if (!parsed.success) return { error: "Write a comment of up to 1,000 characters." };
  const authorId = await requireUserId();
  const db = getPrisma();
  const created = await db.$transaction(async (tx) => {
    const post = await tx.post.findUnique({
      where: { id: postId },
      select: { authorId: true, author: { select: { adultAttestedAt: true } } },
    });
    if (!post || !post.author.adultAttestedAt) return false;
    await tx.comment.create({ data: { postId, authorId, body: parsed.data.body } });
    if (post.authorId !== authorId) {
      await tx.notification.create({
        data: {
          recipientId: post.authorId,
          actorId: authorId,
          type: "POST_COMMENT",
          title: "Someone commented on your post",
          message: parsed.data.body.slice(0, 120),
          href: "/home",
        },
      });
    }
    return true;
  });
  if (!created) {
    return { error: "This post is no longer available." };
  }
  revalidatePath("/home");
  return { success: "Comment added." };
}

export async function sendConnectionRequest(targetUserId: string, _formData: FormData) {
  const requesterId = await requireUserId();
  if (requesterId === targetUserId) throw new Error("You cannot connect with yourself.");
  const db = getPrisma();
  await db.$transaction(async (tx) => {
    const target = await tx.user.findUnique({
      where: { id: targetUserId },
      select: { id: true, username: true, regionId: true, area: true, waitlistedAt: true, emailVerifiedAt: true, adultAttestedAt: true },
    });
    if (!target || !canUseCommunityAccount(target, ALLOWED_REGIONS.map((region) => region.id))) {
      throw new Error("This member is not available for connections.");
    }

    const connection = await tx.connection.findFirst({
      where: {
        OR: [
          { requesterId, recipientId: targetUserId },
          { requesterId: targetUserId, recipientId: requesterId },
        ],
      },
    });
    if (connection?.status === "ACCEPTED") return;
    if (connection?.status === "PENDING" && connection.recipientId !== requesterId) return;

    if (connection?.status === "PENDING") {
      await tx.connection.update({ where: { id: connection.id }, data: { status: "ACCEPTED" } });
      await tx.notification.create({
        data: {
          recipientId: connection.requesterId,
          actorId: requesterId,
          type: "CONNECTION_ACCEPTED",
          title: "Connection request accepted",
          message: "You are now connected.",
          href: "/connections",
        },
      });
      return;
    }
    if (connection) {
      await tx.connection.update({
        where: { id: connection.id },
        data: { requesterId, recipientId: targetUserId, status: "PENDING" },
      });
    } else {
      await tx.connection.create({ data: { requesterId, recipientId: targetUserId } });
    }
    await tx.notification.create({
      data: {
        recipientId: targetUserId,
        actorId: requesterId,
        type: "CONNECTION_REQUEST",
        title: "New connection request",
        message: "Someone in the community would like to connect.",
        href: "/connections",
      },
    });
  });
  revalidatePath("/connections");
  revalidatePath("/explore");
}

export async function respondToConnection(connectionId: string, status: "ACCEPTED" | "REJECTED", _formData: FormData) {
  const recipientId = await requireUserId();
  const db = getPrisma();
  await db.$transaction(async (tx) => {
    const result = await tx.connection.updateMany({
      where: {
        id: connectionId,
        recipientId,
        status: "PENDING",
        requester: { is: { adultAttestedAt: { not: null } } },
      },
      data: { status },
    });
    if (result.count !== 1) throw new Error("This connection request is no longer pending.");
    const connection = await tx.connection.findUniqueOrThrow({
      where: { id: connectionId },
      select: { requesterId: true },
    });
    if (status === "ACCEPTED") {
      await tx.notification.create({
        data: {
          recipientId: connection.requesterId,
          actorId: recipientId,
          type: "CONNECTION_ACCEPTED",
          title: "Connection request accepted",
          message: "You are now connected.",
          href: "/connections",
        },
      });
    }
  });
  revalidatePath("/connections");
}

export async function removeConnection(connectionId: string, _formData: FormData) {
  const userId = await requireUserId();
  const result = await getPrisma().connection.deleteMany({
    where: { id: connectionId, status: "ACCEPTED", OR: [{ requesterId: userId }, { recipientId: userId }] },
  });
  if (result.count !== 1) throw new Error("Connection not found.");
  revalidatePath("/connections");
}

export async function markNotificationRead(notificationId: string, _formData: FormData) {
  const recipientId = await requireUserId();
  await getPrisma().notification.updateMany({
    where: { id: notificationId, recipientId, readAt: null },
    data: { readAt: new Date() },
  });
  revalidatePath("/notifications");
}

export async function markAllNotificationsRead(_formData: FormData) {
  const recipientId = await requireUserId();
  await getPrisma().notification.updateMany({
    where: { recipientId, readAt: null },
    data: { readAt: new Date() },
  });
  revalidatePath("/notifications");
}

