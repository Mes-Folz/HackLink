import EmptyState from "@/components/EmptyState";
export default function Page() {
  return (
    <>
      <h1 className="mb-6 text-2xl font-bold">Hackathons</h1>
      <EmptyState title="No hackathons yet" body="Upcoming events hosted by Iloilo Guilds will be listed here." />
    </>
  );
}
