import React from 'react';

interface ButtonProps {
  children: any
  onClick: () => void
}

const ButtonReverse = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="group relative flex justify-center py-2 px-8 border border-transparent text-[--pastelindigo] text-md font-medium rounded-md bg-[--alabaster] hover:bg-[--pastelgrey]">
      {children}
    </button>
  );
};

export default ButtonReverse;