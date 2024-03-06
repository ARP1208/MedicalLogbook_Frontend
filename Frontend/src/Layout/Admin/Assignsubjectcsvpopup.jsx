import React, { useState, useEffect } from 'react';

export default function Assignsubjectcsvpopup({ onClose, children }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 200); // Set timeout for 5 seconds

    return () => clearTimeout(timer); // Clear timeout on unmount
  }, []);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <div
      onClick={handleClose}
      className={`
        fixed inset-0 flex justify-center items-center transition-colors
        ${open ? "visible bg-black/50" : "invisible"}
      `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-white rounded-xl shadow p-6 transition-all
          ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
      >
        <button
          onClick={handleClose}
          className="absolute top-2 right-6 w-4 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
        >
          <i class="fa-solid fa-xmark fa-xl"></i>
        </button>
        {children}
      </div>
    </div>
  );
}