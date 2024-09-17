import { Button } from '@/components/ui/button';
import axios from 'axios';

const Dashboard = () => {
  const handleLogout = () => {
    axios
      .post(`${import.meta.env.VITE_SERVER_LINK}/logout`, {
        withCredentials: true,
      })
      .then((res) => {
        window.location.href = '/';

        console.log(res.data);
      });
  };

  return (
    <div>
      Dashboard
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default Dashboard;
