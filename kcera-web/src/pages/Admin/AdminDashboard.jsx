import * as React from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { DemoTheme } from "../../utils/Theme";
import { lazy, Suspense } from "react";
import Loader from "../../utils/loader";
import { playAlarm } from "../../utils/alarmAudio";
import { stopAlarm } from "../../utils/alarmAudio";

//API
import socket from "../../utils/API/socket";
import GetPendingUserApi from "./API/GetPendingUserApi";
import GetResidentsApi from "./API/GetResidentsApi";
import GetRespondersApi from "./API/GetRespondersApi";
import GetDriversApi from "./API/GetDriversApi";
import ApproveUserApi from "./API/ApproveUserApi";
import GetEmergencyApi from "./API/GetEmergencyApi";
import GetCurrentResponsesApi from "./API/GetCurrentResponsesApi";
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

const OnGoing = lazy(() => import("./components/Tables/OngoingResponses"));

const AdminAccountSetting = lazy(
  () => import("./components/AdminAccountSetting")
);

const AnalyticDashboard = lazy(() => import("./components/AnalyticsDashboard"));

const SystemLogs = lazy(() => import("./components/Tables/SystemLogs"));

const NotifyUsers = lazy(() => import("./components/Tables/NotifyUsers"));

const History = lazy(() => import("./components/Tables/History"));

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
  OngoingResponses
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

    case "ongoing":
      return (
        <Suspense fallback={<Loader />}>
          <OnGoing data={OngoingResponses} />
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
        <Suspense>
          <SystemLogs />
        </Suspense>
      );

    case "notifyUser":
      return (
        <Suspense>
          <NotifyUsers />
        </Suspense>
      );

    case "history":
      return (
        <Suspense>
          <History />
        </Suspense>
      );

    default:
      return null;
  }
};

export default function AdminDashboard() {
  // handle sang pag kwa sang list sang mga pending users
  const [pendingUsers, setPendingUsers] = React.useState([]);

  // const socket = io("http://127.0.0.1:8080");

  React.useEffect(() => {
    socket.on("PendingUser", () => {
      handleGetPendingUsers();
    });

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
    socket.on("userStatusUpdate", () => {
      handleResponders();
    });
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
    socket.on("userStatusUpdate", () => {
      handleDrivers();
    });
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

  React.useEffect(() => {
    socket.on("emergencyRequests", () => {
      handdleGetEmergency();
    });

    handdleGetEmergency();

    return () => {
      socket.off("emergencyRequests");
    };
  }, []);

  const prevLength = React.useRef(0);

  const handdleGetEmergency = async () => {
    const emergencies = await GetEmergencyApi();
    const emergencyData = emergencies.emergencies.data;

    if (emergencyData.length > prevLength.current) {
      playAlarm();
    }

    if (emergencyData.length === 0) {
      stopAlarm();
    }

    prevLength.current = emergencyData.length;

    SetEmergency(emergencyData);
  };

  //handle sa pag kwa sang ongoing responses

  const [ongoingResponses, setOngoingResponses] = React.useState([]);

  React.useEffect(() => {
    socket.on("responded", () => {
      handleGetResponses();
    });
    handleGetResponses();
  }, []);

  const handleGetResponses = async () => {
    const responses = await GetCurrentResponsesApi();
    setOngoingResponses(responses.data.data);
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
            ongoingResponses
          )}
        </div>
      </DashboardLayout>
    </AppProvider>
  );
}
