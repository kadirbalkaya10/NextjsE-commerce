import ProductCard from "@/components/shared/product/product-card";
import {
  getAllProducts,
  getAllCategories,
} from "@/lib/actions/product.actions";
import Link from "next/link";
import { prices, ratings } from "@/lib/constants";
import { Button } from "@/components/ui/button";

const SearchPage = async (props: {
  searchParams: Promise<{
    query?: string;
    category?: string;
    price?: string;
    rating?: string;
    sort?: string;
    page?: string;
  }>;
}) => {
  const {
    query = "all",
    category = "all",
    price = "all",
    rating = "all",
    sort = "newest",
    page = "1",
  } = await props.searchParams;

  // Construct filter url
  // c,p,r,s,pg stands for category,price,rating,sort,page
  const getFilterUrl = ({
    c,
    p,
    r,
    s,
    pg,
  }: {
    c?: string;
    p?: string;
    r?: string;
    s?: string;
    pg?: string;
  }) => {
    const params = { query, category, price, rating, sort, page };

    if (c) params.category = c;
    if (p) params.price = p;
    if (r) params.rating = r;
    if (s) params.sort = s;
    if (pg) params.page = pg;

    return `/search?${new URLSearchParams(params)}`;
  };

  const products = await getAllProducts({
    query,
    category,
    price,
    rating,
    sort,
    page: Number(page),
  });

  console.log(products.data);
  const categories = await getAllCategories();

  return (
    <div className='grid md:grid-cols-5 md:gap-5'>
      <div className='filter-links'>
        {/* Category Links */}
        <div className='text-xl mb-2 mt-3'>Category</div>
        <div>
          <ul className='space-y-1'>
            <li>
              <Link
                className={`${
                  (category === "all" || category === "") && "font-bold"
                }`}
                href={getFilterUrl({ c: "all" })}>
                Any
              </Link>
            </li>
            {categories.map((x) => (
              <li key={x.category}>
                <Link
                  className={`${category === x.category && "font-bold"}`}
                  href={getFilterUrl({ c: x.category })}>
                  {x.category}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Price Range Links */}
        <div className='text-xl mb-2 mt-3'>Price</div>
        <div>
          <ul className='space-y-1'>
            <li>
              <Link
                className={`${price === "all" && "font-bold"}`}
                href={getFilterUrl({ p: "all" })}>
                Any
              </Link>
            </li>
            {prices.map((p) => (
              <li key={p.value}>
                <Link
                  className={`${price === p.value && "font-bold"}`}
                  href={getFilterUrl({ p: p.value })}>
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Ratings Range Links */}
        <div className='text-xl mb-2 mt-3'>Customer Ratings</div>
        <div>
          <ul className='space-y-1'>
            <li>
              <Link
                className={`${rating === "all" && "font-bold"}`}
                href={getFilterUrl({ r: "all" })}>
                Any
              </Link>
            </li>
            {ratings.map((r) => (
              <li key={r}>
                <Link
                  className={`${rating === r.toString() && "font-bold"}`}
                  href={getFilterUrl({ r: `${r}` })}>
                  {`${r} starts & up`}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='space-y-4 md:col-span-4'>
        <div className='flex-between flex-col my-4 md:flex-row'>
          <div className='flex items-center'>
            {query !== "all" && query !== "" && "Query: " + query}
            {category !== "all" && category !== "" && " Category: " + category}
            {price !== "all" && " Price: " + price}
            {rating !== "all" && " Rating: " + rating + " & up"}
            &nbsp;
            {(query !== "all" && query !== "") ||
            (category !== "all" && category !== "") ||
            price !== "all" ||
            rating !== "all" ? (
              <Button variant={"link"} asChild>
                <Link href='/search'>clear</Link>
              </Button>
            ) : null}
          </div>
          <div>{/* Sort */}</div>
        </div>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
          {products.data.length === 0 && "No Products Found"}
          {products.data.map((x) => (
            <ProductCard key={x.id} product={x} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
