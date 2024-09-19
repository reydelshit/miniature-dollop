import healthy from '@/assets/healthy.jpg';
import VideoContainer from '@/components/hero/VideoContainer';
import { useState } from 'react';
import Director from '../assets/director.jpg';
import Elite from '../assets/elite.png';
import Executive from '../assets/executive.png';
import Starlight from '../assets/starlite.png';
import Trial from '../assets/trial.jpg';

const Bento = () => {
  const [activeProduct, setActiveProduct] = useState('Director');

  const products = [
    {
      name: 'Trial',
      image: Trial,
      price: 500,
      privileges: [
        'Unlimited Direct Referrals',
        'Up to 8th Level Indirect Referrals',
        '30% discount on PharmaZinc',
        '25% discount on Wellness Services',
      ],
      rank: 'Bronze Rank',
      inclusions: '20 Capsules',
    },
    {
      name: 'Starlite',
      image: Starlight,
      price: 1500,
      privileges: [
        'Up to 15th Level earnings',
        'Next purchase of P1500 > Buy 1 Take 1',
        'Up to 30% discount on Wellness Services',
      ],
      rank: 'Silver Rank',
      inclusions: '1 Bottle of PharmaZinc',
    },
    {
      name: 'Elite',
      image: Elite,
      price: 4500,
      privileges: [
        'Up to 15th Level earnings',
        'Next purchase of P1500 > Buy 1 Take 1',
        'Up to 35% discount on Wellness Services',
      ],
      rank: 'Gold Rank',
      inclusions: '3 Bottles of PharmaZinc',
    },
    {
      name: 'Executive',
      image: Executive,
      price: 10500,
      privileges: [
        'Up to 15th Level earnings',
        'Next purchase of P1500 > Buy 1 Take 1',
        'Up to 40% discount on Wellness Services',
        '13,500 VALUE FOR MONEY',
      ],
      rank: 'Platinum Rank',
      inclusions: '7 Bottles of PharmaZinc + 2 bottles Free',
    },
    {
      name: 'Director',
      image: Director,
      price: 22500,
      privileges: [
        'Up to 15th Level earnings',
        'Next purchase of P1500 > Buy 1 Take 1',
        'Up to 50% discount on Wellness Services',
        '30,000 VALUE FOR MONEY',
      ],
      rank: 'Diamond Rank',
      inclusions: '15 Bottles of PharmaZinc + 5 bottles Free',
    },
  ];

  return (
    <>
      <div className="my-[4rem] flex h-[800px] w-[90%] max-w-[1200px] flex-col">
        <h1 className="my-4 w-fit bg-yellow-300 p-2 text-start text-4xl font-bold italic text-[#2C1B11]">
          PACKAGES.
        </h1>

        <div className="flex h-full w-full gap-6">
          <div className="flex h-full w-[70%] flex-col gap-6">
            <div className="flex h-[1000px] w-full items-center overflow-hidden rounded-3xl bg-transparent">
              <VideoContainer
                poster={healthy}
                src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
              />
            </div>

            <div className="flex h-full gap-6">
              <div className="flex h-full w-[50%] flex-col items-center justify-center gap-4 rounded-3xl bg-[#4A3427] p-4 text-[#FEF3E4] shadow-lg">
                <div>
                  <h1 className="font-Rokkit text-3xl font-bold">
                    PharmaZinc - Alkaline Vitamin C
                  </h1>
                  <h2 className="font-Rokkit text-lg font-bold">
                    Boost Your Immunity
                  </h2>
                  <span className="font-Rokkit text-lg font-bold">
                    FDA Reg. No. FR-40000011334448
                  </span>
                </div>
                <p className="text-sm">
                  Our PharmaZinc products are specially formulated to enhance
                  your immune system and promote overall well-being. With our
                  unique blend, you can enjoy the benefits of Vitamin C in a
                  more effective and efficient way, ensuring your body stays
                  strong and healthy.
                </p>
              </div>
              <div className="flex h-full w-[50%] flex-col items-end rounded-3xl bg-[#4A3427] p-4 text-3xl font-bold text-[#FEF3E4] shadow-lg">
                <div className="mb-[2rem] w-full text-start">
                  <h1 className="font-Rokkit">Packages</h1>
                </div>
                <h1
                  onMouseEnter={() => {
                    setActiveProduct('Trial');
                  }}
                  className={`font-Rokkit cursor-pointer hover:text-[#FCBF26] ${activeProduct === 'Trial' ? 'text-[#FCBF26]' : ''} italic`}
                >
                  {activeProduct === 'Trial' && '👋'} TRIAL PACKAGE
                </h1>
                <h1
                  onMouseEnter={() => {
                    setActiveProduct('Starlite');
                  }}
                  className={`font-Rokkit cursor-pointer hover:text-[#FCBF26] ${activeProduct === 'Startlite' ? 'text-[#FCBF26]' : ''} italic`}
                >
                  {activeProduct === 'Starlite' && '👋'} STARLIGHT PACKAGE
                </h1>
                <h1
                  onMouseEnter={() => {
                    setActiveProduct('Elite');
                  }}
                  className={`font-Rokkit cursor-pointer hover:text-[#FCBF26] ${activeProduct === 'Elite' ? 'text-[#FCBF26]' : ''} italic`}
                >
                  {activeProduct === 'Elite' && '👋'}ELITE PACKAGE
                </h1>
                <h1
                  onMouseEnter={() => {
                    setActiveProduct('Executive');
                  }}
                  className={`font-Rokkit cursor-pointer hover:text-[#FCBF26] ${activeProduct === 'Executive' ? 'text-[#FCBF26]' : ''} italic`}
                >
                  {activeProduct === 'Executive' && '👋'} EXECUTIVE PACKAGE
                </h1>
                <h1
                  onMouseEnter={() => {
                    setActiveProduct('Director');
                  }}
                  className={`font-Rokkit cursor-pointer hover:text-[#FCBF26] ${activeProduct === 'Director' ? 'text-[#FCBF26]' : ''} italic`}
                >
                  {activeProduct === 'Director' && '👋'}DIRECTOR PACKAGE
                </h1>
              </div>
            </div>
          </div>

          <div className="flex h-full w-[30%] flex-col gap-6">
            <div className="h-[60%] rounded-3xl bg-[#4A3427] p-4 text-[#FEF3E4] shadow-xl">
              {products
                .filter((prod) => prod.name.includes(activeProduct))
                .map((product) => (
                  <div className="relative flex h-full flex-col justify-center">
                    <h1 className="font-Rokkit absolute top-5 w-[65%] break-words rounded-md p-2 text-4xl font-bold">
                      {product.name} Package
                    </h1>

                    {/* <div className="absolute right-[-120px] top-[-100px] z-20">
                      <img
                        className="w-[15rem] rotate-12 rounded-md"
                        src={product.image}
                        alt={product.name}
                      />
                    </div> */}

                    <div className="my-4 w-full rounded-md p-2">
                      <h1 className="font-semibold">Inclusions</h1>
                      <p className="text-[#cdcece]">{product.inclusions}</p>
                    </div>

                    <div className="w-fit rounded-md p-2">
                      <h1 className="font-bold">Privileges</h1>
                      {product.privileges.map((priv, index) => (
                        <span
                          key={index}
                          className="block list-disc text-[#cdcece]"
                        >
                          - {priv}
                        </span>
                      ))}
                    </div>

                    <div className="absolute bottom-0 my-4 flex w-full items-center justify-between">
                      <h1 className="font-Rokkit text-4xl font-bold">
                        ₱ {product.price}
                      </h1>
                      <span className="font-semibold">{product.rank}</span>
                    </div>
                  </div>
                ))}
            </div>
            <div className="h-[40%] overflow-hidden rounded-3xl bg-transparent shadow-xl">
              {products
                .filter((prod) => prod.name.includes(activeProduct))
                .map((product) => (
                  <img
                    src={product.image}
                    className="h-full w-full object-fill"
                    alt="image"
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bento;
