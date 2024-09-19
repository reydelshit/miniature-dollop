import ProductDummy from '@/assets/healthy.jpg';
import ImageComponent from '@/components/hero/ImageComponent';
import { Button } from '@/components/ui/button';
import { MTR_Stock } from '@/types';
import useSWR from 'swr';

const Product = () => {
  const fetcher = async (url: string): Promise<MTR_Stock[]> => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  const {
    data: products,
    error,
    isLoading,
    mutate,
  } = useSWR(`${import.meta.env.VITE_SERVER_LINK}/product`, fetcher);

  console.log(products);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div
      id="products"
      className="relative mb-4 mt-[5rem] h-full w-[90%] max-w-[1200px]"
    >
      <h1 className="my-4 w-fit p-2 text-4xl font-bold italic text-[#2C1B11]">
        Products.
      </h1>
      <div className="grid h-[850px] grid-cols-4 gap-5">
        {products
          ?.map((prod) => (
            <div className="bg-cardColor h-[400px] w-full overflow-hidden rounded-md shadow-md">
              {prod.Image ? (
                <ImageComponent buffer={prod.Image} alt={prod.Description} />
              ) : (
                <img src={ProductDummy} alt="Product" />
              )}
              <div className="bg-cardColor relative flex h-[40%] flex-col justify-between border-2 p-4">
                <div className="flex w-full justify-between">
                  <div>
                    <h1 className="text-md w-[60%] break-words font-semibold">
                      {prod.Description}
                    </h1>
                    <p className="w-[60%] break-words">
                      {prod.CategoriesCode}, {prod.SubCategoriesCode}
                    </p>
                  </div>
                  <h1 className="w-[50%] text-end text-xl font-bold">P 200</h1>
                </div>

                <Button className="bg-secondaryColor absolute bottom-2 my-2 h-[2rem] w-fit self-end">
                  Add to cart
                </Button>
              </div>
            </div>
          ))
          .slice(0, 8)}
      </div>

      <div className="mt-4 flex justify-center">
        <Button className="bg-secondaryColor rounded-full px-4 py-2 text-black">
          View all products
        </Button>
      </div>
    </div>
  );
};

export default Product;
