import EmptyState from "@/components/EmptyState";
export default function Page() {
  return (
    <>
      <h1 className="mb-6 text-2xl font-bold">Notifications</h1>
      <EmptyState title="You're all caught up" body="Connection requests, invitations and event updates will appear here." />
    </>
  );
}
