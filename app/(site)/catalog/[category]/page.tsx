import Category from "@/components/Category";
import { validCategories } from "@/constants/categories";
// TODO: make it prerendered
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  if (!validCategories.includes(category)) {
    return <div>Категорія {category} не знайдена</div>;
  }

  return (
    <section>
      <h1>Категорія: {category}</h1>
      <Category />
    </section>
  );
}
