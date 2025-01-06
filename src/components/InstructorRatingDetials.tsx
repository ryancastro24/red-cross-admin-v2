import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Progress } from "@nextui-org/progress";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { getInstructorRatings } from "@/backendapi/ratings";
import { Button } from "@nextui-org/button";
import { useNavigate } from "react-router-dom";

// Typing the loader data
interface InstructorRating {
  _id: string;
  name: string;
  field: string;
  rate1: number;
  rate2: number;
  rate3: number;
  rate4: number;
  rate5: number;
  userId: {
    _id: string;
    name: string;
    email: string;
  };
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const id = params.id; // Get the instructor ID from params
  const instructorRatings = await getInstructorRatings(id); // Fetch instructor ratings
  console.log(instructorRatings);
  return { instructorRatings };
};

const InstructorRatingDetails = () => {
  const navigate = useNavigate();
  const { instructorRatings } = useLoaderData<{
    instructorRatings: InstructorRating[];
  }>(); // Correct type for useLoaderData

  // Check if ratings exist and render accordingly
  return (
    <div className="w-full h-full relative">
      {instructorRatings.length === 0 ? (
        <div className="flex justify-center items-center w-full h-full gap-10 flex-col ">
          <iframe
            src="https://lottie.host/embed/faf55eb3-6ed7-4fcd-87f1-bbd35b506c88/LQboDsq4TC.lottie"
            style={{
              top: 0,
              left: 0,
              width: "500px",
              height: "500px",
              border: "none",
            }}
          ></iframe>

          <Button
            variant="light"
            className="absolute top-2 left-2"
            color="primary"
            onPress={() => navigate(-1)} // Navigate to the previous page
          >
            GO BACK
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-5 w-full h-full ">
          <Button
            variant="light"
            className="absolute top-2 left-2"
            color="primary"
            onPress={() => navigate(-1)} // Navigate to the previous page
          >
            GO BACK
          </Button>

          <div className="grid grid-cols-2">
            {instructorRatings.map((val) => (
              <Card key={val._id} className="w-full">
                <CardHeader className="flex gap-3">
                  <div className="flex flex-col">
                    <p className="text-md">{val.userId.name}</p>
                    <p className="text-small text-default-500">
                      {val.userId.email}
                    </p>
                  </div>
                </CardHeader>

                <CardBody className="grid grid-cols-2 gap-5">
                  <Progress
                    className="max-w-md"
                    label="Ability to explain teh course material"
                    value={(val.rate1 / 5) * 100}
                    size="sm"
                  />

                  <Progress
                    className="max-w-md"
                    label="Engaging and intercative environment"
                    value={(val.rate2 / 5) * 100}
                    size="sm"
                  />

                  <Progress
                    className="max-w-md"
                    label="Effictive Trainer feedback and question handling"
                    value={(val.rate3 / 5) * 100}
                    size="sm"
                  />

                  <Progress
                    className="max-w-md"
                    label="Knowledgeable and confident in subject matter"
                    value={(val.rate4 / 5) * 100}
                    size="sm"
                  />

                  <Progress
                    className="max-w-md"
                    label="Adhere course objective and training schedule"
                    value={(val.rate5 / 5) * 100}
                    size="sm"
                  />
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorRatingDetails;
