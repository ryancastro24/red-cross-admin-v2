import { useEffect } from "react";
import img1 from "@/assets/bgimga.png";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {
  Form,
  useNavigation,
  useActionData,
  useNavigate,
} from "react-router-dom";
import logo from "@/assets/redcross_logo.png";
import { loginUser } from "@/backendapi/auth";

export async function action({ request }: any) {
  const formData = await request.formData();
  const data: Record<string, FormDataEntryValue> = Object.fromEntries(
    formData.entries()
  );

  const result = await loginUser(data);
  console.log(result);

  return result;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const actionData = useActionData();

  // ✅ Move navigate() inside useEffect to prevent state updates during render
  useEffect(() => {
    if (actionData && !actionData.error) {
      navigate("/dashboard");
    }
  }, [actionData, navigate]);

  return (
    <div className="w-full h-screen grid grid-cols-[1fr,500px] overflow-hidden">
      <div
        style={{ background: `url(${img1})`, backgroundSize: "cover" }}
        className="w-full h-full "
      ></div>

      <Form
        method="POST"
        className="w-full flex flex-col items-center justify-center p-8"
      >
        <img src={logo} alt="logo" className="w-[120px]" />
        <h2 className="text-lg font-bold text-center mt-5 mb-6">
          REDCROSS CAVITE
        </h2>
        <div className="mb-4 w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <Input
            name="email"
            radius="sm"
            type="email"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-6 w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <Input
            name="password"
            radius="sm"
            type="password"
            placeholder="Enter your password"
          />
          {actionData?.error && (
            <h2 className="text-red-500 mt-2">{actionData.error}, try again</h2>
          )}
        </div>

        <Button
          isLoading={navigation.state === "submitting"}
          type="submit"
          className="w-full bg-blue-600 text-white py-5 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </Button>
      </Form>
    </div>
  );
};

export default LoginPage;
