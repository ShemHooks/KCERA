import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import NotificationApi from "../../api/residents/NotificationApi";

const NotificationScreen = () => {
  const [notifications, setNotification] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const notificationData = await NotificationApi();
      setNotification(notificationData.data); // ✅ Make sure this is an array
    };
    fetchNotifications();
  }, []);

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.card,
        item.is_read ? styles.readCard : styles.unreadCard, // ✅ Different background
      ]}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.message}>{item.message}</Text>
      <Text style={styles.time}>
        {new Date(item.created_at).toLocaleString()}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.HeaderView}>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
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
    backgroundColor: "#f1f5f9", // light gray for unread
  },
  readCard: {
    backgroundColor: "#ffffff", // white for read
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
});

export default NotificationScreen;
