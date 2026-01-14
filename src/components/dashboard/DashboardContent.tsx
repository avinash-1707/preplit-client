import Profile from "./sections/Profile";
import Settings from "./sections/Settings";
import Main from "./sections/Main";
import Analytics from "./sections/Analytics";
import Interviews from "./sections/Interviews";
import Summary from "./sections/Summary";

function DashboardContent({ activeSection }: { activeSection: string }) {
  return (
    <main className="flex-1 overflow-y-auto p-6">
      {
        {
          profile: <Profile />,
          settings: <Settings />,
          main: <Main />,
          stats: <Analytics />,
          interviews: <Interviews />,
          summary: <Summary />,
        }[activeSection]
      }
    </main>
  );
}

export default DashboardContent;
