import axios from 'axios';
import { useEffect, useState } from 'react';

const ErrorPage = () => {
  const [countdown, setCountdown] = useState(5);

  // useEffect(() => {
  //   setInterval(() => {
  //     setCountdown(countdown - 1);
  //   }, 1000);

  //   // stop the countdown when it reaches 0
  //   if (countdown === 0) {
  //     clearInterval(countdown);

  //     window.location.href = '/';
  //     axios
  //       .post(`${import.meta.env.VITE_SERVER_LINK}/logout`, {
  //         withCredentials: true,
  //       })
  //       .then((res) => {
  //         window.location.href = '/';

  //         console.log(res.data);
  //       });
  //   }
  // }, [countdown]);

  return (
    <div className="grid h-screen w-dvw place-content-center place-items-center">
      <h1 className="text-4xl font-bold">404 Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <span className="my-4">Navigating back to the home page in</span>
      <p className="text-2xl"> {countdown > 0 ? countdown : '0'}</p>
    </div>
  );
};

export default ErrorPage;
