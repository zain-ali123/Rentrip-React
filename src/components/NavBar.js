import React from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { logoutUser } from "../../store/slice/UserSlice"; // Import your Redux action here

export const NavBar = () => {
  //   const dispatch = useDispatch();
  const navigate = useNavigate();

  const isUserLoggedIn = localStorage.getItem("isAuthenticated");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("isAuthenticated");
    // dispatch(logoutUser()); // Dispatch your Redux action to handle logout
    navigate("/");
  };

  return (
    <header className="flex flex-wrap z-50 w-full text-sm py-5 ">
      <nav
        className="w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between"
        aria-label="Global"
      >
        <div className="flex hover:text-green-400 sm:justify-start justify-center">
          <p className="flex-none text-2xl font-bold">Rentrip</p>
          <span className="material-symbols-rounded"> local_taxi </span>
        </div>

        <div
          className={`flex flex-row items-center gap-3 text-xs md:text-md lg:text-lg sm:gap-5 mt-5 justify-center ${
            isUserLoggedIn ? "sm:justify-end" : ""
          } sm:mt-0 sm:pl-5 text-white`}
        >
          {isUserLoggedIn && role === "manager" && (
            <>
              <Link
                className="sm:font-medium text-gray-800 hover:text-gray-400 "
                to="/allReservations"
              >
                Reservations
              </Link>
              <Link
                className="sm:font-medium text-gray-800 hover:text-gray-400 "
                to="/createUser"
              >
                Register User
              </Link>
              <Link
                className="sm:font-medium text-gray-800 hover:text-gray-400 "
                to="/manageUsers"
              >
                Users
              </Link>
              <Link
                className="sm:font-medium text-gray-800 hover:text-gray-400 "
                to="/createCar"
              >
                Register Cars
              </Link>
              <Link
                className="sm:font-medium text-gray-800 hover:text-gray-400 "
                to="/manageCars"
              >
                Cars
              </Link>
            </>
          )}
          {isUserLoggedIn && role === "user" && (
            <>
              <Link
                className="sm:font-medium text-gray-800 hover:text-gray-400 "
                to="/reservations"
              >
                Reservations
              </Link>
              <Link
                className="sm:font-medium text-gray-800 hover:text-gray-400 "
                to="/cars"
              >
                Cars
              </Link>
            </>
          )}
          {isUserLoggedIn && (role === "manager" || role === "user") && (
            <button
              onClick={logout}
              className="block px-4 py-2 hover:scale-110 text-black sm:font-bold"
            >
              Sign Out
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};
