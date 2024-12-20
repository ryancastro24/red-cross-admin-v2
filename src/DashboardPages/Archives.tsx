import { Accordion, AccordionItem } from "@nextui-org/react";
import { useMemo } from "react";
import { User } from "@nextui-org/user";
import { Divider } from "@nextui-org/react";
import { getAllApprovedUsersData } from "@/backendapi/user";
import { useLoaderData } from "react-router-dom";
import jsPDF from "jspdf";

// Define a type for the user object
interface User {
  _id: string;
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
  dateStarted: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

type Users = {
  users: User[];
};

export const loader = async () => {
  let users = await getAllApprovedUsersData();

  return { users };
};

const Archives = () => {
  const { users } = useLoaderData() as Users;

  const groupedUsers = useMemo(() => {
    return users.reduce<{ [key: string]: User[] }>((acc, user) => {
      // Format the updatedAt date as "Month Day, Year"
      const date = new Date(user.updatedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(user);
      return acc;
    }, {});
  }, []);

  const handleDownload = (date: string, users: User[]) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`User Report - ${date}`, 10, 10);

    let yPosition = 20;

    users.forEach((user, index) => {
      doc.setFontSize(12);
      doc.text(
        `${index + 1}. Name: ${user.name}, Email: ${user.email}, Address: ${
          user.address
        }, Contact: ${user.contact}, OR Number: ${user.orNumber}, Category: ${
          user.category
        }, Gender: ${user.gender}, Started: ${user.dateStarted}`,
        10,
        yPosition
      );
      yPosition += 10;

      if (yPosition > 280) {
        doc.addPage();
        yPosition = 10;
      }
    });

    doc.save(`User_Report_${date.replace(/ /g, "_")}.pdf`);
  };

  return (
    <div className="flex flex-col gap-5">
      <h2>Archives</h2>
      <Accordion>
        {Object.keys(groupedUsers).map((date, index) => (
          <AccordionItem
            key={index}
            aria-label={`Accordion ${index + 1}`}
            title={
              <div className="flex justify-between items-center w-full">
                <span>{date}</span>
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => handleDownload(date, groupedUsers[date])}
                >
                  Download Report
                </button>
              </div>
            }
          >
            {/* Nested Accordion for each user */}
            <Accordion>
              {groupedUsers[date].map((user) => (
                <AccordionItem
                  key={user._id}
                  aria-label={user.name}
                  title={user.name}
                >
                  <div className="flex flex-col gap-5">
                    <User
                      avatarProps={{
                        src: user.profilePictureUrl,
                      }}
                      description={user.email}
                      name={user.name}
                    />
                    <ul className="flex justify-center gap-1 w-full flex-wrap">
                      <li>Address: {user.address}</li>
                      <Divider orientation="vertical" />
                      <li>Contact: {user.contact}</li>
                      <Divider orientation="vertical" />
                      <li>Category: {user.category}</li>
                      <Divider orientation="vertical" />
                      <li>OR Number: {user.orNumber}</li>
                      <Divider orientation="vertical" />
                      <li>Gender: {user.gender}</li>
                      <Divider orientation="vertical" />
                      <li>Started: {user.dateStarted}</li>
                    </ul>
                  </div>
                </AccordionItem>
              ))}
            </Accordion>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Archives;
