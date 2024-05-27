"use client";


import React, { useState } from 'react';
import { useAppDispatch } from '../../lib/store';
import { registerCompanyAsync } from '../../lib/features/companySlice';

const CompanyRegistrationForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(registerCompanyAsync(formData));
      // Reset the form after successful submission
      setFormData({ name: '', email: '', password: '' });
    } catch (error) {
      console.error('Failed to register company: ', error);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">Register Company</h3>
      </div>
      <form onSubmit={handleSubmit} className="p-6.5">
        <div className="mb-4">
          <label className="block text-sm font-medium text-black dark:text-white">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            placeholder="Enter your company name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-black dark:text-white">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            placeholder="Enter your company email"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-black dark:text-white">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            placeholder="Enter password"
            required
          />
        </div>
        <button
          type="submit"
          className="flex justify-center w-full rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
        >
          Register Company
        </button>
      </form>
    </div>
  );
};

export default CompanyRegistrationForm;
