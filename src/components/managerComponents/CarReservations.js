import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserByReservationId,
  getAllReservations,
} from "../../store/silce/ReservationSlice";

export default function CarReservations() {
  const dispatch = useDispatch();

  const [showUser, setShowUser] = useState({});

  const { reservation } = useSelector((state) => state.reservation);
  const { user } = useSelector((state) => state.reservation);

  useEffect(() => {
    dispatch(getAllReservations());
  }, [dispatch]);

  const showUserDetails = (reservationId) => {
    dispatch(fetchUserByReservationId(reservationId));
    setShowUser({ ...showUser, [reservationId]: true });
  };

  const hideUserDetails = (reservationId) => {
    setShowUser({ ...showUser, [reservationId]: false });
  };

  return (
    <div>
      <div className="w-full py-6 hidden sm:grid sm:grid-cols-4 border-2 font-extrabold bg-white">
        <div className="col-span-1">NAME</div>
        <div className="col-span-1">COLOR</div>
        <div className="col-span-1">MODEL</div>
        <div className="col-span-1">DAYS</div>
      </div>
      {reservation &&
        reservation.map((item) => (
          <div key={item._id} className="border pt-3">
            <div className="grid grid-cols-4">
              <p className="col-span-1 font-bold">{item.carId.name}</p>
              <p className="col-span-1">{item.carId.color}</p>
              <p className="col-span-1">{item.carId.model}</p>
              <p className="col-span-1">{item.days}</p>
            </div>
            <div>
              <div></div>
              <button
                className=""
                onClick={() => showUserDetails(item._id)}
                style={{ display: !showUser[item._id] ? "inline" : "none" }}
              >
                <div className="">User Details</div>
                <span className="material-symbols-rounded">
                  keyboard_arrow_down
                </span>
              </button>
              <button
                onClick={() => hideUserDetails(item._id)}
                style={{ display: showUser[item._id] ? "inline" : "none" }}
              >
                <span className="material-symbols-rounded">
                  keyboard_arrow_up
                </span>
              </button>
              <div style={{ display: showUser[item._id] ? "block" : "none" }}>
                <div className="grid justify-center">
                  <p>NAME: {user?.name}</p>
                  <p>EMAIL: {user?.email}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
