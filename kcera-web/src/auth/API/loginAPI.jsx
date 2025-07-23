import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginAuth = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitData = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("invalid credentials");
      }

      const result = await response.json();
      const role = result.data.role;

      if (role !== "admin") {
        navigate("/not/admin");
        return;
      }

      localStorage.setItem("token", result.data.token);
      localStorage.setItem("name", result.data.name);
      navigate("/admin/dashboard");
    } catch (error) {
      console.log(error.mesg);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return { submitData, isSubmitting };
};

export default LoginAuth;
