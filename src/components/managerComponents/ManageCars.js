import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCarsByManagerId,
  updateCarById,
  deleteCarById,
} from "../../store/silce/CarSlice";
export default function ManageCars() {
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.car.cars);
  const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    model: "",
    color: "",
    price: "",
  });
  const [carId, setCarId] = useState(null);

  useEffect(() => {
    dispatch(fetchCarsByManagerId());
  }, [dispatch]);

  const openUpdatePopup = (car) => {
    setFormData({
      name: car.name,
      model: car.model,
      color: car.color,
      price: car.price,
    });
    setCarId(car.id);
    setIsUpdatePopupOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdatePopupOpen(false);
  };

  const updateCar = () => {
    const obj = {
      id: carId,
      form: formData,
    };
    dispatch(updateCarById(obj));
    setIsUpdatePopupOpen(false);
  };

  const confirmDeleteCar = (id) => {
    const answer = window.confirm("Are you sure you want to delete?");
    if (answer) {
      dispatch(deleteCarById(id));
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 text-left">
        {cars.map((car) => (
          <div key={car.id} className="bg-white rounded-lg p-4 shadow-md">
            <p className="text-xl font-semibold">{car.name}</p>
            <p className="text-gray-600">{car.model}</p>
            <p className="text-gray-600">{car.color}</p>
            <p className="text-gray-600">{car.price}</p>
            <div className="flex justify-between">
              <button
                onClick={() => openUpdatePopup(car)}
                className="text-blue-500 bg-white mt-2 rounded-md hover:text-blue-800 hover:px-4 hover:py-2 hover:bg-blue-100"
              >
                Update Car
              </button>
              <button
                onClick={() => confirmDeleteCar(car.id)}
                className="text-red-500 bg-white mt-2 rounded-md hover:text-red-800 hover:px-4 hover:py-2 hover:bg-red-100"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {isUpdatePopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-900">
          <div className="bg-white w-1/2 p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Update Car</h2>
            <form onSubmit={updateCar}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-600">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label htmlFor="model" className="block text-gray-600">
                  Model:
                </label>
                <input
                  type="number"
                  id="model"
                  name="model"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
                  required
                  value={formData.model}
                  onChange={(e) =>
                    setFormData({ ...formData, model: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label htmlFor="color" className="block text-gray-600">
                  Color:
                </label>
                <input
                  type="text"
                  id="color"
                  name="color"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
                  required
                  value={formData.color}
                  onChange={(e) =>
                    setFormData({ ...formData, color: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block text-gray-600">
                  Price:
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
                  required
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </div>
              <div className="mb-6">
                <button
                  type="submit"
                  className="text-blue-500 bg-white rounded-md hover:text-blue-600"
                >
                  Update
                </button>
                <p className="px-4"></p>
                <button
                  onClick={closeUpdateModal}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 ml-2"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
