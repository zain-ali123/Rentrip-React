import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { createCar } from '../../store/silce/CarSlice';



export default function CreateCar() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    model: "",
    color: "",
    price: "",
    ownerId: localStorage.getItem("userId"),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
     dispatch(createCar(formData));
    alert("Car created successfully");
    setFormData({
      name: "",
      model: "",
      color: "",
      price: "",
      ownerId: localStorage.getItem("userId"),
    });
  };


return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-5">
      <div className="container mx-auto p-4 w-full max-w-md bg-white">
        <h1 className="text-2xl font-semibold mb-4">Create Car</h1>
        <form onSubmit={handleSubmit}>
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Create Car
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
