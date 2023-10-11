import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/silce/UserSlice";

export default function Register({ name }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const createUser = () => {
    dispatch(registerUser(formData));
    console.log(formData);
  };

  return (
    <div className="h-screen flex py-12 justify-center">
      <form
        className="bg-mygrey w-1/4 h-96 border-2 rounded-lg bg-white"
        onSubmit={(e) => {
          e.preventDefault();
          createUser();
        }}
      >
        <h2 className="text-2xl mb-4">User Registration</h2>
        <div className="mb-4 text-left">
          <label htmlFor="name" className="block font-semibold">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-4 py-2 rounded-md focus:outline-none"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        {name ? (
          <div className="mb-4">
            <label htmlFor="role" className="block text-gray-600">
              Role:
            </label>
            <select
              id="role"
              name="role"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
              required
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
            >
              <option value="user">user</option>
              <option value="manager">manager</option>
            </select>
          </div>
        ) : null}
        <div className="mb-4">
          <label htmlFor="email" className="block font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-2 rounded-md focus:outline-none"
            placeholder="example@example.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block font-semibold">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-4 py-2 rounded-md focus:outline-none"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>
        {name ? 
          <button type="submit">submit</button>
         : 
          <div>
            <div>
              <button
                type="submit"
                className="text-mygreen font-semibold py-2 px-4 rounded-md hover: focus:outline-none"
              >
                Register
              </button>
            </div>

            <Link
              to={"/"}
              className="text-mygreen font-semibold py-2 px-4 rounded-md hover: focus:outline-none"
            >
              Login
            </Link>
          </div>
        }
      </form>
    </div>
  );
}
