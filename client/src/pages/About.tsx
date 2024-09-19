import Healthy from '@/assets/healthy.jpg';

const About = () => {
  return (
    <>
      <div
        id="about"
        className="mb-[6rem] mt-[2rem] flex h-full w-[90%] max-w-[1200px] flex-col items-center justify-center"
      >
        <h1 className="w-fit p-2 text-center text-4xl font-bold italic text-[#2C1B11]">
          ABOUT US.
        </h1>

        <div className="flex w-full gap-8">
          <img
            className="h-[400px] w-[400px] rounded-2xl object-cover"
            src={Healthy}
            alt="leathy"
          />
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-lightText my-8 w-full text-start text-4xl font-semibold">
              Our Mission & Vision
            </h1>
            <p className="text-lightText text-xl">
              LiveWell Marketing Corporation, established on July 10, 2024, is
              dedicated to promoting health awareness and well-being through
              innovative solutions. Our mission is to empower individuals to
              lead healthier lives by providing access to quality products and
              services that prioritize wellness. We envision a world where
              everyone has the opportunity to thrive and live well.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
