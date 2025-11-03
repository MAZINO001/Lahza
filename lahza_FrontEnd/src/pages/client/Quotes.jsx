/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
// /* eslint-disable react-hooks/exhaustive-deps */
// import { useEffect, useState } from "react";
// import { StatusBadge } from "../../Components/StatusBadge";
// import { FileText, Check, X, Calendar, DollarSign } from "lucide-react";
// import { mockQuotes } from "../../lib/mockData";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
//   CardDescription,
// } from "@/components/ui/card";
// import { Link } from "react-router-dom";

// // Mock user data
// const mockUser = {
//   id: "client-001-uuid-here",
//   email: "demo@example.com",
//   name: "Demo User",
// };

// export default function Quotes() {
//   const user = mockUser;
//   const [quotes, setQuotes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filterStatus, setFilterStatus] = useState("all");

//   useEffect(() => {
//     loadQuotes();
//   }, []);

//   const loadQuotes = async () => {
//     if (!user) return;

//     // Simulate API delay
//     await new Promise((resolve) => setTimeout(resolve, 500));

//     // Load mock data
//     setQuotes(mockQuotes);
//     setLoading(false);
//   };

//   const filteredQuotes =
//     filterStatus === "all"
//       ? quotes
//       : quotes.filter((q) => q.status === filterStatus);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-4 p-4">
//       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//         {/* <div>
//           <h1 className="text-3xl font-bold tracking-tight">Quotes</h1>
//           <p className="text-muted-foreground">
//             Review and manage your service quotes
//           </p>
//         </div> */}
//         <Button>Generate A Quote</Button>
//         <div className="flex items-center gap-2">
//           <Button
//             onClick={() => setFilterStatus("all")}
//             variant={filterStatus === "all" ? "default" : "outline"}
//             size="sm"
//           >
//             All
//           </Button>
//           <Button
//             onClick={() => setFilterStatus("pending")}
//             variant={filterStatus === "pending" ? "default" : "outline"}
//             size="sm"
//           >
//             Pending
//           </Button>
//           <Button
//             onClick={() => setFilterStatus("accepted")}
//             variant={filterStatus === "accepted" ? "default" : "outline"}
//             size="sm"
//           >
//             Accepted
//           </Button>
//           <Button
//             onClick={() => setFilterStatus("rejected")}
//             variant={filterStatus === "rejected" ? "default" : "outline"}
//             size="sm"
//           >
//             Rejected
//           </Button>
//         </div>
//       </div>

//       {filteredQuotes.length === 0 ? (
//         <Card>
//           <CardContent className="py-12 text-center">
//             <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
//             <h3 className="text-lg font-medium mb-2">No quotes found</h3>
//             <p className="text-muted-foreground">
//               {filterStatus === "all"
//                 ? "You don't have any quotes yet. Request a service to get started."
//                 : `No ${filterStatus} quotes found.`}
//             </p>
//           </CardContent>
//         </Card>
//       ) : (
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
//           {filteredQuotes.map((quote) => (
//             <Card
//               key={quote.id}
//               className="cursor-pointer hover:shadow-md transition-shadow "
//             >
//               <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
//                 <div className="space-y-1">
//                   <CardTitle className="text-lg font-semibold">
//                     {quote.title}
//                   </CardTitle>
//                   <CardDescription>{quote.quote_number}</CardDescription>
//                 </div>
//                 <StatusBadge status={quote.status} />
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <p className="text-sm text-muted-foreground line-clamp-2">
//                   {quote.description}
//                 </p>

//                 <div className="flex items-center justify-between pt-4 border-t">
//                   <div className="flex items-center text-sm text-muted-foreground">
//                     <Calendar className="w-4 h-4 mr-2" />
//                     <span>
//                       Valid until:{" "}
//                       {quote.valid_until
//                         ? new Date(quote.valid_until).toLocaleDateString(
//                             "en-US",
//                             {
//                               year: "numeric",
//                               month: "short",
//                               day: "numeric",
//                             }
//                           )
//                         : "N/A"}
//                     </span>
//                   </div>
//                   <div className="flex items-center font-bold text-lg ">
//                     <DollarSign className="w-5 h-5 mr-1" />
//                     {quote.amount.toLocaleString()}
//                   </div>
//                   <Link to={`/client/quotes/${quote.id}`}>
//                     <Button className="">View Details</Button>
//                   </Link>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
// **************************************

import * as React from "react";
import { useEffect, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "../../Components/StatusBadge";
import { mockQuotes } from "../../lib/mockData";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown, Download } from "lucide-react";
import { Input } from "@/components/ui/input";

// Mock user
const mockUser = {
  id: "client-001-uuid-here",
  email: "demo@example.com",
  name: "Demo User",
};

// Table columns
export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "quote_number",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Quote #
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("quote_number")}</div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Title
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
  },
  {
    accessorKey: "valid_until",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Valid Until
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const value = row.getValue("valid_until");
      if (!value) return "N/A";

      const formatted = new Date(value).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="justify-end"
      >
        Amount
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: "Actions",
    cell: ({ row }) => {
      const quote = row.original;

      const handleView = () => {
        alert(`Viewing ${quote.quote_number}`);
        // You can replace alert with navigation or modal
      };

      return (
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="default"
            onClick={handleView}
            className="h-8"
          >
            View Details
          </Button>
        </div>
      );
    },
  },
];

export default function QuotesTable() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  useEffect(() => {
    loadQuotes();
  }, []);

  const loadQuotes = async () => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    setQuotes(mockQuotes);
    setLoading(false);
  };

  const table = useReactTable({
    data: quotes,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="w-full p-4">
      <div className="flex items-center justify-between  mb-4">
        <Input
          placeholder="Filter by title..."
          value={table.getColumn("title")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Button>request new Quote</Button>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No quotes found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
