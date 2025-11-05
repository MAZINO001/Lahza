import React from "react";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function Inv_Qt_sidebar({ type, data }) {
  const title = type === "invoice" ? "All Invoices" : "All Quotes";
  const { role } = useAuth();
  return (
    <div className="w-[260px] bg-white border-r flex flex-col">
      {/* Sidebar Header */}
      <div className="px-2 py-4 border-b flex items-center gap-3">
        <h1 className="text-lg flex-1 font-medium rounded">{title}</h1>
        <Link to={`/${role}/quotes/new`}>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 text-sm">
            + New
          </Button>
        </Link>
        <button className=" p-2 hover:bg-gray-100 rounded cursor-pointer">
          <Menu size={20} />
        </button>
      </div>

      {/* Sidebar Body */}
      <div className="flex-1 overflow-y-auto">
        {data.map((quote, index) => (
          <div
            key={index}
            className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
              quote.id === "QT-000004"
                ? "bg-blue-50 border-l-4 border-l-blue-500"
                : ""
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <span className="font-medium text-gray-900">
                {quote.client.user.name}
              </span>
              <span className="font-semibold text-gray-900">
                {quote.total_amount}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-blue-600">{quote.id}</span>
              <span className="text-gray-500">{quote.quotation_date}</span>
              <span
                className={`px-2 py-0.5 rounded text-xs font-medium ${
                  quote.status === "ACCEPTED"
                    ? "bg-green-100 text-green-700"
                    : quote.status === "DRAFT"
                      ? "bg-gray-100 text-gray-700"
                      : "bg-blue-100 text-blue-700"
                }`}
              >
                {quote.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
