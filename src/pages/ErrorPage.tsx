import { Button } from "@nextui-org/button";
import { useNavigate } from "react-router-dom";
const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center w-full h-screen flex-col gap-5 bg-red-500">
      <h2 className="text-8xl text-white font-poppins font-bold">
        404 NOT FOUND
      </h2>
      <p className="text-lg text-white font-thin">
        Something went wrong please click back
      </p>
      <Button onClick={() => navigate(-1)} color="primary" variant="shadow">
        BACK
      </Button>
    </div>
  );
};

export default ErrorPage;
