import EmptyState from "@/components/EmptyState";
export default function Page() {
  return (
    <>
      <h1 className="mb-6 text-2xl font-bold">Guilds</h1>
      <EmptyState title="No Guilds yet" body="Public Guilds in Iloilo will be listed here." />
    </>
  );
}
