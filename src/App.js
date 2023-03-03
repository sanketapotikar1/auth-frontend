import "./App.css";
import Header from "./Components/Header.js";
import Login from "./Components/Login.js";
import Dashboard from "./Components/Dashboard.js";
import Registration from "./Components/Registration.js";
import Error from "./Components/Error.js";
import TestReset from "./Components/Test.js";
import PasswordReset from "./Components/PasswordReset";
import ForgotPassword from "./Components/ForgotPassword";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { LoginContext } from "./Components/ContextProvider/Context";


function App() {
  const [data, setData] = useState(false);

  const { logindata, setLoginData } = useContext(LoginContext);

  const history = useNavigate();

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

    if (data.status == 401 || !data) {
      console.log("user not valid");
    } else {
      console.log("user verify");
      setLoginData(data);
      history("/dashboard");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      DashboardValid();
      setData(true);
    }, 1500);
  }, []);

  return (
    <div className="App">
      {data ? (
        <>
          <Header />

          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/password-reset" element={<PasswordReset />} />
            <Route path="/Test-reset" element={<TestReset />} />
            <Route path="/forgotpassword/:id/:token" element={<ForgotPassword />}
            />
            <Route path="*" element={<Error />} />
          </Routes>
        </>
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
    </div>
  );
}

export default App;
