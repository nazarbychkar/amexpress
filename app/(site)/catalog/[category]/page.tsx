// app/[category]/page.tsx
import Category from "@/components/Category";
import { validCategories } from "@/constants/categories";
import { notFound } from "next/navigation";

interface PageProps {
  params: { category: string };
  searchParams: { page?: string };
}

// TODO: make it prerendered (see note below)
export default async function CategoryPage({
  params,
  searchParams,
}: PageProps) {
  const { category } = await params;
  const sp = await searchParams;

  if (!validCategories.includes(category)) {
    notFound(); // cleaner than rendering manual text
  }

  const page = Math.max(1, parseInt(sp.page || "1", 10));

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Категорія: {category.charAt(0).toUpperCase() + category.slice(1)}
      </h1>

      {/* Pass both page + category to Category component */}
      <Category category={category} page={page} />
    </section>
  );
}
