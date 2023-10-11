import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getReservationsByUserID,
  cancelReservation,
} from "../../store/silce/ReservationSlice";

export const Reservations = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReservationsByUserID());
  }, [dispatch]);

  const cancelReservationById = (id) => {
    if (window.confirm("Are you sure you want to cancel this reservation?")) {
      const obj = {
        carId: id,
        userId: localStorage.getItem("userId"),
      };
      dispatch(cancelReservation(obj));
      dispatch(getReservationsByUserID());
    }
  };

  const { reservation } = useSelector((state) => state.reservation);

  return (
    <div className=" ">
      <div className=" grid grid-cols-6 items-center justify-between py-4  border-gray-300 font-semibold">
        <div className=" font-sans font-bold col-span-1 ">Name</div>
        <div className=" font-sans font-bold col-span-1 ">Color</div>
        <div className=" font-sans font-bold col-span-1 ">Model</div>
        <div className=" font-sans font-bold col-span-1 ">Price</div>
        <div className=" font-sans font-bold col-span-1 ">Days</div>
        <div className=" font-sans font-bold col-span-1  text-center ">Cancel</div>
      </div>
      {reservation &&
        reservation.map((item) => (
          <div
            key={item._id}
            className="bg-white border border-b mb-4 grid grid-cols-6 h-32"
          >
            <p className="text-xl font-semibold">{item.carId.name}</p>
            <p className="text-gray-600">Color: {item.carId.color}</p>
            <p className="text-gray-600">Model: {item.carId.model}</p>
            <p className="text-gray-600">Price: {item.carId.price}</p>
            <p className="text-gray-600">Days: {item.days}</p>
            <button
              className="text-red-400 hover:text-red-600"
              onClick={() => cancelReservationById(item.carId._id)}
            >
              Cancel Reservation
            </button>
          </div>
        ))}
    </div>
  ); 
};
