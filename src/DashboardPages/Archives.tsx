import { Accordion, AccordionItem } from "@nextui-org/react";
import { useMemo } from "react";
import { User } from "@nextui-org/user";
import { Divider } from "@nextui-org/react";
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

const users: User[] = [
  {
    _id: "675ae59c73cc91cbc86be30f",
    name: "aladin madafaker updated",
    email: "ken@gmail.com",
    address: "ALFONSO",
    orNumber: 123,
    contact: "0912312222",
    gender: "male",
    password: "$2a$10$TN4ENT9RpJlzPrAHiG3H1eODP.ycMO9XWKDMWfaEXioGZ/ODX7MUG",
    userType: "user",
    certificateApproved: true,
    profilePictureUrl:
      "https://res.cloudinary.com/dmfgc0os2/image/upload/v1734010266/uploads/…",
    certificateUrl:
      "https://res.cloudinary.com/dmfgc0os2/image/upload/v1734584604/uploads/…",
    category: "standard",
    dateStarted: "2024-12-11",
    createdAt: "2024-12-12T13:31:08.190+00:00",
    updatedAt: "2024-12-19T05:03:25.810+00:00",
    __v: 0,
  },
  {
    _id: "675bb11f56856aef3b4bfe07",
    name: "matt",
    email: "matt@gmail.com",
    address: "ALFONSO",
    orNumber: 123,
    contact: "0962615222",
    gender: "male",
    password: "$2a$10$oqXuadgCvyTL2m.85iD/WuvVJgEnys4y9Mtdp5NvEG0PqCylh0mNy",
    userType: "user",
    certificateApproved: true,
    profilePictureUrl:
      "https://res.cloudinary.com/dmfgc0os2/image/upload/v1734062366/uploads/…",
    certificateUrl:
      "https://res.cloudinary.com/dmfgc0os2/image/upload/v1734449303/uploads/…",
    category: "occupational",
    dateStarted: "2024-12-12",
    createdAt: "2024-12-13T03:59:27.364+00:00",
    updatedAt: "2024-12-19T04:01:51.784+00:00",
    __v: 0,
  },
  {
    _id: "675e49b00c7c3f316fd456f4",
    name: "sample",
    email: "sample@test",
    address: "ALFONSO",
    orNumber: 12345,
    contact: "09123122212",
    gender: "male",
    password: "$2a$10$08klY5M8CFPObRDFl1n.aeU7FDF91GjJyirsBC20tlSSbza8Sxtri",
    userType: "user",
    certificateApproved: true,
    profilePictureUrl:
      "https://res.cloudinary.com/dmfgc0os2/image/upload/v1734232495/uploads/…",
    certificateUrl: "",
    category: "occupational",
    dateStarted: "2024-12-12",
    createdAt: "2024-12-15T03:14:56.880+00:00",
    updatedAt: "2024-12-15T04:13:21.799+00:00",
    __v: 0,
  },
  {
    _id: "675e4b2d0c7c3f316fd456ff",
    name: "madd",
    email: "madd@gmail.com",
    address: "ALFONSO",
    orNumber: 123,
    contact: "09122312223",
    gender: "male",
    password: "$2a$10$gepDg1f5EtP8fa.ZuWJXLOho.O8s6itADJ1auoLaFcMAK0LVX6MdO",
    userType: "user",
    certificateApproved: true,
    profilePictureUrl:
      "https://res.cloudinary.com/dmfgc0os2/image/upload/v1734232876/uploads/…",
    certificateUrl:
      "https://res.cloudinary.com/dmfgc0os2/image/upload/v1734450150/uploads/…",
    category: "occupational",
    dateStarted: "2024-12-12",
    createdAt: "2024-12-15T03:21:17.280+00:00",
    updatedAt: "2024-12-19T04:01:51.784+00:00",
    __v: 0,
  },
];

const Archives = () => {
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

  return (
    <div className="flex flex-col gap-5">
      <h2>Archives</h2>
      <Accordion>
        {Object.keys(groupedUsers).map((date, index) => (
          <AccordionItem
            key={index}
            aria-label={`Accordion ${index + 1}`}
            title={`${date}`}
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
