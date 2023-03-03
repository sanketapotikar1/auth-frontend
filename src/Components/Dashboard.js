import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./ContextProvider/Context";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function Dashboard() {
  const { logindata, setLoginData } = useContext(LoginContext);

  const [data, setData] = useState(false);

  const Navigate = useNavigate();

  const DashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken");

    const res = await fetch("/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await res.json();
    console.log(data);

    if (data.status === 401 || !data) {
      Navigate("*");
    } else {
      console.log("user verify");
      setLoginData(data);
      Navigate("/dashboard");
    }
  };

  useEffect(() => {
    setTimeout(() => {
        DashboardValid();
        setData(true)
    }, 1000)

}, [])

  return (
    <>
      {data ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src="./profile.png"
            style={{ width: "200px", marginTop: 20 }}
            alt=""
          />
          <h1>User Email:{logindata ? logindata.ValidUserOne.email : ""}</h1>
        </div>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          Loading... &nbsp;
          <CircularProgress />
        </Box>
      )}
    </>
  );
}

export default Dashboard;
