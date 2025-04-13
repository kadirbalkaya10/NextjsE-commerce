import ProductCard from "@/components/shared/product/product-card";
import { Button } from "@/components/ui/button";
import { getAllProducts } from "@/lib/actions/product.actions";

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
    if (p) params.category = p;
    if (r) params.category = r;
    if (s) params.category = s;
    if (pg) params.category = pg;

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

  return (
    <div className='grid md:grid-cols-5 md:gap-5'>
      <div className='filter-links'>{/* Filters */}</div>
      <div className='space-y-4 md:col-span-4'>
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
