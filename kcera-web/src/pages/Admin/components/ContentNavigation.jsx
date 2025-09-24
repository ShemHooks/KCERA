import {
  AccountCircle,
  DirectionsRun,
  Emergency,
  ManageAccounts,
  PendingActions,
  People,
  PersonAdd,
  DirectionsCar,
} from "@mui/icons-material";
import BarChartIcon from "@mui/icons-material/BarChart";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HistoryIcon from "@mui/icons-material/History";
import ListAltIcon from "@mui/icons-material/ListAlt";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
export const NAVIGATION = [
  {
    kind: "header",
    title: "Main",
  },
  {
    segment: "emergencyRequests",
    title: "Map",
    icon: <Emergency />,
  },

  {
    segment: "ongoing",
    title: "On-going Responses",
    icon: <AccessTimeIcon />,
  },

  {
    kind: "divider",
  },

  {
    kind: "header",
    title: "Account Management",
  },

  {
    segment: "accounts",
    title: "Accounts",
    icon: <ManageAccounts />,
    children: [
      {
        segment: "pendingAccounts",
        title: "Pending Accounts",
        icon: <PendingActions />,
      },
      {
        segment: "residents",
        title: "Residents",
        icon: <People />,
      },
      {
        segment: "responders",
        title: "Responders",
        icon: <DirectionsRun />,
      },
      {
        segment: "drivers",
        title: "Drivers",
        icon: <DirectionsCar />,
      },
      {
        segment: "addNewUser",
        title: "Add New Account",
        icon: <PersonAdd />,
      },
    ],
  },
  {
    segment: "logs",
    title: "User Logs",
    icon: <ListAltIcon />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Analytics",
  },

  {
    segment: "analytics",
    title: "Analytics",
    icon: <BarChartIcon />,
  },
  {
    segment: "history",
    title: "Reports History",
    icon: <HistoryIcon />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Setings",
  },
  {
    segment: "notifyUser",
    title: "Notify Users",
    icon: <NotificationsActiveIcon />,
  },
  {
    segment: "myAccount",
    title: "My Account",
    icon: <AccountCircle />,
  },
];
