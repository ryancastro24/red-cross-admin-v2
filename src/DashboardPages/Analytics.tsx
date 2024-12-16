import Barchart from "@/components/Barchart";
import MainBarchart from "@/components/MainBarchart";
import Pierchart from "@/components/Piechart";
import {
  getAllDataPerMonth,
  getAllCities,
  getAllGenders,
} from "@/backendapi/analytics";
import { useLoaderData } from "react-router-dom";

export const loader = async () => {
  const users = await getAllDataPerMonth();
  const cities = await getAllCities();
  const genders = await getAllGenders();
  return { users, cities, genders };
};

const Analytics = () => {
  const { users, cities, genders } = useLoaderData();

  return (
    <div className="flex flex-col w-full gap-8">
      <MainBarchart users={users} />
      <div className="grid grid-cols-2 gap-8">
        <Barchart cities={cities} />
        <Pierchart genders={genders} />
      </div>
    </div>
  );
};

export default Analytics;
