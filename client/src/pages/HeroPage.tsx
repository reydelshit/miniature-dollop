import LiveWellProd from '@/assets/livewellprod.png';
import Header from '@/components/hero-structure/Header';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { useState } from 'react';
import Elite from '../assets/elite.png';
import Executive from '../assets/executive.png';
import Starlight from '../assets/starlite.png';
import Trial from '../assets/trial.jpg';
import Director from '../assets/director.jpg';
import { Player } from 'video-react';
import Healthy from '@/assets/healthy.jpg';

import 'video-react/dist/video-react.css';

const HeroPage = () => {
  const [activeProduct, setActiveProduct] = useState('Director');

  const products = [
    { name: 'Trial', image: Trial },
    { name: 'Starlite', image: Starlight },
    { name: 'Elite', image: Elite },
    { name: 'Executive', image: Executive },
    { name: 'Director', image: Director },
  ];

  return (
    <div className="relative h-full w-full overflow-y-auto">
      <div className="hero-page-bg flex h-full flex-col items-center justify-center">
        {/* Navigation Bar */}
        <Header />

        {/* Product Container */}
        <div className="relative mt-[2rem] h-[700px] w-[90%] max-w-[1200px]">
          <div className="flex items-center justify-between">
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

      <div className="next-page-bg flex h-full flex-col items-center justify-center">
        {/* Bento Section */}
        <div className="my-[4rem] flex h-[800px] w-[90%] max-w-[1200px] flex-col">
          <h1 className="my-4 text-start text-4xl font-bold text-white">
            PACKAGES.
          </h1>

          <div className="flex h-full w-full gap-6">
            <div className="flex h-full w-[70%] flex-col gap-6">
              <div className="h-[1300px] w-full overflow-hidden rounded-3xl bg-black">
                <Player
                  autoPlay={true}
                  poster="https://w0.peakpx.com/wallpaper/127/1000/HD-wallpaper-avengers-poster-hero-endgame-marvel-film-poster-art.jpg"
                  src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                />
              </div>

              <div className="flex h-full gap-6">
                <div className="h-full w-[50%] rounded-3xl bg-green-600 p-4">
                  sss
                </div>
                <div className="flex h-full w-[50%] flex-col items-center justify-center rounded-3xl bg-orange-700 p-4 text-3xl">
                  <h1
                    onMouseEnter={() => {
                      setActiveProduct('Trial');
                    }}
                    className={`cursor-pointer hover:text-white ${activeProduct === 'Trial' ? 'text-white' : ''}`}
                  >
                    TRIAL PACKAGE
                  </h1>
                  <h1
                    onMouseEnter={() => {
                      setActiveProduct('Starlite');
                    }}
                    className={`cursor-pointer hover:text-white ${activeProduct === 'Startlite' ? 'text-white' : ''}`}
                  >
                    STARLIGHT PACKAGE
                  </h1>
                  <h1
                    onMouseEnter={() => {
                      setActiveProduct('Elite');
                    }}
                    className={`cursor-pointer hover:text-white ${activeProduct === 'Elite' ? 'text-white' : ''}`}
                  >
                    ELITE PACKAGE
                  </h1>
                  <h1
                    onMouseEnter={() => {
                      setActiveProduct('Executive');
                    }}
                    className={`cursor-pointer hover:text-white ${activeProduct === 'Executive' ? 'text-white' : ''}`}
                  >
                    EXECUTIVE PACKAGE
                  </h1>
                  <h1
                    onMouseEnter={() => {
                      setActiveProduct('Director');
                    }}
                    className={`cursor-pointer hover:text-white ${activeProduct === 'Director' ? 'text-white' : ''}`}
                  >
                    DIRECTOR PACKAGE
                  </h1>
                </div>
              </div>
            </div>

            <div className="flex h-full w-[30%] flex-col gap-6">
              <div className="h-[70%] overflow-hidden rounded-3xl bg-sky-700">
                {products
                  .filter((prod) => prod.name.includes(activeProduct))
                  .map((product) => (
                    <img
                      key={product.name}
                      src={product.image}
                      alt={product.name}
                      className={`h-full w-full object-fill ${
                        activeProduct === product.name
                          ? 'opacity-100'
                          : 'opacity-20'
                      }`}
                    />
                  ))}
              </div>
              <div className="h-[30%] rounded-3xl bg-purple-600 p-4">ss</div>
            </div>
          </div>
        </div>

        {/* services  */}
        <div className="my-[4rem] flex h-fit w-[90%] max-w-[1200px] flex-col gap-6">
          <h1 className="text-start text-4xl font-bold text-white">
            Our Serivces.
          </h1>

          <div className="flex w-full gap-4">
            <img
              className="h-[250px] w-[400px] rounded-2xl object-cover"
              src={Healthy}
              alt="leathy"
            />
            <div className="flex flex-col items-center justify-center">
              <h1 className="my-8 w-full text-start text-4xl font-semibold text-white">
                EYE SPA
              </h1>
              <p className="text-xl text-white">
                Eye Spa - helps to avoid dry eye conditions such as burning,
                itching, and the feeling of foreign particles. It helps relief
                from several eye strain symptoms. It keeps your eyes refreshed
                and relaxed
              </p>
            </div>
          </div>

          <div className="flex w-full flex-row-reverse gap-4">
            <img
              className="h-[250px] w-[400px] rounded-2xl object-cover"
              src={Healthy}
              alt="leathy"
            />
            <div className="flex flex-col items-center justify-center">
              <h1 className="my-8 w-full text-start text-4xl font-semibold text-white">
                Basic Chiropractor (Bone Setter)
              </h1>
              <p className="text-xl text-white">
                Basic Chiropractor (Bone Setter) is a form of alternative
                medicine or traditionally focus on setting bones and joints to
                treat fractures, dislocations, and other musculoskeletal
                injuries.
              </p>
            </div>
          </div>

          <div className="flex w-full gap-4">
            <img
              className="h-[250px] w-[400px] rounded-2xl object-cover"
              src={Healthy}
              alt="leathy"
            />
            <div className="flex flex-col items-center justify-center">
              <h1 className="my-8 w-full text-start text-4xl font-semibold text-white">
                QMRA
              </h1>
              <p className="text-xl text-white">
                Quantum Magnetic Resonance Analyzer. It is designed in order to
                detect the magnetic field of the human cells and consequently
                through a meticulous analysis process to estimate the health
                state of a person. Can analyze at least 36 cell organs.
              </p>
            </div>
          </div>

          <div className="flex w-full flex-row-reverse gap-4">
            <img
              className="h-[250px] w-[400px] rounded-2xl object-cover"
              src={Healthy}
              alt="leathy"
            />
            <div className="flex flex-col items-center justify-center">
              <h1 className="my-8 w-full text-start text-4xl font-semibold text-white">
                Auricular Acupuncture
              </h1>
              <p className="text-xl text-white">
                Auricular Acupuncture - is a form of alternative medicine based
                on the idea that the ear is a micro system and an external
                organ, which reflects the entire body, represented on the
                auricle, the outer portion of the ear.
              </p>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="my-[4rem] flex h-[600px] w-full items-center justify-center bg-white">
          <div className="flex h-full w-[90%] max-w-[1200px] flex-col justify-center gap-6">
            <h1 className="text-start text-4xl font-bold text-black">
              ABOUT US.
            </h1>

            <div className="flex w-full gap-4">
              <img
                className="h-[400px] w-[400px] rounded-2xl object-cover"
                src={Healthy}
                alt="leathy"
              />
              <div className="flex flex-col items-center justify-center">
                <h1 className="my-8 w-full text-start text-4xl font-semibold text-black">
                  Our Mission & Vision
                </h1>
                <p className="text-xl text-black">
                  LiveWell Marketing Corporation, established on July 10, 2024,
                  is dedicated to promoting health awareness and well-being
                  through innovative solutions. Our mission is to empower
                  individuals to lead healthier lives by providing access to
                  quality products and services that prioritize wellness. We
                  envision a world where everyone has the opportunity to thrive
                  and live well.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroPage;
