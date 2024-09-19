import LiveWellProd from '@/assets/livewellprod.png';
import Header from '@/components/hero/Header';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

import 'video-react/dist/video-react.css';
import Bento from './Bento';
import Services from './Services';
import About from './About';
import Footer from './Footer';
import Product from './Product';

// main bg bg-[#F5F5F2]

const HeroPage = () => {
  return (
    <div className="relative h-full w-full bg-[#2C1B11] text-[#FFF4E5]">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <Header />

        <div className="relative flex h-[680px] w-[90%] max-w-[1200px] items-center justify-center">
          <div className="flex items-center justify-center text-center">
            <div className="w-[70%] space-y-4 break-words text-[#FFF4E5]">
              <span className="text-sm text-[#FFF4E5] opacity-70">
                hello, welcome!
              </span>
              <h1 className="font-Alegraya break-words text-6xl leading-tight">
                <span className="bg-yellow-300 px-2 font-semibold italic text-[#2C1B11]">
                  Discover
                </span>{' '}
                a Healthier Lifestyle Today
              </h1>
              <p className="cursor-pointer p-2 text-lg opacity-70 hover:underline">
                Explore →
              </p>
            </div>

            {/* <div className="relative">
              <img
                src={LiveWellProd}
                alt="Product"
                className="h-[460px] w-[400px] object-fill"
              />
            </div>

            <div className="flex w-[50%] justify-end space-y-4 text-black">
              <div className="w-[80%]">
                <p>
                  Join our community sharing initiatives where health and
                  wellness are at the forefront. Through sharing opportunities,
                  we aim to create a supportive network that encourages healthy
                  living, positivity, and a sense of togetherness.
                </p>

                <Button className="my-4 rounded-full bg-yellow-300 px-4 py-2 text-black">
                  Join now
                </Button>
              </div>
            </div> */}
          </div>

          {/* Bottom Section */}
          {/* <div className="mt-12 flex items-center justify-between">
            <p className="max-w-[300px] text-sm text-black opacity-70">
              Our PharmaZinc products are specially formulated to enhance your
              immune system and promote overall well-being. With our unique
              blend, you can enjoy the benefits of Vitamin C in a more effective
              and efficient way, ensuring your body stays strong and healthy.
            </p>
            <Button className="ml-[-10rem] h-[4rem] w-[4rem] animate-bounce rounded-full bg-yellow-300">
              <ArrowDown className="text-black" size={25} />
            </Button>
            <div className="flex items-center space-x-4">
              <Button className="rounded-full bg-yellow-300 px-4 py-2 text-black">
                More Products
              </Button>
            </div>
          </div> */}
        </div>

        <div className="flex h-full w-full flex-col items-center justify-center">
          <Bento />
          <Product />
          <Services />
          <About />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default HeroPage;
