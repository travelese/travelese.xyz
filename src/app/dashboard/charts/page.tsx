"use client";

import AreaChartStacked from "@/components/charts/AreaChartStacked";
import BarChartMultiple from "@/components/charts/BarChartMultiple";
import PieChartDonutwithText from "@/components/charts/PieChartDonutwithText";
import BarChartInteractive from "@/components/charts/BarChartInteractive";

export default function ChartsPage() {
  return (
    <>
      <main className="p-4 md:p-0">
        <AreaChartStacked />
        <BarChartMultiple />
        <PieChartDonutwithText />
        <BarChartInteractive />
      </main>
    </>
  );
}
