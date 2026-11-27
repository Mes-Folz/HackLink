export type FeedPost = {
  id: string;
  body: string;
  createdAt: Date;
  author: { id: string; displayName: string | null; username: string | null; focus: string | null };
  likes: { userId: string }[];
  comments: {
    id: string;
    body: string;
    createdAt: Date;
    author: { displayName: string | null; username: string | null };
  }[];
};

export type GuildListItem = {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  visibility: "PUBLIC" | "PRIVATE";
  _count: { memberships: number };
};

export type EventListItem = {
  id: string;
  slug: string;
  title: string;
  description: string;
  topic: string;
  startsAt: Date;
  registrationDeadline: Date;
  isOnline: boolean;
  location: string | null;
  capacity: number | null;
  reservedSlots: number;
  status: "DRAFT" | "PUBLISHED" | "CANCELLED" | "COMPLETED";
  hostGuild: { name: string; slug: string; visibility: "PUBLIC" | "PRIVATE" };
};

export function displayName(user: { displayName: string | null; username: string | null }) {
  return user.displayName || user.username || "HackLink member";
}

export function initialsForName(value: string) {
  return value.split(/\s+/).slice(0, 2).map((part) => part[0] ?? "").join("").toUpperCase() || "HL";
}
