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
            className={`${hash === '#products' ? 'border-secondaryColor border-b-4' : '?'}`}
          >
            Products
          </a>
          <a
            href="#about"
            className={`${hash === '#about' ? 'border-secondaryColor border-b-4' : '?'}`}
          >
            About us
          </a>
          <a
            href="#services"
            className={`${hash === '#services' ? 'border-secondaryColor border-b-4' : '?'}`}
          >
            Services
          </a>
          <a
            href="#contact"
            className={`${hash === '#contact' ? 'border-secondaryColor border-b-4' : '?'}`}
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
