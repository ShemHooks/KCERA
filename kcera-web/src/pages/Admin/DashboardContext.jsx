// src/context/DashboardContext.jsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import socket from "../../utils/API/socket";
import GetPendingUserApi from "./API/GetPendingUserApi";
import GetResidentsApi from "./API/GetResidentsApi";
import GetRespondersApi from "./API/GetRespondersApi";
import GetDriversApi from "./API/GetDriversApi";
import GetEmergencyApi from "./API/GetEmergencyApi";
import GetCurrentResponsesApi from "./API/GetCurrentResponsesApi";
import ApproveUserApi from "./API/ApproveUserApi";
import DeclineUsers from "./API/DeclineUsers";
import SystemLogsApi from "./API/SystemLogsApi";
import DeleteLogsApi from "./API/DeleteLogsApi";
import HistoryApi from "./API/HistoryApi";
import ExcelDataApi from "./API/ExcelDataApi";
import {
  getSummary,
  getByType,
  getMonthly,
  getTopUsers,
} from "./API/AnalyticApi";

import { playAlarm, stopAlarm } from "../../utils/alarmAudio";

const DashboardContext = createContext(null);

export function useDashboard() {
  return useContext(DashboardContext);
}

export function DashboardProvider({ children }) {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [approveUsers, setApproveUsers] = useState([]);
  const [responders, setResponders] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [emergencies, setEmergencies] = useState([]);
  const [ongoingResponses, setOngoingResponses] = useState([]);
  const [systemLogs, setSystemLogs] = useState([]);
  const [responseHistory, setResponseHistory] = useState([]);
  const [reportHistory, setReportHistory] = useState([]);
  const [summary, setSummary] = useState({});
  const [byType, setByType] = useState([]);
  const [monthly, setMonthly] = useState([]);
  const [topUsers, setTopUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const prevLength = useRef(0);

  // Pending Users
  const handleGetPendingUsers = async () => {
    const response = await GetPendingUserApi();
    if (response.users) setPendingUsers(response.users);
  };

  // Approved Residents
  const handleApprovedUsers = async () => {
    const UserResponse = await GetResidentsApi();
    if (UserResponse.users) setApproveUsers(UserResponse.users);
  };

  //  Responders
  const handleResponders = async () => {
    const respondersList = await GetRespondersApi();
    if (respondersList.responders) setResponders(respondersList.responders);
  };

  //  Drivers
  const handleDrivers = async () => {
    const driversList = await GetDriversApi();
    if (driversList.drivers) setDrivers(driversList.drivers);
  };

  //  Emergencies
  const handleGetEmergency = async () => {
    const emergencies = await GetEmergencyApi();
    const emergencyData = emergencies.emergencies.data;

    if (emergencyData.length > prevLength.current) playAlarm();
    if (emergencyData.length === 0) stopAlarm();

    prevLength.current = emergencyData.length;
    setEmergencies(emergencyData);
  };

  //  Ongoing Responses
  const handleGetResponses = async () => {
    const responses = await GetCurrentResponsesApi();
    setOngoingResponses(responses.data.data);
  };

  //system logs
  const handleGetSystemLogs = async (filters = {}) => {
    try {
      const response = await SystemLogsApi(filters);
      if (response.data) {
        setSystemLogs(response.data);
      }
    } catch (err) {
      setSystemLogs([]);
    }
  };

  //delete system logs
  const deleteLogs = async (id) => {
    try {
      const response = await DeleteLogsApi(id);
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  //get histories
  const handleGetHistory = async (keyword) => {
    try {
      const response = await HistoryApi(keyword);

      if (response.responses && response.reports) {
        setResponseHistory(response.responses);
        setReportHistory(response.reports);
        return;
      }
    } catch (e) {
      console.log(e);
    }
  };

  //analytics

  const fetchData = async (date, type) => {
    try {
      const [summaryRes, byTypeRes, monthlyRes, topUsersRes] =
        await Promise.all([
          getSummary(),
          getByType(date),
          getMonthly(),
          getTopUsers(),
        ]);
      setSummary(summaryRes.data.data);
      setByType(byTypeRes.data.data);
      setMonthly(monthlyRes.data.data);
      setTopUsers(topUsersRes.data.data);
    } catch (error) {
      console.error("Failed to fetch analytics data:", error);
    } finally {
      setLoading(false);
    }
  };

  //getting data to be exported as excel file
  const exportExcelFile = async (date) => {
    try {
      const responseFromApi = await ExcelDataApi(date);

      return {
        data: responseFromApi,
      };
    } catch (err) {
      console.log(err);
    }
  };

  //  Register socket listeners once

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to socket server:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });
  }, []);

  useEffect(() => {
    socket.on("PendingUser", handleGetPendingUsers);
    socket.on("updatedResidents", handleApprovedUsers);
    socket.on("userStatusUpdate", () => {
      handleResponders();
      handleDrivers();
    });
    socket.on("emergencyRequests", handleGetEmergency);
    socket.on("responded", handleGetResponses);
    socket.on("logsUpdates", () => {
      handleGetSystemLogs();
    });

    // initial load
    handleGetPendingUsers();
    handleApprovedUsers();
    handleResponders();
    handleDrivers();
    handleGetEmergency();
    handleGetResponses();
    handleGetSystemLogs();
    fetchData();

    return () => {
      socket.off("PendingUser");
      socket.off("updatedResidents");
      socket.off("userStatusUpdate");
      socket.off("emergencyRequests");
      socket.off("responded");
      socket.off("logsUpdates");
    };
  }, []);

  //  Actions
  const approvePending = (id) => ApproveUserApi(id);
  const declinePending = (id) => DeclineUsers(id);

  const value = {
    pendingUsers,
    approveUsers,
    responders,
    drivers,
    emergencies,
    ongoingResponses,
    systemLogs,
    responseHistory,
    reportHistory,
    summary,
    byType,
    monthly,
    topUsers,
    loading,
    handleGetSystemLogs,
    approvePending,
    declinePending,
    deleteLogs,
    handleGetHistory,
    exportExcelFile,
    fetchData,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}
