import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { useState, useMemo } from "react";
import type { Selection } from "@nextui-org/table"; // Import the correct type
import { getUsersCertToBeUpload } from "@/backendapi/user";
import { useLoaderData } from "react-router-dom";
import { UserType } from "@/backendapi/user";
import { Pagination } from "@nextui-org/pagination";
import { Button } from "@nextui-org/button";
export const loader = async () => {
  const users = await getUsersCertToBeUpload();
  return { users };
};

type Users = {
  users: UserType[];
};

const Certificate = () => {
  const { users } = useLoaderData() as Users;
  // State to store the selected name
  const [selectedName, setSelectedName] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const rowsPerPage = 4;

  const pages = Math.ceil(users.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users.slice(start, end);
  }, [page, users]);

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
    setSelectedName(selectedUser?.name ?? null);
  };

  return (
    <div className="w-full h-full">
      <h2>Certificate</h2>

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
            {selectedName && (
              <p>
                <strong>Selected Name:</strong> {selectedName}
              </p>
            )}
          </div>

          <div className="flex justify-center items-center gap-4">
            <Button color="secondary" variant="shadow">
              Download Certificate
            </Button>
            <Button color="primary" variant="shadow">
              Upload Certificate
            </Button>
          </div>
        </div>

        <div className="w-full bg-slate-200 h-full"></div>
      </div>
    </div>
  );
};

export default Certificate;
