import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";

// Sample rows data
const rows = [
  { key: "1", name: "Tony Reichert", role: "CEO", status: "Active" },
  { key: "2", name: "Zoey Lang", role: "Technical Lead", status: "Paused" },
  { key: "3", name: "Jane Fisher", role: "Senior Developer", status: "Active" },
  {
    key: "4",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
];

// Columns definition
const columns = [
  { key: "name", label: "NAME" },
  { key: "role", label: "ROLE" },
  { key: "status", label: "STATUS" },
];

// Function to group rows by a specific key (e.g., 'status')
const groupRowsByStatus = (rows: any[]) => {
  return rows.reduce((acc: any, row: any) => {
    if (!acc[row.status]) {
      acc[row.status] = [];
    }
    acc[row.status].push(row);
    return acc;
  }, {});
};

const Archives = () => {
  // Group rows by their 'status'
  const groupedRows = groupRowsByStatus(rows);

  return (
    <div className="w-full flex flex-col gap-8">
      <h2>Archives</h2>
      <Table aria-label="Example table with dynamic content">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody>
          {/* Loop through each status group */}
          {Object.keys(groupedRows).map((status) => (
            <React.Fragment key={status}>
              {/* Group Header Row for the Status */}
              <TableRow>
                {/* Render each column header in the group row */}
                {columns.map((col) => (
                  <TableCell
                    key={col.key}
                    style={{ fontWeight: "bold", textAlign: "center" }}
                  >
                    {status}
                  </TableCell>
                ))}
              </TableRow>
              {/* Render Rows for this Status */}
              {groupedRows[status].map((item: any) => (
                <TableRow key={item.key}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.role}</TableCell>
                  <TableCell>{item.status}</TableCell>
                </TableRow>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Archives;
