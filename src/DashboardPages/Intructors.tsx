import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { instructors } from "../libs/sampleUserData";
import { Progress } from "@nextui-org/progress";

const InstructorPage = () => {
  return (
    <div className="w-full flex flex-col gap-8">
      <h2>Instructor Page</h2>

      <div className="grid grid-cols-3 gap-5">
        {instructors.map((val) => (
          <Card className="w-full">
            <CardHeader className="flex gap-3">
              <div className="flex flex-col">
                <p className="text-md">{val.name}</p>
                <p className="text-small text-default-500">nextui.org</p>
              </div>
            </CardHeader>

            <CardBody className="grid grid-cols-2 gap-5">
              <Progress
                className="max-w-md"
                label="Field Number 1"
                value={55}
                size="sm"
              />

              <Progress
                className="max-w-md"
                label="Field Number 2"
                value={55}
                size="sm"
              />

              <Progress
                className="max-w-md"
                label="Field Number 3"
                value={55}
                size="sm"
              />

              <Progress
                className="max-w-md"
                label="Field Number 4"
                value={55}
                size="sm"
              />

              <Progress
                className="max-w-md"
                label="Field Number 5"
                value={55}
                size="sm"
              />
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InstructorPage;
