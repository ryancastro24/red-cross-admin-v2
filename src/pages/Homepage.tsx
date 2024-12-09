import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
const LoginPage = () => {
  return (
    <div className="flex w-full h-screen justify-center items-center flex-col gap-2">
      <Card className="w-[300px] bg-red-300 p-2 flex flex-col gap-2">
        <CardHeader>Login Page</CardHeader>
        <CardBody className="w-fullflex flex-col gap-2">
          <Input className={"w-full"} label="Email" type="email" />
          <Input className={"w-full"} label="Password" type="password" />
          <Button className="mt-5" color="primary">
            Button
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default LoginPage;
