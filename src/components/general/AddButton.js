import React from 'react';
import { IoAdd } from 'react-icons/io5';

const AddButton = ({ onClick, className }) => {
  return (
    <button
      className={`bg-blue-500 hover:bg-blue-700 flex justify-center items-center rounded-full w-[55px] h-[55px] text-white drop-shadow-md ${className}`}
      onClick={onClick}
    >
      <IoAdd size={30} color='white' />
    </button>
  );
};

export default AddButton;
