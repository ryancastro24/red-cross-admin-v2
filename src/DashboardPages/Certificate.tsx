import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import redcrosslogo from "@/assets/redcross_logo.png";
import { Card, CardBody } from "@nextui-org/card";
import { useState, useMemo, useEffect } from "react";
import type { Selection } from "@nextui-org/table"; // Import the correct type
import { getUsersCertToBeUpload } from "@/backendapi/user";
import { useLoaderData, useFetcher, useNavigate } from "react-router-dom";
import { UserType } from "@/backendapi/user";
import { Alert } from "@nextui-org/react";
import { Pagination } from "@nextui-org/pagination";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import CertificateContainer from "@/components/CertificateContainer";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { updateUserCertificateUrl } from "@/backendapi/user";
import { Select, SelectItem } from "@nextui-org/react";
import { instructors } from "@/libs/instructors";
export async function action({ request }: any) {
  const formData = await request.formData();
  const data: Record<string, FormDataEntryValue> = Object.fromEntries(
    formData.entries()
  );

  console.log(data.id);
  // Create a FormData instance to send the data to the Express API
  const apiFormData = new FormData();

  // Append each field in the data to the FormData
  Object.keys(data).forEach((key) => {
    // Handle different types of data, e.g., file upload
    const value = data[key];
    if (value instanceof File) {
      apiFormData.append(key, value, value.name);
    } else {
      apiFormData.append(key, value as string);
    }
  });

  const resultData = await updateUserCertificateUrl(apiFormData, data.id);

  console.log(resultData);
  return resultData; // Return the form data as fallback
}
export const loader = async () => {
  const users = await getUsersCertToBeUpload();
  return { users };
};

type Users = {
  users: UserType[];
};

