import { ShoppingCart } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <div className="flex w-full items-center justify-center p-4">
      <div className="mx-auto flex w-full max-w-[1255px] items-center justify-between p-4">
        <div className="flex items-center gap-10">
          {/* <img className="w-20" src={Logo} alt="logo" /> */}
          <h1>LiveWell Marketing Corporation</h1>
        </div>
        <div className="flex gap-4">
          <a
            className="font-semibold uppercase text-[#847E7C] hover:text-black"
            href="#about"
          >
            About
          </a>

          <a
            className="font-semibold uppercase text-[#847E7C] hover:text-black"
            href="#services"
          >
            Services
          </a>

          <a
            className="font-semibold uppercase text-[#847E7C] hover:text-black"
            href="#contact"
          >
            Contact
          </a>
        </div>
        <div className="flex items-center gap-4">
          <ShoppingCart />
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
