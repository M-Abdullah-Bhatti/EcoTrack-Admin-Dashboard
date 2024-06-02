"use client";

import React from "react";

interface CustomAlertProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded bg-white p-4 shadow-lg">
        <p>{message}</p>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            className="rounded bg-red px-4 py-2 text-white"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="rounded bg-green-500 px-4 py-2 text-white"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomAlert;
