import MainContainer from '@/components/structure/MainContainer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Dashboard = () => {
  return (
    <MainContainer>
      <div>
        <div>
          <h1>LiveWell Marketing Corporation </h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi
            dolores molestiae voluptates minima, sapiente facilis ab enim
            delectus obcaecati unde!
          </p>

          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
            impedit placeat ad libero, laborum eius odit quidem explicabo
            officiis nihil laboriosam dolorum ut illum atque!
          </div>
        </div>

        <form>
          <h1>Login</h1>
          <p>Login now to access your account</p>

          <div>
            <Label>Email or Username</Label>
            <Input type="text" />
          </div>
          <div>
            <Label>Password</Label>
            <Input type="password" />
          </div>

          <Button type="submit">Login</Button>
        </form>
      </div>
    </MainContainer>
  );
};

export default Dashboard;
