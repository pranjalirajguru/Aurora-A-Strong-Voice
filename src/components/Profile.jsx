import React, { useEffect, useState } from "react";
import API from "../services/api";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/auth/me");
        setUser(res.data);
      } catch (error) {
        console.error("❌ Unauthorized or invalid token");
      }
    };
    fetchUser();
  }, []);

  if (!user) return <p>Loading user...</p>;

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Welcome, {user.username}!</h2>
      <p>Email: {user.email}</p>
      <p>ID: {user.id}</p>
    </div>
  );
};

export default Profile;
