import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, deleteUserById } from "../../store/silce/UserSlice";

export default function ReadAndDeleteUsers() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const { users } = useSelector((state) => state.user);

  const deleteUser = (id) => {
    console.log(id);
    dispatch(deleteUserById(id));
  };

  return (
    <div className="px-8">
      <div className="flex items-center justify-between py-4 border-b border-gray-300 font-semibold">
        <div className="w-1/4">Name</div>
        <div className="w-1/4">Email</div>
        <div className="w-1/4">User ID</div>
        <div className="w-1/4 text-right">Delete</div>
      </div>
      {users &&
        users.map((item) => (
          <div
            className="flex items-center justify-between py-4 border-b border-gray-300"
            key={item.id}
          >
            <div className="w-1/4">{item.name}</div>
            <div className="w-1/4">{item.email}</div>
            <div className="w-1/4">{item.id}</div>
            <div className="w-1/4 text-right">
              <button
                className="text-red-400 hover:text-red-600"
                onClick={() => {
                  deleteUser(item.id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}
