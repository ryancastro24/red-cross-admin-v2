import React, { SVGProps, useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
  useDisclosure,
} from "@nextui-org/react";
import { DatePicker } from "@nextui-org/date-picker";
import { Select, SelectItem } from "@nextui-org/select";
import {
  getUsersData,
  updateUserData,
  updateUserCertificates,
} from "@/backendapi/user";
import { UserType } from "@/backendapi/user";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";

import {
  useLoaderData,
  Form,
  useNavigation,
  useSubmit,
} from "react-router-dom";

//loader action
export const loader = async () => {
  const users = await getUsersData();

  return { users };
};
export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
interface Option {
  key?: string;
  value?: string;
  label: string;
}
type User = {
  id: string;
  _id: string; // Changed `_id` to `id` for consistency, but you can keep `_id` if required
  name: string;
  email: string;
  address: string;
  orNumber: number;
  contact: string;
  gender: string;
  password: string;
  userType: string;
  certificateApproved: boolean;
  profilePictureUrl: string;
  certificateUrl: string;
  category: string;
  dateStarted: string; // ISO date string
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
};
// action function
export async function action({ request }: any) {
  console.log(request);

  // Get form data from the request
  if (request.method === "POST") {
    const formData = await request.formData();
    const userIdsString = formData.get("selectedUsers"); // Get the string from formData

    // Check if userIdsString is valid before parsing it
    if (typeof userIdsString === "string") {
      const userIds = JSON.parse(userIdsString); // Parse the string into an array
      const finaluserids = JSON.parse(userIds);
      console.log(finaluserids);

      const result = await updateUserCertificates(finaluserids);
      return result;
    } else {
      throw new Error("Invalid userIds format. Expected a string.");
    }
  } else if (request.method === "PUT") {
    const formData = await request.formData();
    const data: Record<string, FormDataEntryValue> = Object.fromEntries(
      formData.entries()
    );

    const userData: UserType = {
      name: data.name as string,
      email: data.email as string,
      address: data.address as string,
      category: data.category as string,
      orNumber: parseInt(data.orNumber as string),
      dateStarted: data.dateStarted as string,
      _id: data._id as string, // Default value if _id is not provided
      certificateApproved: data.certificateApproved === "true", // Default value if certificateApproved is not provided
    };

    const resultData = await updateUserData(userData, data.id as string);
    console.log("Update result:", resultData);
    return resultData; // Return the result of the API call
  }
}

const category: Option[] = [
  { key: "standard", label: "Standard" },
  { key: "occupational", label: "Occupational" },
];

const address: Option[] = [
  { value: "ALFONSO", label: "ALFONSO" },
  { value: "AMADEO", label: "AMADEO" },
  // ... (rest of the address list)
];

export function capitalize(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

export const PlusIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={size || height}
      role="presentation"
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      >
        <path d="M6 12h12" />
        <path d="M12 18V6" />
      </g>
    </svg>
  );
};

export const VerticalDotsIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={size || height}
      role="presentation"
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
        fill="currentColor"
      />
    </svg>
  );
};

export const SearchIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};

export const ChevronDownIcon = ({
  strokeWidth = 1.5,
  ...otherProps
}: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...otherProps}
    >
      <path
        d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

export const columns = [
  { name: "NAME", uid: "name", sortable: true },
  { name: "CATEGORY", uid: "category", sortable: true },
  { name: "ADDRESS", uid: "address", sortable: true },
  { name: "OR NUMBER", uid: "orNumber" },
  { name: "GENDER", uid: "gender" },
  { name: "CONTACT", uid: "contact" },
  { name: "EMAIL", uid: "email" },
  { name: "ACTIONS", uid: "actions" },
];

export const statusOptions = [
  { name: "Standard", uid: "standard" },
  { name: "Occupational", uid: "occupational" },
];

