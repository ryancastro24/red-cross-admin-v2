import React, { useState, useRef, useEffect } from "react";
import { Input } from "@nextui-org/input";
import { DatePicker } from "@nextui-org/date-picker";
import { Select, SelectItem } from "@nextui-org/select";
import { Button } from "@nextui-org/button";
import { useFetcher, useNavigate } from "react-router-dom";
import { registerUser } from "@/backendapi/user";
import { Alert } from "@nextui-org/alert";
import userProfile from "@/assets/userprofile.png";
// action function
export async function action({ request }: any) {
  const formData = await request.formData();

  console.log("Form Data Received:", [...formData.entries()]); // ✅ Debugging Log

  const apiFormData = new FormData();

  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      apiFormData.append(key, value, value.name); // ✅ Safe to access `.name`
    } else {
      apiFormData.append(key, value as string);
    }
  }

  const resultData = await registerUser(apiFormData);

  console.log("API Response:", resultData);
  return resultData;
}

interface Option {
  key?: string;
  value?: string;
  label: string;
}

const category: Option[] = [
  { key: "standard", label: "Standard" },
  { key: "occupational", label: "Occupational" },
];

const gender: Option[] = [
  { key: "male", label: "Male" },
  { key: "female", label: "Female" },
];

const address: Option[] = [
  { value: "ALFONSO", label: "ALFONSO" },
  { value: "AMADEO", label: "AMADEO" },
  { value: "BACOOR CITY", label: "BACOOR CITY" },
  { value: "CARMONA", label: "CARMONA" },
  { value: "CAVITY CITY", label: "CAVITY CITY" },
  { value: "CITY OF DASMARIÑAS", label: "CITY OF DASMARIÑAS" },
  { value: "GEN. MARIANO ALVAREZ", label: "GEN. MARIANO ALVAREZ" },
  { value: "GENERAL EMILIO AGUINALDO", label: "GENERAL EMILIO AGUINALDO" },
  { value: "GENERAL TRIAS", label: "GENERAL TRIAS" },
  { value: "IMUS CITY", label: "IMUS CITY" },
  { value: "INDANG", label: "INDANG" },
  { value: "KAWIT", label: "KAWIT" },
  { value: "MAGALLANES", label: "MAGALLANES" },
  { value: "MARAGONDON", label: "MARAGONDON" },
  { value: "MENDEZ (MENDEZ-NUÑEZ)", label: "MENDEZ (MENDEZ-NUÑEZ)" },
  { value: "NAIC", label: "NAIC" },
  { value: "NOVELETA", label: "NOVELETA" },
  { value: "ROSARIO", label: "ROSARIO" },
  { value: "SILANG", label: "SILANG" },
  { value: "TAGAYTAY CITY", label: "TAGAYTAY CITY" },
  { value: "TANZA", label: "TANZA" },
  { value: "TERNATE", label: "TERNATE" },
  {
    value: "TRECE MARTIRES CITY (CAPITAL)",
    label: "TRECE MARTIRES CITY (CAPITAL)",
  },
  // ... (rest of the address list)
];

