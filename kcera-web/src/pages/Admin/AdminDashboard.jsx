import * as React from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { DemoTheme } from "../../utils/Theme";
import { lazy, Suspense } from "react";
import Loader from "../../utils/loader";
import { NAVIGATION } from "./components/ContentNavigation";
import { DashboardProvider } from "./DashboardContext";

const PendingAccounts = lazy(
  () => import("./components/Tables/PendingAccounts")
);
const Approveduserstable = lazy(
  () => import("./components/Tables/ApprovesUsersTable")
);
const RespondersTable = lazy(
  () => import("./components/Tables/RespondersTable")
);
const DriversTable = lazy(() => import("./components/Tables/GetDriversTable"));
const NewAccount = lazy(() => import("./components/Tables/AddNewAccount"));
const EmergencyRequests = lazy(
  () => import("./components/Tables/EmergencyRequest")
);
const ReportsTable = lazy(() => import("./components/Tables/ReportsTable"));
const OnGoing = lazy(() => import("./components/Tables/OngoingResponses"));
const AdminAccountSetting = lazy(
  () => import("./components/Tables/AdminAccountSetting")
);
const AnalyticDashboard = lazy(
  () => import("./components/Tables/AnalyticsDashboard")
);
const SystemLogs = lazy(() => import("./components/Tables/SystemLogs"));
const NotifyUsers = lazy(() => import("./components/Tables/NotifyUsers"));
const History = lazy(() => import("./components/Tables/History"));

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

const renderContent = (section) => {
  switch (section) {
    case "emergencyRequests":
      return (
        <Suspense fallback={<Loader />}>
          <EmergencyRequests />
        </Suspense>
      );
    case "accounts/pendingAccounts":
      return (
        <Suspense fallback={<Loader />}>
          <PendingAccounts />
        </Suspense>
      );
    case "accounts/residents":
      return (
        <Suspense fallback={<Loader />}>
          <Approveduserstable />
        </Suspense>
      );
    case "accounts/responders":
      return (
        <Suspense fallback={<Loader />}>
          <RespondersTable />
        </Suspense>
      );
    case "accounts/drivers":
      return (
        <Suspense fallback={<Loader />}>
          <DriversTable />
        </Suspense>
      );
    case "accounts/addNewUser":
      return (
        <Suspense fallback={<Loader />}>
          <NewAccount />
        </Suspense>
      );
    case "ongoing":
      return (
        <Suspense fallback={<Loader />}>
          <OnGoing />
        </Suspense>
      );
    case "analytics":
      return (
        <Suspense fallback={<Loader />}>
          <AnalyticDashboard />
        </Suspense>
      );
    case "myAccount":
      return (
        <Suspense fallback={<Loader />}>
          <AdminAccountSetting />
        </Suspense>
      );
    case "logs":
      return (
        <Suspense fallback={<Loader />}>
          <SystemLogs />
        </Suspense>
      );
    case "notifyUser":
      return (
        <Suspense fallback={<Loader />}>
          <NotifyUsers />
        </Suspense>
      );
    case "history":
      return (
        <Suspense fallback={<Loader />}>
          <History />
        </Suspense>
      );
    default:
      return null;
  }
};

export default function AdminDashboard() {
  const router = useDemoRouter("/emergencyRequests");

  return (
    <DashboardProvider>
      <AppProvider
        navigation={NAVIGATION}
        router={router}
        theme={DemoTheme}
        branding={{
          logo: <img src="/images/KCERA.png" alt="KCERA logo" />,
          title: "KCERA",
          homeUrl: "/emergencyRequests",
        }}
      >
        <DashboardLayout>
          {renderContent(router.pathname.slice(1))}
        </DashboardLayout>
      </AppProvider>
    </DashboardProvider>
  );
}
