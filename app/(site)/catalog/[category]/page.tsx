import Category from "@/components/Category";
import { validCategories } from "@/constants/categories";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function CategoryPage({
  params,
  searchParams,
}: PageProps) {
  const { category } = await params;
  const sp = await searchParams;

  if (!validCategories.includes(category)) {
    notFound();
  }

  const page = Math.max(1, parseInt(sp.page || "1", 10));

  // All filters from URL (excluding page)
  const filters = { ...sp };
  delete filters.page;

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Категорія: {category.charAt(0).toUpperCase() + category.slice(1)}
      </h1>

      <Category category={category} page={page} filters={filters} />
    </section>
  );
}
