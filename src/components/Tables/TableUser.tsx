"use client";

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../lib/store';
import { setUsers, deleteUserAsync, UserInfo } from '../../lib/features/usersSlice';
import axios from 'axios';
import CustomAlert from '../Alert/Alert';
import Toast from '../Toast/Toast';

const TableUser = () => {
  const dispatch = useAppDispatch();
  const users = useSelector((state: RootState) => state.users.users);
  const [showAlert, setShowAlert] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/users/all');
        dispatch(setUsers(response.data));
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };
    fetchUsers();
  }, [dispatch]);

  const handleDelete = (userId: string) => {
    setShowAlert(true);
    setUserToDelete(userId);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      dispatch(deleteUserAsync(userToDelete)).then(() => {
        setShowToast(true);
        setUserToDelete(null);
      });
    }
    setShowAlert(false);
  };

  const cancelDelete = () => {
    setShowAlert(false);
    setUserToDelete(null);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Users
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Name</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Email</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Role</h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Virtual Coins</h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Delete</h5>
          </div>
        </div>

        {users.map((user: UserInfo, key: number) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${key === users.length - 1 ? '' : 'border-b border-stroke dark:border-strokedark'}`}
            key={user._id}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{user.name}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{user.email}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{user.role}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{user.virtualCoins}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <button
                className="text-red-600 hover:text-red-800"
                onClick={() => handleDelete(user._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAlert && (
        <CustomAlert
          message="Are you sure you want to delete this user?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}

      {showToast && (
        <Toast
          message="User deleted successfully!"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default TableUser;
