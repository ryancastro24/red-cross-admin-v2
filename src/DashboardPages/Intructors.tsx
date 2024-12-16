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

      <div className="grid grid-cols-3 gap-5">
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
                  <p className="text-small text-default-500">nextui.org</p>
                </div>
              </CardHeader>

              <CardBody className="grid grid-cols-2 gap-5">
                <Progress
                  className="max-w-md"
                  label="Field Number 1"
                  value={
                    (val.totals.rate1Total /
                      (val.totals.ratingTotalCount * 5)) *
                    100
                  }
                  size="sm"
                />

                <Progress
                  className="max-w-md"
                  label="Field Number 2"
                  value={
                    (val.totals.rate2Total /
                      (val.totals.ratingTotalCount * 5)) *
                    100
                  }
                  size="sm"
                />

                <Progress
                  className="max-w-md"
                  label="Field Number 3"
                  value={
                    (val.totals.rate3Total /
                      (val.totals.ratingTotalCount * 5)) *
                    100
                  }
                  size="sm"
                />

                <Progress
                  className="max-w-md"
                  label="Field Number 4"
                  value={
                    (val.totals.rate4Total /
                      (val.totals.ratingTotalCount * 5)) *
                    100
                  }
                  size="sm"
                />

                <Progress
                  className="max-w-md"
                  label="Field Number 5"
                  value={
                    (val.totals.rate5Total /
                      (val.totals.ratingTotalCount * 5)) *
                    100
                  }
                  size="sm"
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
