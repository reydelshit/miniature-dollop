import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const { hash } = useLocation();

  return (
    <>
      <div className="flex h-[400px] w-full flex-col items-center justify-center">
        <div className="flex gap-4">
          <a
            href="#products"
            className={`${hash === '#products' ? 'border-b-4 border-yellow-300' : '?'}`}
          >
            Products
          </a>
          <a
            href="#about"
            className={`${hash === '#about' ? 'border-b-4 border-yellow-300' : '?'}`}
          >
            About us
          </a>
          <a
            href="#services"
            className={`${hash === '#services' ? 'border-b-4 border-yellow-300' : '?'}`}
          >
            Services
          </a>
          <a
            href="#contact"
            className={`${hash === '#contact' ? 'border-b-4 border-yellow-300' : '?'}`}
          >
            Contact us
          </a>
        </div>

        <div className="mt-[2rem] flex gap-8">
          <Facebook />
          <Linkedin />
          <Instagram />
          <Youtube />
        </div>

        <div className="mt-[2rem]">
          <span>
            © 2024 LiveWell Marketing Corporation, Inc. All rights reserved.
          </span>
        </div>
      </div>
    </>
  );
};

export default Footer;
