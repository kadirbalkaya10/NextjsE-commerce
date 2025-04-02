const ProductList = ({
  data,
  title,
  limit,
}: {
  data: any;
  title?: string;
  limit?: number;
}) => {
  const limitedData = limit ? data.slice(0, limit) : data;

  return (
    <div className='my-10'>
      <h2 className='h2-bold mb-4'>{title}</h2>
      {data.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {limitedData.map((product: any) => (
            <div key={product}>{product.name}</div>
          ))}
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center'>
          <h2 className='h2-bold mb-4'>No Products Found</h2>
          <p className='text-gray-500'>Please check back later.</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
