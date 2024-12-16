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
  rating1: number;
  rating2: number;
  rating3: number;
  rating4: number;
  rating5: number;
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const id = params.id; // Get the instructor ID from params
  const instructorRatings = await getInstructorRatings(id); // Fetch instructor ratings

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
        instructorRatings.map((val) => (
          <Card key={val._id} className="w-full">
            <CardHeader className="flex gap-3">
              <div className="flex flex-col">
                <p className="text-md">{val.name}</p>
                <p className="text-small text-default-500">{val.field}</p>
              </div>
            </CardHeader>

            <CardBody className="grid grid-cols-2 gap-5">
              <Progress
                className="max-w-md"
                label="Field Number 1"
                value={(val.rating1 / 5) * 100}
                size="sm"
              />

              <Progress
                className="max-w-md"
                label="Field Number 2"
                value={(val.rating2 / 5) * 100}
                size="sm"
              />

              <Progress
                className="max-w-md"
                label="Field Number 3"
                value={(val.rating3 / 5) * 100}
                size="sm"
              />

              <Progress
                className="max-w-md"
                label="Field Number 4"
                value={(val.rating4 / 5) * 100}
                size="sm"
              />

              <Progress
                className="max-w-md"
                label="Field Number 5"
                value={(val.rating5 / 5) * 100}
                size="sm"
              />
            </CardBody>
          </Card>
        ))
      )}
    </div>
  );
};

export default InstructorRatingDetails;
