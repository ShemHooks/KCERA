import * as React from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { DemoTheme } from "../../utils/Theme";
import { lazy, Suspense } from "react";
import Loader from "../../utils/loader";

//API
import GetPendingUserApi from "./API/GetPendingUserApi";
import GetResidentsApi from "./API/GetResidentsApi";
import GetRespondersApi from "./API/GetRespondersApi";
import GetDriversApi from "./API/GetDriversApi";
import ApproveUserApi from "./API/ApproveUserApi";
//navigation
import { NAVIGATION } from "./components/ContentNavigation";

//tables and pages

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

const NewAccount = lazy(() => import("./components/AddNewAccount"));

const EmergencyRequests = lazy(
  () => import("./components/Tables/EmergencyRequest")
);

const ReportsTable = lazy(() => import("./components/Tables/ReportsTable"));

const AdminAccountSetting = lazy(
  () => import("./components/AdminAccountSetting")
);

// socket
import { io } from "socket.io-client";
// import { Emergency } from "@mui/icons-material";

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

const renderContent = (
  section,
  users,
  approvePending,
  declinePending,
  resident,
  responders,
  drivers,
  EmergencyReq,
  reports
) => {
  switch (section) {
    case "emergencyRequests":
      return (
        <Suspense fallback={<Loader />}>
          <EmergencyRequests emergency={EmergencyReq} />
        </Suspense>
      );
    case "accounts/pendingAccounts":
      return (
        <Suspense fallback={<Loader />}>
          <PendingAccounts
            users={users}
            approvePending={approvePending}
            declinePending={declinePending}
          />
        </Suspense>
      );
    case "accounts":
      return (
        <Suspense fallback={<Loader />}>
          <PendingAccounts
            users={users}
            approvePending={approvePending}
            declinePending={declinePending}
          />
        </Suspense>
      );
    case "accounts/residents":
      return (
        <Suspense fallback={<Loader />}>
          <Approveduserstable resident={resident} />
        </Suspense>
      );
    case "accounts/responders":
      return (
        <Suspense fallback={<Loader />}>
          <RespondersTable responders={responders} />
        </Suspense>
      );

    case "accounts/drivers":
      return (
        <Suspense fallback={<Loader />}>
          <DriversTable drivers={drivers} />
        </Suspense>
      );

    case "accounts/addNewUser":
      return (
        <Suspense fallback={<Loader />}>
          <NewAccount />
        </Suspense>
      );

    case "reports":
      return (
        <Suspense fallback={<Loader />}>
          <ReportsTable data={reports} />
        </Suspense>
      );

    case "myAccount":
      return (
        <Suspense fallback={<Loader />}>
          <AdminAccountSetting />
        </Suspense>
      );

    default:
      return null;
  }
};

export default function AdminDashboard() {
  // handle sang pag kwa sang list sang mga pending users
  const [pendingUsers, setPendingUsers] = React.useState([]);

  const socket = io("http://127.0.0.1:8080");

  React.useEffect(() => {
    socket.on("PendingUser", () => {
      handleGetPendingUsers();
    });

    // Fetch pending users on initial render
    handleGetPendingUsers();
  }, []);

  const handleGetPendingUsers = async () => {
    const response = await GetPendingUserApi();
    if (response.users) {
      setPendingUsers(response.users);
    } else {
      alert(response.message);
    }
  };

  //handle sa pag kwa sang mga active residents users
  const [approveUsers, setApproveUsers] = React.useState([]);

  React.useEffect(() => {
    socket.on("updatedResidents", () => {
      handleApprovedUsers();
    });

    handleApprovedUsers();
  }, []);

  const handleApprovedUsers = async () => {
    const UserResponse = await GetResidentsApi();
    if (UserResponse.users) {
      setApproveUsers(UserResponse.users);
    }
  };

  // Shem ni

  // handle sa pag kwa sang list ka responders
  const [responders, SetResponders] = React.useState([]);

  React.useEffect(() => {
    handleResponders();
  }, []);

  const handleResponders = async () => {
    const respondersList = await GetRespondersApi();
    if (respondersList.responders) {
      SetResponders(respondersList.responders);
    }
  };

  // handle naman ni ya sa pag kwa sang list sang mga drivers

  const [drivers, SetDrivers] = React.useState([]);

  React.useEffect(() => {
    handleDrivers();
  }, []);

  const handleDrivers = async () => {
    const driversList = await GetDriversApi();
    if (driversList.drivers) {
      SetDrivers(driversList.drivers);
    }
  };

  // handle sa pag kwa sang emergencies
  const [EmergencyReq, SetEmergency] = React.useState([]);
  // console.log(Emergency)

  React.useEffect(() => {
    socket.on("emergencyRequests", () => {
      handdleGetEmergency();
    });
    handdleGetEmergency();
  }, []);

  const handdleGetEmergency = async () => {
    const emergencies = await GetEmergencyRequest();

    if (emergencies.emergency) {
      SetEmergency(emergencies.emergency);
    }
  };

  // reports naman ni

  const [reports, setReports] = React.useState([]);

  React.useEffect(() => {
    socket.on("ReadPatientCareReport", () => {
      handleReport();
    });
    handleReport();
  }, []);

  const handleReport = async () => {
    const reported = await GetReport();

    if (reported.reports) {
      setReports(reported.reports);
    }
  };

  const router = useDemoRouter("/emergencyRequests");

  return (
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
        <div>
          {renderContent(
            router.pathname.slice(1),
            pendingUsers,
            (id) => ApproveUserApi(id, handleGetPendingUsers),
            (id) => declinePending(id, handleGetPendingUsers),
            approveUsers,
            responders,
            drivers,
            EmergencyReq,
            reports
          )}
        </div>
      </DashboardLayout>
    </AppProvider>
  );
}
