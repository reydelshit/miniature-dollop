import { useState } from 'react';
import { Player } from 'video-react';
import Director from '../assets/director.jpg';
import Elite from '../assets/elite.png';
import Executive from '../assets/executive.png';
import Starlight from '../assets/starlite.png';
import Trial from '../assets/trial.jpg';
import ProductDummy from '@/assets/healthy.jpg';

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
        <h1 className="my-4 w-fit bg-yellow-300 p-2 text-start text-4xl font-bold text-black">
          PACKAGES.
        </h1>

        <div className="flex h-full w-full gap-6">
          <div className="flex h-full w-[70%] flex-col gap-6">
            <div className="h-[1300px] w-full overflow-hidden rounded-3xl bg-black">
              <Player
                // autoPlay={true}
                poster={ProductDummy}
                src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
              />
            </div>

            <div className="flex h-full gap-6">
              <div className="flex h-full w-[50%] flex-col gap-4 rounded-3xl bg-gradient-to-t from-green-100 via-yellow-100 to-pink-100 p-4">
                <div>
                  <h1 className="text-xl font-bold">
                    PharmaZinc - Alkaline Vitamin C
                  </h1>
                  <h2 className="text-lg font-bold">Boost Your Immunity</h2>
                  <span className="text-lg font-bold">
                    FDA Reg. No. FR-40000011334448
                  </span>
                </div>
                <p>
                  Our PharmaZinc products are specially formulated to enhance
                  your immune system and promote overall well-being. With our
                  unique blend, you can enjoy the benefits of Vitamin C in a
                  more effective and efficient way, ensuring your body stays
                  strong and healthy.
                </p>
              </div>
              <div className="flex h-full w-[50%] flex-col items-center justify-center rounded-3xl bg-[#4A3427] p-4 text-3xl font-bold text-white">
                <h1
                  onMouseEnter={() => {
                    setActiveProduct('Trial');
                  }}
                  className={`cursor-pointer hover:text-yellow-300 ${activeProduct === 'Trial' ? 'text-yellow-300' : ''}`}
                >
                  {activeProduct === 'Trial' && '👋'} TRIAL PACKAGE
                </h1>
                <h1
                  onMouseEnter={() => {
                    setActiveProduct('Starlite');
                  }}
                  className={`cursor-pointer hover:text-yellow-300 ${activeProduct === 'Startlite' ? 'text-yellow-300' : ''}`}
                >
                  {activeProduct === 'Starlite' && '👋'} STARLIGHT PACKAGE
                </h1>
                <h1
                  onMouseEnter={() => {
                    setActiveProduct('Elite');
                  }}
                  className={`cursor-pointer hover:text-yellow-300 ${activeProduct === 'Elite' ? 'text-yellow-300' : ''}`}
                >
                  {activeProduct === 'Elite' && '👋'}ELITE PACKAGE
                </h1>
                <h1
                  onMouseEnter={() => {
                    setActiveProduct('Executive');
                  }}
                  className={`cursor-pointer hover:text-yellow-300 ${activeProduct === 'Executive' ? 'text-yellow-300' : ''}`}
                >
                  {activeProduct === 'Executive' && '👋'} EXECUTIVE PACKAGE
                </h1>
                <h1
                  onMouseEnter={() => {
                    setActiveProduct('Director');
                  }}
                  className={`cursor-pointer hover:text-yellow-300 ${activeProduct === 'Director' ? 'text-yellow-300' : ''}`}
                >
                  {activeProduct === 'Director' && '👋'}DIRECTOR PACKAGE
                </h1>
              </div>
            </div>
          </div>

          <div className="flex h-full w-[30%] flex-col gap-6">
            <div className="h-[70%] overflow-hidden rounded-3xl bg-gradient-to-t from-green-100 via-yellow-100 to-pink-100 p-4">
              {products
                .filter((prod) => prod.name.includes(activeProduct))
                .map((product) => (
                  <div>
                    <h1 className="w-fit rounded-md bg-[#F5F5F2] p-2 text-2xl font-bold">
                      {product.name} Package
                    </h1>
                    <div className="my-4 w-full rounded-md bg-[#F5F5F2] p-2">
                      <h1 className="font-semibold">Inclusions</h1>
                      <p>{product.inclusions}</p>
                    </div>

                    <div className="w-fit rounded-md bg-[#F5F5F2] p-2">
                      {' '}
                      <h1 className="font-bold">Privileges</h1>
                      {product.privileges.map((priv, index) => (
                        <span key={index} className="block list-disc">
                          - {priv}
                        </span>
                      ))}
                    </div>

                    <div className="my-4 flex w-full justify-between">
                      <h1 className="text-4xl font-bold">₱ {product.price}</h1>
                      <span className="font-semibold">{product.rank}</span>
                    </div>
                  </div>
                ))}
            </div>
            <div className="h-[30%] overflow-hidden rounded-3xl bg-purple-600">
              <img src={ProductDummy} className="h-full w-full" alt="image" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bento;
