import {
	Table,
	TableHeader,
	TableBody,
	TableColumn,
	TableRow,
	TableCell,
} from "@nextui-org/table";
import { useState } from "react";
import type { Selection } from "@nextui-org/table"; // Import the correct type

// Define the structure of the table data
interface TableRowData {
	id: string;
	name: string;
	status: string;
}

const Certificate = () => {
	// State to store the selected name
	const [selectedName, setSelectedName] = useState<string | null>(null);

	// Data reference with proper typing
	const tableData: TableRowData[] = [
		{ id: "1", name: "Tony Reichert", status: "Active" },
		{ id: "2", name: "Zoey Lang", status: "Paused" },
		{ id: "3", name: "Jane Fisher", status: "Active" },
		{ id: "4", name: "William Howard", status: "Vacation" },
	];

	// Handle selection change
	const handleSelectionChange = (keys: Selection) => {
		let selectedId: string | null = null;

		if (typeof keys === "string") {
			// If keys is a string
			selectedId = keys;
		} else if (keys instanceof Set) {
			// If keys is a Set<string>, get the first key
			selectedId = Array.from(keys)[0] || null;
		}

		// Find the selected row
		const selectedRow = tableData.find((row) => row.id === selectedId);
		setSelectedName(selectedRow?.name ?? null);
	};

	return (
		<div>
			<h2>Certificate</h2>

			<div className="grid grid-cols-2 gap-8">
				<div className="w-full flex items-center justify-center">
					<Table
						aria-label="Example static collection table"
						color="primary"
						selectionMode="single"
						onSelectionChange={handleSelectionChange}
					>
						<TableHeader>
							<TableColumn>NAME</TableColumn>
							<TableColumn>STATUS</TableColumn>
						</TableHeader>
						<TableBody>
							{tableData.map((item) => (
								<TableRow key={item.id}>
									<TableCell>{item.name}</TableCell>
									<TableCell>{item.status}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>

				{/* Display selected name */}
				<div>
					{selectedName && (
						<p>
							<strong>Selected Name:</strong> {selectedName}
						</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default Certificate;
