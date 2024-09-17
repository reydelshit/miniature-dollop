import LiveWellProd from '@/assets/livewellprod.png';
import Header from '@/components/hero-structure/Header';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
const HeroPage = () => {
  return (
    <div className="hero-page-bg relative min-h-screen w-full overflow-y-auto">
      <div className="flex h-full flex-col items-center justify-center">
        {/* Navigation Bar */}
        <Header />

        {/* Product Container */}
        <div className="relative mt-[2rem] h-full w-[90%] max-w-[1200px]">
          <div className="flex items-center justify-between">
            {/* Left Side - Text */}
            <div className="w-[50%] space-y-4 break-words text-white">
              <span className="text-sm text-white opacity-70">
                hello, welcome!
              </span>
              <h1 className="break-words text-5xl font-bold">
                Discover a Healthier Lifestyle Today
              </h1>
              <p className="cursor-pointer p-2 text-lg opacity-70 hover:underline">
                Explore →
              </p>
            </div>

            {/* Center - Product Image */}
            <div className="relative">
              <img
                src={LiveWellProd}
                alt="Product"
                className="h-[460px] w-[400px] object-fill"
              />
            </div>

            <div className="flex w-[50%] justify-end space-y-4 text-white">
              <div className="w-[80%]">
                <p>
                  Join our community sharing initiatives where health and
                  wellness are at the forefront. Through sharing opportunities,
                  we aim to create a supportive network that encourages healthy
                  living, positivity, and a sense of togetherness.
                </p>

                <Button className="my-4 rounded-full bg-white px-4 py-2 text-[#83142D]">
                  Join now
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-12 flex items-center justify-between">
            <p className="max-w-[300px] text-sm text-white opacity-70">
              Our PharmaZinc products are specially formulated to enhance your
              immune system and promote overall well-being. With our unique
              blend, you can enjoy the benefits of Vitamin C in a more effective
              and efficient way, ensuring your body stays strong and healthy.
            </p>
            <Button className="ml-[-10rem] h-[4rem] w-[4rem] animate-bounce rounded-full bg-white">
              <ArrowDown className="text-black" size={25} />
            </Button>
            <div className="flex items-center space-x-4">
              <Button className="rounded-full bg-white px-4 py-2 text-[#83142D]">
                More Products
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroPage;