const RegisterForm: React.FC = () => {
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  // const [register, setRegister] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();
  const fetcher = useFetcher();

  const [orNumber, setOrNumber] = useState("");
  const [email, setEmail] = useState("");
  const [orNumberError, setOrNumberError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [capturedFile, setCapturedFile] = useState<File | null>(null);
  // Update errors based on fetcher response
  useEffect(() => {
    if (fetcher.data?.error) {
      if (fetcher.data.error.includes("Or Number is already Used")) {
        setOrNumberError(fetcher.data.error);
      }
      if (fetcher.data.error.includes("Email is already registered")) {
        setEmailError(fetcher.data.error);
      }
    }
  }, [fetcher.data]);
  // Reset error when user types in OR Number
  const handleOrNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrNumber(e.target.value);
    if (orNumberError) setOrNumberError(""); // Clear error when typing
  };

  // Reset error when user types in Email
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) setEmailError(""); // Clear error when typing
  };
  console.log("Returned data:", fetcher.data);
  const handleOpenCamera = async (): Promise<void> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraStream(stream);
      setCapturedImage(null); // Clear any previous capture
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const handleCapture = (): void => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (!context) {
        console.error("Failed to get canvas context");
        return;
      }

      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "captured-image.png", {
            type: "image/png",
          });

          setCapturedFile(file); // ✅ Store File instance for form submission
          setCapturedImage(URL.createObjectURL(file)); // ✅ Generate preview
        }
      }, "image/png");
    }
  };

  const handleRetake = (): void => {
    handleOpenCamera();
  };

  const handleDownloadProfile = async () => {
    if (!capturedImage) {
      console.error("No image to download");
      return;
    }

    // Create a Blob from the captured image
    const blob = await fetch(capturedImage).then((res) => res.blob());

    // Create a link element to trigger the download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob); // Create an object URL for the Blob
    link.download = "capturedImage.png"; // Set the default filename
    link.click(); // Programmatically click the link to trigger the download

    // Optionally, revoke the object URL after the download
    URL.revokeObjectURL(link.href);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default submission

    const formData = new FormData(e.currentTarget); // Get all form inputs

    if (capturedFile) {
      formData.append("file", capturedFile, capturedFile.name); // ✅ Append captured file
    }

    fetcher.submit(formData, {
      method: "POST",
      encType: "multipart/form-data",
    });
  };
  return (
    <div className="w-full flex flex-col gap-5">
      {fetcher.data?.message === "User registered successfully" &&
        isVisible && (
          <Alert
            color="success"
            title="Successfully registered user!"
            endContent={
              <Button
                onPress={() => navigate(0)}
                color="success"
                size="sm"
                variant="flat"
              >
                Register Another
              </Button>
            }
            onClose={() => setIsVisible(false)}
          />
        )}
      <h2>Register Form</h2>

      <div className="w-full grid grid-cols-[1fr,400px]">
        {/* Form Inputs */}
        <fetcher.Form
          method="post"
          className="w-full grid grid-cols-2 gap-5"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <div className="col-span-2 grid grid-cols-3 gap-3">
            <div>
              <Input required name="firstname" label="First Name" type="text" />
            </div>

            <div>
              <Input
                required
                name="middlename"
                label="Middle Name"
                type="text"
              />
            </div>

            <div>
              <Input required name="lastname" label="Last Name" type="text" />
            </div>
          </div>

          <div className="col-span-2 grid grid-cols-3 gap-3">
            <div>
              <Input name="suffix" label="Suffix" type="text" />
            </div>
            <div>
              <Input
                required
                name="email"
                label="Email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                errorMessage={emailError}
                isInvalid={!!emailError}
              />
            </div>
            <div>
              <Input
                required
                name="password"
                label="Password"
                type="password"
              />
            </div>
          </div>

          <div>
            <DatePicker isRequired name="dateStarted" label="Date Started" />
          </div>

          <div>
            <Select isRequired name="category" label="Select Category">
              {category.map((val) => (
                <SelectItem key={val.key || val.label}>{val.label}</SelectItem>
              ))}
            </Select>
          </div>

          <div>
            <Select isRequired name="address" label="Select Address">
              {address.map((val) => (
                <SelectItem key={val.value || val.label}>
                  {val.label}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div>
            <Select isRequired name="gender" label="Select Gender">
              {gender.map((val) => (
                <SelectItem key={val.key || val.label}>{val.label}</SelectItem>
              ))}
            </Select>
          </div>
          <div>
            <Input required name="contact" label="Contact" type="number" />
          </div>
          <div>
            <Input
              name="file"
              label="Upload Image"
              type="file"
              onChange={(e) => setCapturedFile(e.target.files?.[0] || null)}
              className="absolute inset-0 w-0 h-0 opacity-0"
            />

            <div>
              <Input
                required
                type="number"
                label="OR Number"
                name="orNumber"
                value={orNumber}
                onChange={handleOrNumberChange}
                errorMessage={orNumberError}
                isInvalid={!!orNumberError} // Ensures validation updates dynamically
              />
            </div>
          </div>
          <div className="cols-span-2">
            <Button
              isLoading={fetcher.state === "submitting"}
              type="submit"
              className="w-full h-[50px] "
              color="primary"
            >
              SUBMIT
            </Button>
          </div>
        </fetcher.Form>

        <div className="w-full p-5 flex flex-col gap-5">
          {/* Camera Preview or Captured Image */}
          <div
            className="w-full h-[300px] rounded flex justify-center items-center"
            style={{
              backgroundImage: capturedImage
                ? `url(${capturedImage})`
                : `url(${userProfile})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {!capturedImage ? (
              <video
                ref={videoRef}
                className="w-full h-full rounded"
                autoPlay
                muted
              />
            ) : (
              <img
                src={capturedImage}
                alt="Captured"
                className="w-full h-full object-cover rounded"
              />
            )}
          </div>

          {/* Camera Controls */}
          <div className="grid grid-cols-2 gap-5">
            {!capturedImage ? (
              <>
                <Button
                  className="w-full"
                  color="primary"
                  onClick={handleOpenCamera}
                >
                  Open Camera
                </Button>
                <Button
                  className="w-full"
                  color="secondary"
                  onClick={handleCapture}
                  disabled={!cameraStream}
                >
                  Capture
                </Button>
              </>
            ) : (
              <>
                <Button
                  className="w-full"
                  color="warning"
                  onClick={handleRetake}
                >
                  Retake
                </Button>

                <Button
                  className="w-full"
                  color="primary"
                  onClick={handleDownloadProfile} // Link the upload button
                >
                  Upload
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Hidden Canvas for Capturing */}
      <canvas ref={canvasRef} className="hidden"></canvas>
    </div>
  );
};

export default RegisterForm;
