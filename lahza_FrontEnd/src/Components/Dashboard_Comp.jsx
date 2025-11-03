import React from "react";
import { ChartAreaInteractive } from "./chart-area-interactive";
import { DataTable } from "./data-table";
import { mockInvoices } from "../lib/mockData";
import { SectionCards } from "./section-cards";
// import data from "../lib/data.json";
import Test from "../../test";
import DataTable_comp from "../Components/DataTable_Comp";

export default function Dashboard_Comp() {
  return (
    <div className="flex flex-col gap-4 pt-4">
      <SectionCards />
      <div className="px-4">
        {/* <ChartAreaInteractive /> */}
        <Test />
      </div>
      <div className="mx-4">
        {/* <DataTable data={data} /> */}
        <DataTable_comp data={mockInvoices} />
      </div>
    </div>
  );
}
