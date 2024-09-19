import ProductDummy from '@/assets/healthy.jpg';
import { Button } from '@/components/ui/button';

const Product = () => {
  return (
    <div
      id="products"
      className="relative mb-4 mt-[5rem] h-full w-[90%] max-w-[1200px]"
    >
      <h1 className="my-4 w-fit p-2 text-4xl font-bold italic text-[#2C1B11]">
        Products.
      </h1>
      <div className="grid h-[800px] grid-cols-4 grid-rows-2 gap-5">
        <div className="bg-cardColor h-fit w-full overflow-hidden rounded-md shadow-md">
          <img className="h-[15rem] w-full" src={ProductDummy} alt="product" />
          <div className="bg-cardColor flex h-[100%] flex-col justify-between p-4">
            <div className="flex w-full justify-between">
              <div>
                <h1 className="text-2xl font-semibold">Terrapin</h1>
                <p>Food, Beverages</p>
              </div>
              <h1 className="font-bold">P 200</h1>
            </div>

            <Button className="bg-secondaryColor my-2 h-[2rem] w-fit self-end">
              Add to cart
            </Button>
          </div>
        </div>
        <div className="bg-cardColor h-fit w-full overflow-hidden rounded-md shadow-md">
          <img className="h-[15rem] w-full" src={ProductDummy} alt="product" />
          <div className="bg-cardColor flex h-[100%] flex-col justify-between p-4">
            <div className="flex w-full justify-between">
              <div>
                <h1 className="text-2xl font-semibold">Terrapin</h1>
                <p>Food, Beverages</p>
              </div>
              <h1 className="font-bold">P 200</h1>
            </div>

            <Button className="bg-secondaryColor my-2 h-[2rem] w-fit self-end">
              Add to cart
            </Button>
          </div>
        </div>
        <div className="bg-cardColor h-fit w-full overflow-hidden rounded-md shadow-md">
          <img className="h-[15rem] w-full" src={ProductDummy} alt="product" />
          <div className="bg-cardColor flex h-[100%] flex-col justify-between p-4">
            <div className="flex w-full justify-between">
              <div>
                <h1 className="text-2xl font-semibold">Terrapin</h1>
                <p>Food, Beverages</p>
              </div>
              <h1 className="font-bold">P 200</h1>
            </div>

            <Button className="bg-secondaryColor my-2 h-[2rem] w-fit self-end">
              Add to cart
            </Button>
          </div>
        </div>
        <div className="bg-cardColor h-fit w-full overflow-hidden rounded-md shadow-md">
          <img className="h-[15rem] w-full" src={ProductDummy} alt="product" />
          <div className="bg-cardColor flex h-[100%] flex-col justify-between p-4">
            <div className="flex w-full justify-between">
              <div>
                <h1 className="text-2xl font-semibold">Terrapin</h1>
                <p>Food, Beverages</p>
              </div>
              <h1 className="font-bold">P 200</h1>
            </div>

            <Button className="bg-secondaryColor my-2 h-[2rem] w-fit self-end">
              Add to cart
            </Button>
          </div>
        </div>
        <div className="bg-cardColor h-fit w-full overflow-hidden rounded-md shadow-md">
          <img className="h-[15rem] w-full" src={ProductDummy} alt="product" />
          <div className="bg-cardColor flex h-[100%] flex-col justify-between p-4">
            <div className="flex w-full justify-between">
              <div>
                <h1 className="text-2xl font-semibold">Terrapin</h1>
                <p>Food, Beverages</p>
              </div>
              <h1 className="font-bold">P 200</h1>
            </div>

            <Button className="bg-secondaryColor my-2 h-[2rem] w-fit self-end">
              Add to cart
            </Button>
          </div>
        </div>{' '}
        <div className="bg-cardColor h-fit w-full overflow-hidden rounded-md shadow-md">
          <img className="h-[15rem] w-full" src={ProductDummy} alt="product" />
          <div className="bg-cardColor flex h-[100%] flex-col justify-between p-4">
            <div className="flex w-full justify-between">
              <div>
                <h1 className="text-2xl font-semibold">Terrapin</h1>
                <p>Food, Beverages</p>
              </div>
              <h1 className="font-bold">P 200</h1>
            </div>

            <Button className="bg-secondaryColor my-2 h-[2rem] w-fit self-end">
              Add to cart
            </Button>
          </div>
        </div>{' '}
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
