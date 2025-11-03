// import Header from "@/Components/Header";
// import SideBar from "@/Components/SideBar";
// import { Outlet } from "react-router-dom";

// export default function Layout() {
//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <aside className="">
//         <SideBar />
//       </aside>

//       <div className="flex flex-col flex-1">
//         <Header />

//         <main className="flex-1 p-2 ">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }

import Header from "@/Components/Header";
import Dashboard from "../pages/client/Dashboard";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-accent-foreground ">
      <header className="w-full border-b">
        <Header />
      </header>

      <div>
        <Dashboard />
      </div>
    </div>
  );
}
