import Barchart from "@/components/Barchart";
import MainBarchart from "@/components/MainBarchart";
import Pierchart from "@/components/Piechart";
const Analytics = () => {
  return (
    <div className="flex flex-col w-full gap-8">
      <MainBarchart />
      <div className="grid grid-cols-2 gap-8">
        <Barchart />
        <Pierchart />
      </div>
    </div>
  );
};

export default Analytics;
