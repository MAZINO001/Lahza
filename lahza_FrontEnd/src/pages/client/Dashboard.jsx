// /* eslint-disable no-unused-vars */
// /* eslint-disable react-hooks/exhaustive-deps */
// import { useEffect, useState } from "react";
// import { StatCard } from "../../Components/StateCard";
// import { StatusBadge } from "../../Components/StatusBadge";
// import {
//   FolderOpen,
//   FileText,
//   Receipt,
//   CheckCircle,
//   ArrowRight,
//   BadgePercent,
// } from "lucide-react";
// import { Calendar, CalendarDayButton } from "../../Components/ui/calendar";
// import { mockProjectTasks, mockInvoices } from "../../lib/mockData";
// import { Link } from "react-router-dom";
// const mockUser = {
//   id: "client-001-uuid-here",
//   email: "demo@example.com",
//   name: "Demo User",
// };
// const services = ["Hosting", "Logo Design", "Web App Creation"];
// export default function Dashboard() {
//   const [selectedDay, setSelectedDay] = useState(null);
//   const [projects, setProjects] = useState([]);
//   const [quotes, setQuotes] = useState([]);
//   const [invoices, setInvoices] = useState([]);
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadDashboardData();
//   }, [mockUser]);

//   const loadDashboardData = async () => {
//     if (!mockUser) return;
//     await new Promise((resolve) => setTimeout(resolve, 500));

//     setTasks(mockProjectTasks);
//     setInvoices(mockInvoices);
//     setLoading(false);
//   };

//   const activeProjects = projects.filter(
//     (p) => p.status === "in_progress" || p.status === "planning"
//   );
//   const pendingQuotes = quotes.filter((q) => q.status === "pending");
//   const pendingInvoices = invoices.filter((i) => i.status === "pending");
//   const completedTasks = projects.reduce(
//     (sum, p) => sum + Math.floor((p.progress_percentage / 100) * 10),
//     0
//   );

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-4">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         <StatCard
//           title="Active Projects"
//           value={activeProjects.length}
//           icon={FolderOpen}
//           color="blue"
//           subtitle="Currently in progress"
//         />
//         <StatCard
//           title="Pending Quotes"
//           value={pendingQuotes.length}
//           icon={FileText}
//           color="orange"
//           subtitle="Awaiting your review"
//         />
//         <StatCard
//           title="Pending Invoices"
//           value={pendingInvoices.length}
//           icon={Receipt}
//           color="green"
//           subtitle="Requiring payment"
//         />
//         <StatCard
//           title="new offers"
//           value=""
//           icon={BadgePercent}
//           color="slate"
//           subtitle=""
//         />
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-[75%_25%] gap-4 ">
//         <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col lg:flex-row items-start gap-4 h-full ">
//           <div className="w-full lg:w-2/5 h-60 lg:h-[90%] flex items-center justify-center rounded-xl overflow-hidden">
//             <img
//               src="https://picsum.photos/500/500"
//               alt="project overview"
//               className="w-full h-full object-cover rounded-xl"
//             />
//           </div>

//           <div className="w-full lg:w-3/5 flex flex-col justify-between">
//             <div className="flex items-center justify-between">
//               <h2 className="text-2xl font-semibold text-slate-900 mb-2">
//                 Lahza Web App
//               </h2>
//               <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
//                 <span> 12/12/20</span>
//                 <span>→</span>
//                 <span> 01/02/21</span>
//               </div>
//             </div>

//             <div className="flex-1 overflow-y-auto max-h-80 pr-2 w-full">
//               {tasks.length === 0 ? (
//                 <p className="text-slate-500 text-center py-8">No tasks yet</p>
//               ) : (
//                 <div className="space-y-3">
//                   {tasks.slice(0, 10).map((task) => (
//                     <div
//                       key={task.id}
//                       className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border border-slate-200 hover:border-slate-300 transition-all"
//                     >
//                       <div className="flex-1 mb-2 sm:mb-0">
//                         <h4 className="text-sm font-medium text-slate-900 mb-1">
//                           {task.title}
//                         </h4>
//                       </div>
//                       <div className="flex items-center space-x-3">
//                         <StatusBadge status={task.status} />
//                         <div className="flex flex-col sm:flex-row items-start sm:items-center text-xs text-slate-600">
//                           <span>Assigned to: {task.assigned_to}</span>
//                           <span className="ml-0 sm:ml-3">
//                             Due: {new Date(task.due_date).toLocaleDateString()}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <div className="mt-4 text-sm text-slate-700">
//               <span className="font-semibold mr-2">Services:</span>

