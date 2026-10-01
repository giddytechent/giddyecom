import ProductList from "@/components/ProductList";

/**
 * Renders the products page using the selected category, sort order, and search query.
 *
 * @param searchParams - Query parameters used to filter and order the product list
 */
export default async function ProductsPage({searchParams}:{searchParams: Promise<{category:string; sort: string; search: string}>}) {

  const category = (await searchParams).category
  const sort = (await searchParams).sort
  const search = (await searchParams).search

    return (
        <div>
            <ProductList category={category} sort={sort} search={search} params="products" />
        </div>
    )
}