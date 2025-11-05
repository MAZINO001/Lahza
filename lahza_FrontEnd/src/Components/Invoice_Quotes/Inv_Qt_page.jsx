/* eslint-disable no-unused-vars */
import { Download, Edit2, Printer, Send } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

export default function Inv_Qt_page({ type, data }) {
  const title = type === "invoice" ? "All Invoices" : "All Quotes";
  return (
    <div className="flex-1 flex flex-col">
      <div className="bg-white border-b px-2 py-4 flex items-center justify-between">
        <div className="text-lg font-semibold">QT-0004</div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded cursor-pointer">
            <Edit2 size={20} />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded cursor-pointer">
            <Download size={20} />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded cursor-pointer">
            <Printer size={20} />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded cursor-pointer">
            <Send size={20} />
          </button>
          <div className="w-px h-6 bg-gray-300 mx-2"></div>
          {type === "quote" ? (
            <Button variant="outline" className="text-sm">
              Convert to Invoice
            </Button>
          ) : (
            ""
          )}
        </div>
      </div>

      {/* <div className="flex-1 overflow-y-auto p-8 bg-gray-100">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-12">
          <div className="flex justify-between items-start mb-12">
            <div className="relative">
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                Z
              </div>
              <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-3 py-1 rounded transform rotate-12">
                Approved
              </div>
              <div className="mt-3">
                <div className="font-bold text-lg">Zylker</div>
                <div className="text-sm text-gray-600 mt-1">
                  54 Zahir Heights
                </div>
                <div className="text-sm text-gray-600">Harmada</div>
                <div className="text-sm text-gray-600">Jabalpur - 128024</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold mb-2">QUOTE</div>
              <div className="text-sm text-gray-600"># QT-000004</div>
            </div>
          </div>

          <div className="mb-8">
            <div className="text-sm font-semibold mb-1">Bill To</div>
            <div className="text-blue-600 text-sm">Pooja J</div>
          </div>

          <div className="flex gap-8 mb-8">
            <div>
              <div className="text-sm text-gray-600">Quote Date :</div>
              <div className="text-sm">09/08/2018</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Expiry Date :</div>
              <div className="text-sm">17/08/2018</div>
            </div>
          </div>

          <table className="w-full mb-8">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="text-left px-4 py-3 text-sm">#</th>
                <th className="text-left px-4 py-3 text-sm">
                  Item & Description
                </th>
                <th className="text-right px-4 py-3 text-sm">Qty</th>
                <th className="text-right px-4 py-3 text-sm">Rate</th>
                <th className="text-right px-4 py-3 text-sm">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 text-sm">1</td>
                <td className="px-4 py-3 text-sm">Rosewood Frame</td>
                <td className="px-4 py-3 text-sm text-right">4.00</td>
                <td className="px-4 py-3 text-sm text-right">40.00</td>
                <td className="px-4 py-3 text-sm text-right">160.00</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 text-sm">2</td>
                <td className="px-4 py-3 text-sm">Onyx Vase</td>
                <td className="px-4 py-3 text-sm text-right">4.00</td>
                <td className="px-4 py-3 text-sm text-right">20.00</td>
                <td className="px-4 py-3 text-sm text-right">80.00</td>
              </tr>
            </tbody>
          </table>

          <div className="flex justify-end">
            <div className="w-64">
              <div className="flex justify-between py-2 border-b">
                <span className="text-sm">Sub Total</span>
                <span className="text-sm font-semibold">465.00</span>
              </div>
              <div className="flex justify-between py-2 border-b-2 border-gray-800">
                <span className="text-sm font-bold">Total</span>
                <span className="text-sm font-bold">₹465.00</span>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
