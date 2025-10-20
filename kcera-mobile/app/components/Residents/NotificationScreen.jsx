import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import NotificationApi from "../../api/residents/NotificationApi";
import socket from "../../api/utility/socket";
import ResponseTracking from "./ResponseTracking";
import { Ionicons } from "@expo/vector-icons";

const NotificationScreen = () => {
  const [notifications, setNotification] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);

  useEffect(() => {
    const listener = () => fetchNotifications();
    socket.on("userNotify", listener);

    fetchNotifications();

    return () => {
      socket.off("userNotify", listener);
    };
  }, []);

  const fetchNotifications = async () => {
    const notificationData = await NotificationApi();
    setNotification(notificationData.data);
  };

  const notificationPress = (responseId) => {
    setSelectedNotification(responseId);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => notificationPress(item.response_id)}>
      <View
        style={[
          styles.card,
          item.is_read ? styles.readCard : styles.unreadCard,
        ]}
      >
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.message}>{item.message}</Text>
        <Text style={styles.time}>
          {new Date(item.created_at).toLocaleString()}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {selectedNotification ? (
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => setSelectedNotification(null)}
            style={styles.arrowBack}
          >
            <Ionicons name="arrow-back-outline" size={24} color="#333" />
          </TouchableOpacity>

          <ResponseTracking response_id={selectedNotification} />
        </View>
      ) : (
        <>
          <View style={styles.HeaderView}>
            <Text style={styles.headerTitle}>Notifications</Text>
          </View>
          <FlatList
            data={notifications}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    padding: 10,
  },
  HeaderView: {
    backgroundColor: "#fff",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  card: {
    padding: 15,
    marginVertical: 6,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  unreadCard: {
    backgroundColor: "#f1f5f9",
  },
  readCard: {
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
  },
  message: {
    fontSize: 14,
    color: "#444",
    marginTop: 4,
  },
  time: {
    fontSize: 12,
    color: "#888",
    marginTop: 6,
  },
  arrowBack: {
    position: "absolute",
    top: 40,
    left: 15,
    zIndex: 10,
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 8,
    borderRadius: 50,
    elevation: 4,
  },
});

export default NotificationScreen;
