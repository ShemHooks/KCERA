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
import ListAltIcon from "@mui/icons-material/ListAlt";
import HistoryIcon from "@mui/icons-material/History";
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
    kind: "divider",
  },
  {
    kind: "header",
    title: "Analytics",
  },
  {
    segment: "reports",
    title: "Patient Care Reports",
    icon: <ListAltIcon />,
  },
  {
    segment: "history",
    title: "History",
    icon: <HistoryIcon />,
  },
  {
    segment: "analytics",
    title: "Analytics",
    icon: <BarChartIcon />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Setings",
  },
  {
    segment: "myAccount",
    title: "My Account",
    icon: <AccountCircle />,
  },
];
