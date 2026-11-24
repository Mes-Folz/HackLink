import EmptyState from "@/components/EmptyState";
export default function Page() {
  return (
    <>
      <h1 className="mb-6 text-2xl font-bold">Explore</h1>
      <EmptyState title="Nothing to explore yet" body="People, Guilds and hackathons in Iloilo will appear here." />
    </>
  );
}