const statusColorMap: Record<string, ChipProps["color"]> = {
  standard: "primary",
  occupational: "secondary",
  vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = [
  "name",
  "email",
  "category",
  "address",
  "actions",
];

type loaderData = {
  users: User[];
};

export default function DataTable() {
  const submit = useSubmit();
  const navigation = useNavigation();
  const { users } = useLoaderData() as loaderData;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<Selection>(() => {
    // Initialize state from localStorage if available
    const storedKeys = localStorage.getItem("selectedKeys");
    return storedKeys ? new Set(JSON.parse(storedKeys)) : new Set([]);
  });
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);

  // Update localStorage whenever selectedKeys changes
  useEffect(() => {
    const selectedKeysArray = Array.from(selectedKeys); // Convert Set to Array
    localStorage.setItem("selectedKeys", JSON.stringify(selectedKeysArray));
  }, [selectedKeys]);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent native form submission

    const storedKeys = localStorage.getItem("selectedKeys");
    const formData = new FormData();

    // Convert Set to Array and then to a JSON string
    formData.append("selectedUsers", JSON.stringify(storedKeys));

    // Programmatically submit the formData
    submit(formData, { method: "post" });

    // Remove selectedKeys from local storage
    localStorage.removeItem("selectedKeys");
  };

  const handleEditUser = (data: User) => {
    onOpen();
    setSelectedUser(data);
  };

  const handleOpenDeleteUser = (data: User) => {
    setOpenDeleteModal(true);
    setSelectedUser(data);
  };

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.category)
      );
    }

    return filteredUsers;
  }, [users, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: User, b: User) => {
      const first = a[sortDescriptor.column as keyof User] as number;
      const second = b[sortDescriptor.column as keyof User] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "full", src: user.profilePictureUrl }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "email":
        return <p>{user.email}</p>;
      case "address":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-tiny capitalize">{user.address}</p>
          </div>
        );
      case "category":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.category]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-center items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem key="view">View</DropdownItem>
                <DropdownItem onClick={() => handleEditUser(user)} key="edit">
                  Edit
                </DropdownItem>

                <DropdownItem
                  onClick={() => handleOpenDeleteUser(user)}
                  key="delete"
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            <Form method="POST" onSubmit={(e) => e.preventDefault()}>
              <Button
                isDisabled={
                  selectedKeys === "all" ||
                  (selectedKeys instanceof Set && selectedKeys.size === 0)
                }
                onClick={handleSubmit}
                type="button"
                color="primary"
              >
                Course Completed
              </Button>
            </Form>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {users.length} users
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    users.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <>
      <Table
        isHeaderSticky
        aria-label="Example table with custom cells, pagination and sorting"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[382px]",
        }}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No users found"} items={sortedItems}>
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Modal size="2xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Update User Details
              </ModalHeader>
              <Form method="PUT">
                <ModalBody className="grid grid-cols-2 gap-5">
                  <div>
                    <Input
                      required
                      defaultValue={selectedUser?.orNumber.toString()}
                      name="orNumber"
                      label="OR Number"
                      type="number"
                    />
                  </div>
                  <div>
                    <Input
                      required
                      defaultValue={selectedUser?.name}
                      name="name"
                      label="Name"
                      type="text"
                    />
                  </div>
                  <Input
                    required
                    defaultValue={selectedUser?._id}
                    name="id"
                    type="hidden"
                  />
                  <div>
                    <Input
                      required
                      defaultValue={selectedUser?.email}
                      name="email"
                      label="Email"
                      type="email"
                    />
                  </div>

                  <div>
                    <DatePicker
                      isRequired
                      name="dateStarted"
                      label="Date Started"
                    />
                  </div>

                  <div>
                    <Select
                      isRequired
                      defaultSelectedKeys={[selectedUser?.category || ""]}
                      name="category"
                      label="Select Category"
                    >
                      {category.map((val) => (
                        <SelectItem key={val.key || val.label}>
                          {val.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>

                  <div>
                    <Select
                      isRequired
                      defaultSelectedKeys={[selectedUser?.address || ""]}
                      name="address"
                      label="Select Address"
                    >
                      {address.map((val) => (
                        <SelectItem key={val.value || val.label}>
                          {val.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    isLoading={navigation.state === "submitting"}
                    type="submit"
                    color="primary"
                  >
                    Save Changes
                  </Button>
                </ModalFooter>
              </Form>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        size="md"
        isOpen={openDeleteModal}
        onOpenChange={() => setOpenDeleteModal(false)}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Are you sure to delete user?</ModalHeader>
              <Form
                method="POST"
                action={`/dashboard/datatable/${selectedUser?._id}/destroy`}
              >
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    isLoading={navigation.state === "submitting"}
                    type="submit"
                    color="primary"
                  >
                    Confirm Delete
                  </Button>
                </ModalFooter>
              </Form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