//               {services.map((service) => (
//                 <span
//                   key={service}
//                   className="inline-block text-slate-100 bg-primary/70 px-3 py-1 rounded-full text-xs mr-2 mb-2"
//                 >
//                   {service}
//                 </span>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center justify-center h-full mr-4">
//           <Calendar
//             mode="single"
//             selected={selectedDay}
//             onSelect={setSelectedDay}
//             defaultMonth={new Date()}
//             showWeekNumber={true}
//           />
//         </div>
//       </div>

//       <div className="bg-white rounded-xl border border-slate-200 p-6">
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-xl font-bold text-slate-900">Recent Invoices</h2>
//           <Link
//             to="/client/invoices"
//             className="text-sm text-slate-600 hover:text-slate-900 font-medium flex items-center"
//           >
//             View All
//             <ArrowRight className="w-4 h-4 ml-1" />
//           </Link>
//         </div>

//         {invoices.length === 0 ? (
//           <p className="text-slate-500 text-center py-8">No invoices yet</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b border-slate-200">
//                   <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">
//                     Invoice
//                   </th>
//                   <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">
//                     Title
//                   </th>
//                   <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">
//                     Amount
//                   </th>
//                   <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">
//                     Due Date
//                   </th>
//                   <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">
//                     Status
//                   </th>
//                   <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {invoices.map((invoice) => (
//                   <tr
//                     key={invoice.id}
//                     className="border-b border-slate-100 hover:bg-slate-50"
//                   >
//                     <td className="py-3 px-4 text-sm font-medium text-slate-900">
//                       {invoice.invoice_number}
//                     </td>
//                     <td className="py-3 px-4 text-sm text-slate-600">
//                       {invoice.title}
//                     </td>
//                     <td className="py-3 px-4 text-sm font-medium text-slate-900">
//                       ${invoice.amount.toLocaleString()}
//                     </td>
//                     <td className="py-3 px-4 text-sm text-slate-600">
//                       {new Date(invoice.due_date).toLocaleDateString()}
//                     </td>
//                     <td className="py-3 px-4">
//                       <StatusBadge status={invoice.status} />
//                     </td>
//                     <td className="py-3 px-4 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
//                       {invoice.status === "pending" && (
//                         <button
//                           // onClick={() => handlePayInvoice(invoice)}
//                           className="text-sm bg-slate-900 text-white px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
//                         >
//                           Pay Now
//                         </button>
//                       )}

//                       {invoice.status === "paid" && (
//                         <span className="text-sm text-slate-500">
//                           Paid{" "}
//                           {invoice.paid_at
//                             ? new Date(invoice.paid_at).toLocaleDateString()
//                             : ""}
//                         </span>
//                       )}

//                       <button
//                         // onClick={() => handleDownloadInvoice(invoice)}
//                         className="text-sm bg-white border border-slate-300 text-slate-900 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
//                       >
//                         Download
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { Outlet } from "react-router-dom";
import Test from "../../../test";
import { AppSidebar } from "../../Components/app-sidebar";

import { SidebarInset, SidebarProvider } from "../../Components/ui/sidebar";
// import { mockInvoices } from "../../lib/mockData";

export default function Page() {
  return (
    <SidebarProvider
      style={{
        // "--sidebar-width": "calc(var(--spacing) * 72)",
        // "--header-height": "calc(var(--spacing) * 12)",

        /* smaller sidebar */
        "--sidebar-width: calc(var(--spacing) * 36)":
        "--header-height: calc(var(--spacing) * 6)" /* smaller header */,
      }}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        {/* <SiteHeader /> */}
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <Outlet />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