const Certificate = () => {
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const [successFlag, setSuccessFlag] = useState(false);
  const [generatedFile, setGeneratedFile] = useState<File | null>(null);
  const [instructorsData, setInstructorsData] = useState<Selection>(
    new Set([])
  );

  // Convert instructorsData (Selection) to an array and map to labels
  const selectedNames = Array.from(instructorsData).map((key) => {
    const instructor = instructors.find((a) => a.key === key); // Use the 'instructors' array here
    return instructor?.label || ""; // Default to an empty string if no match is found
  });

  useEffect(() => {
    if (fetcher.data?.message) {
      setInstructorsData(new Set()); // Clear selection
      setSuccessFlag(true);
    }
  }, [fetcher.data]);
  const formatNames = (names: string[]): string => {
    if (names.length === 0) return "Selected Instructors";
    if (names.length === 1) return names[0];
    if (names.length === 2) return `${names[0]} and ${names[1]}`;
    return `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}`;
  };

  const { users } = useLoaderData() as Users;
  // State to store the selected name
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

  const [page, setPage] = useState(1);
  const rowsPerPage = 4;

  const pages = Math.ceil(users.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users.slice(start, end);
  }, [page, users]);

  const handleDownloadAndAttach = async () => {
    const input = document.getElementById("certificate") as HTMLElement | null;

    if (!input) {
      console.error("Certificate element not found.");
      return;
    }

    html2canvas(input).then(async (canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("portrait", "pt", "a4");

      const pdfWidth = 595.28; // A4 width in points
      const pdfHeight = 841.89; // A4 height in points
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      const ratio = Math.min(pdfWidth / canvasWidth, pdfHeight / canvasHeight);
      const imgWidth = canvasWidth * ratio;
      const imgHeight = canvasHeight * ratio;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

      const pdfBlob = pdf.output("blob");

      const file = new File(
        [pdfBlob],
        `${selectedUser?.name || "certificate"}.pdf`,
        {
          type: "application/pdf",
        }
      );

      setGeneratedFile(file);
    });
  };
  const handleSelectionChange = (keys: Selection) => {
    let selectedId: string | null = null;

    if (typeof keys === "string" || typeof keys === "number") {
      // If keys is a string or number
      selectedId = keys.toString(); // Convert to string
    } else if (keys instanceof Set) {
      // If keys is a Set<string> or Set<number>, get the first key
      selectedId = Array.from(keys)[0]?.toString() || null; // Convert to string
    }

    // Find the selected user
    const selectedUser = users.find(
      (user) => user._id.toString() === selectedId
    );
    setSelectedUser(selectedUser ?? null);
  };

  useEffect(() => {
    const certificateElement = document.getElementById("certificate");

    if (selectedUser && selectedNames.length > 0 && certificateElement) {
      handleDownloadAndAttach();
    }
  }, [selectedUser, selectedNames]);

  const validUntil = selectedUser?.dateStarted
    ? new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(
        new Date(
          new Date(selectedUser.dateStarted).setFullYear(
            new Date(selectedUser.dateStarted).getFullYear() + 2
          )
        )
      )
    : "No Date";

  const formattedDateStarted = selectedUser?.dateStarted
    ? new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(selectedUser.dateStarted))
    : "No Date";

  const calculateEvaluationDate = (
    category: string | undefined,
    dateStarted: string | undefined
  ) => {
    if (!dateStarted) return "No Date";
    const startDate = new Date(dateStarted);

    if (category === "standard") {
      startDate.setDate(startDate.getDate() + 3);
    } else if (category === "occupational") {
      startDate.setDate(startDate.getDate() + 1);
    }

    // Format the date in "Month DD, YYYY" style
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(startDate);

    return formattedDate;
  };

  const evaluationDate = calculateEvaluationDate(
    selectedUser?.category,
    selectedUser?.dateStarted
  );
  return (
    <div className="w-full h-full">
      <h2>Certificate</h2>

      {successFlag && (
        <Alert
          color="success"
          title="Successfully Uploaded Certificate!"
          endContent={
            <Button
              onPress={() => navigate(0)}
              color="success"
              size="sm"
              variant="flat"
            >
              Upload Another
            </Button>
          }
          onClose={() => setSuccessFlag(false)}
        />
      )}

      <CertificateContainer
        name={selectedUser?.name?.toUpperCase()}
        category={selectedUser?.category}
        dateEvaluation={evaluationDate || "No Date"}
        dateStarted={formattedDateStarted || "No Date"}
        dateValidity={validUntil || "No Date"}
        instructors={formatNames(selectedNames)}
      />

      <div className="grid grid-cols-2 gap-8">
        <div className="w-full flex items-center flex-col gap-5 mt-5 justify-center">
          <Table
            isStriped
            aria-label="Certificate Users Table"
            color="primary"
            selectionMode="single"
            onSelectionChange={handleSelectionChange}
            bottomContent={
              <div className="flex w-full justify-center">
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  color="primary"
                  page={page}
                  total={pages}
                  onChange={(page) => setPage(page)}
                />
              </div>
            }
          >
            <TableHeader>
              <TableColumn>NAME</TableColumn>
              <TableColumn>STATUS</TableColumn>
            </TableHeader>
            <TableBody>
              {items.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>
                    {user.certificateApproved ? "Approved" : "Pending"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div>
            {selectedUser?.name && (
              <p>
                <strong>Selected Name:</strong> {selectedUser?.name}
              </p>
            )}
          </div>

          <fetcher.Form
            method="POST"
            className="flex flex-col gap-5"
            encType="multipart/form-data"
            onSubmit={() => {
              if (generatedFile) {
                const fileInput =
                  document.querySelector<HTMLInputElement>(
                    'input[name="file"]'
                  );
                if (fileInput) {
                  const dataTransfer = new DataTransfer();
                  dataTransfer.items.add(generatedFile);
                  fileInput.files = dataTransfer.files;
                }
              }
            }}
          >
            <div className="flex justify-between w-full items-center gap-5">
              <Select
                className="w-[300px]"
                label="Instructors"
                placeholder="Select Instructors"
                selectedKeys={instructorsData}
                selectionMode="multiple"
                onSelectionChange={setInstructorsData}
              >
                {instructors.map((val) => (
                  <SelectItem key={val.key}>{val.label}</SelectItem>
                ))}
              </Select>
              <div>
                <Input
                  name="file"
                  type="file"
                  className="absolute inset-0 w-0 h-0 opacity-0"
                />
                <Input value={selectedUser?._id} name="id" type="hidden" />
              </div>

              <div className="flex justify-center items-center gap-4">
                <Button
                  isLoading={fetcher.state === "submitting"}
                  type="submit"
                  color="primary"
                  variant="shadow"
                  isDisabled={
                    selectedUser === null || selectedNames.length === 0
                  }
                >
                  Upload Certificate
                </Button>
              </div>
            </div>
          </fetcher.Form>
        </div>

        <Card className="w-full h-full p-4 px-8 relative">
          <CardBody className="w-full h-full flex flex-col gap-5">
            <img
              src={redcrosslogo}
              alt="redcross"
              className="absolute top-5 left-16 w-[70px]"
            />
            <div className="flex justify-center items-center flex-col">
              <h1 className="text-lg font-bold">PHILIPPINE RED CROSS</h1>
              <h2 className="text-sm">CAVITE CHAPTER</h2>
              <h2 className="text-sm">DASMARINAS CITY BRANCH</h2>
              <span className="text-xs font-thin mt-2">
                Ground Floor, Units 2 & 3. Amada Building{" "}
              </span>
              <span className="text-xs font-thin">
                Emilio Aguinaldo Highway, Barangay zone IV. Dasmarinas Cavite
                City
              </span>
              <span className="text-xs font-thin">Tel No. (046) 4026267</span>
              <span className="text-xs font-thin">
                cavitedasmarinas@redcross.ph
              </span>
            </div>

            <div>
              <h2 className="text-center">CERTIFICATION</h2>
              <span className=" text-xs">TO WHOM MAY IT CONCERN:</span>
              <p className="text-xs font-thin indent-8 text-justify mt-4">
                This is to certify that{" "}
                <strong>
                  {selectedUser?.name.toUpperCase() ||
                    "Sample Name".toUpperCase()}
                </strong>{" "}
                graduated OCCUPATIONAL FIRST AID AND BLS CRR/AED TRAINING
                conducted on{" "}
                {formattedDateStarted?.split(",")[0] || "Date Not Provided"}-
                {evaluationDate?.split(" ")[1]}{" "}
                {formattedDateStarted?.split(",")[1]} at Philippine Red Cross
                Dasmarinas City Branch, G/F Units 2 & 3 Amada Building, Emilio
                Aguinaldo Highway, Barangay Zone IV, Dasmarinas Cavity and
                PASSED the evaluating examination given on {evaluationDate}. The
                Training was conducted under the supervision of{" "}
                {formatNames(selectedNames)}
              </p>

              <p className="text-xs font-thin indent-8 text-justify mt-2">
                This certification is being used for reference purposes and
                shall be valid up to November 7. 2026 only.
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Certificate;
