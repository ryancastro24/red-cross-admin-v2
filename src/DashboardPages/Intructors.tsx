import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Progress } from "@nextui-org/progress";
import { getInstructorsData } from "@/backendapi/instructor";
import { Link, useLoaderData } from "react-router-dom";
export const loader = async () => {
  const instructors = await getInstructorsData();

  return { instructors };
};

const InstructorPage = () => {
  const { instructors } = useLoaderData() as any;

  return (
    <div className="w-full flex flex-col gap-8">
      <h2>Instructor Page</h2>

      <div className="w-full h-full grid grid-cols-2 gap-5">
        {instructors.map((val: any) => (
          <Link
            key={val._id}
            to={`instructor_ratings/${val._id}`}
            state={{ instructor_id: val._id }}
          >
            <Card key={val._id} className="w-full">
              <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                  <p className="text-md">{val.name}</p>
                  <p className="text-small text-default-500">{val.field}</p>
                </div>
              </CardHeader>

              <CardBody className="flex flex-col gap-3">
                <Progress
                  className="w-full"
                  label="Ability to explain teh course material"
                  value={
                    (val.totals.rate1Total /
                      (val.totals.ratingTotalCount * 5)) *
                    100
                  }
                  size="sm"
                  showValueLabel={true}
                />

                <Progress
                  className="w-full"
                  label="Engaging and intercative environment"
                  value={
                    (val.totals.rate2Total /
                      (val.totals.ratingTotalCount * 5)) *
                    100
                  }
                  size="sm"
                  showValueLabel={true}
                />

                <Progress
                  className="w-full"
                  label="Effictive Trainer feedback and question handling"
                  value={
                    (val.totals.rate3Total /
                      (val.totals.ratingTotalCount * 5)) *
                    100
                  }
                  size="sm"
                  showValueLabel={true}
                />

                <Progress
                  className="w-full"
                  label="Knowledgeable and confident in subject matter"
                  value={
                    (val.totals.rate4Total /
                      (val.totals.ratingTotalCount * 5)) *
                    100
                  }
                  size="sm"
                  showValueLabel={true}
                />

                <Progress
                  className="w-full"
                  label="Adhere course objective and training schedule"
                  value={
                    (val.totals.rate5Total /
                      (val.totals.ratingTotalCount * 5)) *
                    100
                  }
                  size="sm"
                  showValueLabel={true}
                />
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default InstructorPage;
