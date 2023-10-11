import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../../store/silce/CarSlice";
import { createReservation } from "../../store/silce/ReservationSlice";

export default function CarsList() {
  const dispatch = useDispatch();
  const [bookingDays, setBookingDays] = useState(null);

  useEffect(() => {
    console.log("useeffect");
    dispatch(fetchCars());
  }, [dispatch]);

  const { cars } = useSelector((state) => state.car);

  const handleReservation = (id) => {
    if (bookingDays === null) {
      alert("Enter days firstly");
    } else {
      if (bookingDays <= 0) {
        alert("Days must be 1 or more");
      } else {
        const obj = {
          carId: id,
          userId: localStorage.getItem("userId"),
          days: bookingDays,
        };
        console.log(obj);
        dispatch(createReservation(obj));
        dispatch(fetchCars());
      }
    }
  };

  return (
    <div className="p-4  grid grid-cols-5  gap-4" >
      {cars &&
        cars.map((item) => (
          <div key={item.id} className="bg-white rounded-lg p-4 shadow-md mb-4 ">
            <p className="text-xl font-semibold">{item.name}</p>
            <p className="text-gray-600">Model: {item.model}</p>
            <p className="text-gray-600">Color: {item.color}</p>
            <p className="text-gray-600">Price: {item.price}</p>
            <p className="text-gray-600">Booking: {item.booking}</p>
            {item.booking !== "booked" ? (
              <div className="flex justify-between mt-2">
                <input
                  type="number"
                  placeholder="Days of booking"
                  className="w-40 px-2 py-1 border rounded-md focus:outline-none focus:border-blue-400"
                  onChange={(e) => setBookingDays(e.target.value)}
                />
                <button
                  className={`ml-2 text-green-400 ${
                    item.booking === "booked"
                      ? "text-gray-400 cursor-not-allowed"
                      : "hover:text-green-600"
                  }`}
                  disabled={item.booking === "booked"}
                  onClick={() => handleReservation(item.id)}
                >
                  Reserve Car
                </button>
              </div>
            ) : null}
          </div>
        ))}
    </div>
  );
}
