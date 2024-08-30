import React from 'react';

const CustomButton = ({ onClick, type, color, children }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${color} hover:brightness-75 hover:text-neutral-900 text-white rounded-lg font-semibold transition flex-1 hover:translate-y-1 duration-500 ease-in-out shadow-neutral-700 shadow-md text-[12px] lg:text-sm py-2.5 px-3`}
    >
      {children}
    </button>
  );
};

export default CustomButton;
