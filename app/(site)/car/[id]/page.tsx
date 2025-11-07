// TODO: make it prerendered
export default async function CarPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

  return (
    <section>
      <h1>Машинка: {id}</h1>
    </section>
  );
}
