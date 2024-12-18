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

  return result; // Return the form data as fallback
}
const LoginPage = () => {
  const navigate = useNavigate(); // Add the useNavigate hook for navigation
  const navigation = useNavigation();
  const actionData = useActionData();
  if (actionData && !actionData.error) {
    navigate("/dashboard"); // Redirect to dashboard on successful login
  }
  return (
    <div className="w-full h-screen grid grid-cols-[1fr,500px] overflow-hidden">
      {/* Left Side: Three horizontal image sections */}
      <div
        style={{ background: `url(${img1})`, backgroundSize: "cover" }}
        className="w-full h-full "
      ></div>

      {/* Right Side: Login Form */}

      <Form
        method="POST"
        className="w-full flex flex-col items-center justify-center p-8"
      >
        <img src={logo} alt="logo" className="w-[120px]" />
        <h2
          className="text-lg font-bold text-center mt-5 mb-6"
          style={{ fontFamily: "Poppins" }}
        >
          REDCROSS CAVITE
        </h2>
        <div className="mb-4 w-full">
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <Input
            name="email"
            radius="sm"
            type="email"
            id="email"
            className="w-full"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-6 w-full">
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <Input
            name="password"
            radius="sm"
            type="password"
            id="password"
            className="w-full  "
            placeholder="Enter your password"
          />

          <div>
            {actionData && actionData.error && (
              <h2 className="text-red-500 mt-2">
                {actionData.error}, try again
              </h2>
            )}
          </div>
        </div>

        <Button
          isLoading={navigation.state === "submitting"}
          type="submit"
          className="w-full bg-blue-600 text-white py-5 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </Button>
        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </Form>
    </div>
  );
};

export default LoginPage;
