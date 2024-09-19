import BoneSetting from '@/assets/bones.jpg';
import Healthy from '@/assets/healthy.jpg';
import QMRA from '@/assets/qmra.jpg';
const Services = () => {
  return (
    <>
      <div className="my-[4rem] flex h-fit w-full flex-col items-center justify-center">
        <div className='text-start" mt-[2rem] w-[90%] max-w-[1200px]'>
          <h1 className="w-fit bg-yellow-300 p-2 text-4xl font-bold italic text-[#2C1B11]">
            Our Serivces.
          </h1>
        </div>

        <div className="my-[4rem] flex h-fit w-[90%] max-w-[1200px] items-center gap-4">
          <img
            className="h-[250px] w-[500px] rounded-2xl object-cover"
            src={Healthy}
            alt="leathy"
          />
          <div className="flex flex-col items-start justify-center text-start">
            <h1 className="my-8 w-fit p-2 text-start text-4xl font-semibold text-[#FFF4E5]">
              EYE SPA
            </h1>
            <p className="text-xl text-[#FFF4E5]">
              Eye Spa - helps to avoid dry eye conditions such as burning,
              itching, and the feeling of foreign particles. It helps relief
              from several eye strain symptoms. It keeps your eyes refreshed and
              relaxed
            </p>
          </div>
        </div>

        <div className="flex h-[500px] w-full items-center justify-center bg-[#FCBF26]">
          <div className="flex w-[90%] max-w-[1200px] flex-row-reverse gap-4">
            <img
              className="h-[400px] w-[80%] rounded-2xl object-contain"
              src={BoneSetting}
              alt="leathy"
            />
            <div className="flex flex-col items-center justify-center">
              <h1 className="my-8 w-full text-start text-4xl font-semibold text-[#2C1B11]">
                Basic Chiropractor (Bone Setter)
              </h1>
              <p className="text-xl text-[#2C1B11]">
                Basic Chiropractor (Bone Setter) is a form of alternative
                medicine or traditionally focus on setting bones and joints to
                treat fractures, dislocations, and other musculoskeletal
                injuries.
              </p>
            </div>
          </div>
        </div>

        <div className="flex h-[500px] w-[90%] max-w-[1200px] items-center gap-4">
          <img
            className="h-[400px] w-[80%] rounded-2xl object-contain"
            src={QMRA}
            alt="leathy"
          />
          <div className="flex flex-col items-center justify-center">
            <h1 className="my-8 w-full text-start text-4xl font-semibold text-[#FFF4E5]">
              QMRA
            </h1>
            <p className="text-xl text-[#FFF4E5]">
              Quantum Magnetic Resonance Analyzer. It is designed in order to
              detect the magnetic field of the human cells and consequently
              through a meticulous analysis process to estimate the health state
              of a person. Can analyze at least 36 cell organs.
            </p>
          </div>
        </div>

        <div className="flex h-[500px] w-full items-center justify-center bg-[#FCBF26] text-[#2C1B11]">
          <div className="flex w-[90%] max-w-[1200px] flex-row-reverse gap-4">
            <img
              className="h-[250px] w-[500px] rounded-2xl object-cover"
              src={Healthy}
              alt="leathy"
            />
            <div className="flex flex-col items-center justify-center">
              <h1 className="my-8 w-full text-start text-4xl font-semibold text-[#2C1B11]">
                Auricular Acupuncture
              </h1>
              <p className="text-xl text-[#2C1B11]">
                Auricular Acupuncture - is a form of alternative medicine based
                on the idea that the ear is a micro system and an external
                organ, which reflects the entire body, represented on the
                auricle, the outer portion of the ear.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
