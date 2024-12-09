import React, { useState, useRef } from "react";
import { Input } from "@nextui-org/input";
import { DatePicker } from "@nextui-org/date-picker";
import { Select, SelectItem } from "@nextui-org/select";
import { Button } from "@nextui-org/button";
// Types for categories, gender, and address options
import { Form } from "react-router-dom";
export async function action({ request }: any) {
  const formData = await request.formData();
  const data: Record<string, FormDataEntryValue> = Object.fromEntries(
    formData.entries()
  );
  console.log(data);
  return data;
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
  // ... (rest of the address list)
];

const RegisterForm: React.FC = () => {
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  console.log(capturedImage);

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
      const image = canvas.toDataURL("image/png");
      setCapturedImage(image);

      // Stop the camera after capture
      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop());
        setCameraStream(null);
      }
    }
  };

  const handleRetake = (): void => {
    handleOpenCamera();
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <h2>Register Form</h2>

      <div className="w-full grid grid-cols-[1fr,400px]">
        {/* Form Inputs */}
        <Form method="POST" className="w-full grid grid-cols-2 gap-5">
          <div>
            <Input name="orNumber" label="OR Number" type="text" />
          </div>
          <div>
            <Input name="name" label="Name" type="text" />
          </div>
          <div>
            <Input name="email" label="Email" type="email" />
          </div>
          <div>
            <Input name="password" label="Password" type="password" />
          </div>

          <Input
            value={capturedImage ?? undefined}
            type="hidden"
            name="profile_picture"
          />

          <div>
            <DatePicker name="dateStarted" label="Date Started" />
          </div>

          <div>
            <Select name="category" label="Select Category">
              {category.map((val) => (
                <SelectItem key={val.key || val.label}>{val.label}</SelectItem>
              ))}
            </Select>
          </div>

          <div>
            <Select name="address" label="Select Address">
              {address.map((val) => (
                <SelectItem key={val.value || val.label}>
                  {val.label}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div>
            <Select name="gender" label="Select Gender">
              {gender.map((val) => (
                <SelectItem key={val.key || val.label}>{val.label}</SelectItem>
              ))}
            </Select>
          </div>

          <div className="col-span-2">
            <Button type="submit" className="w-full h-[50px] " color="primary">
              SUBMIT
            </Button>
          </div>
        </Form>

        <div className="w-full p-5 flex flex-col gap-5">
          {/* Camera Preview or Captured Image */}
          <div className="w-full bg-slate-500 h-[300px] rounded flex justify-center items-center">
            {capturedImage ? (
              <img
                src={capturedImage}
                alt="Captured"
                className="w-full h-full object-cover rounded"
              />
            ) : (
              <video
                ref={videoRef}
                className="w-full h-full rounded"
                autoPlay
                muted
              ></video>
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

                <Button className="w-full" color="primary">
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
