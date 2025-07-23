
const declinePending = async (id,handleGetPendingUsers) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/declinePendingUser/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to decline user");

      console.log("User declined:", id);
      handleGetPendingUsers(); 
    } catch (error) {
      console.error(error.message);
    }
  };

  export default declinePending;