import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

function Dashboard() {
  return (
    <div className="h-screen w-full flex flex-col">
      {/* Navbar */}
      <DashboardNavbar />

      {/* Main Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <DashboardSidebar />

        {/* Content */}
      </div>
    </div>
  );
}

export default Dashboard;
