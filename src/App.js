import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/userComponents/Register";
import ReadAndDeleteUsers from "./components/managerComponents/ReadAndDeleteUsers";
import CarsList from "./components/userComponents/CarsList";
import { Reservations } from "./components/userComponents/Reservations";
import { CreateUser } from "./components/managerComponents/CreateUser";
import CreateCar from "./components/managerComponents/CreateCar";
import CarReservations from "./components/managerComponents/CarReservations";
import ManageCars from "./components/managerComponents/ManageCars";

import { ManagerLayout } from "./layouts/ManagerLayout";
import { UserLayout } from "./layouts/UserLayout";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/manageUsers"
          element={
            localStorage.getItem("role") === "manager" ? (
              <ManagerLayout>
                <ReadAndDeleteUsers />
              </ManagerLayout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/cars"
          element={
            localStorage.getItem("role") === "user" ? (
              <UserLayout>
                <CarsList />
              </UserLayout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/reservations"
          element={
            localStorage.getItem("role") === "user" ? (
              <UserLayout>
                <Reservations />
              </UserLayout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/createUser"
          element={
            localStorage.getItem("role") === "manager" ? (
              <ManagerLayout>
                <CreateCar />
              </ManagerLayout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/createCar"
          element={
            localStorage.getItem("role") === "manager" ? (
              <ManagerLayout>
                <CreateUser />
              </ManagerLayout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/allReservations"
          element={
            localStorage.getItem("role") === "manager" ? (
              <ManagerLayout>
                <CarReservations />
              </ManagerLayout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/manageCars"
          element={
            localStorage.getItem("role") === "manager" ? (
              <ManagerLayout>
                <ManageCars />
              </ManagerLayout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
