import EmptyState from "@/components/EmptyState";
export default function Page() {
  return (
    <>
      <h1 className="mb-6 text-2xl font-bold">Home</h1>
      <EmptyState title="Your feed is empty" body="Posts from you, your connections and your Guilds will show up here." />
    </>
  );
}
