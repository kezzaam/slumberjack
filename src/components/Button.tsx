import React from 'react'

interface ButtonProps {
  children: any;
  onClick: () => void;
}

const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-[--alabaster] text-md font-medium rounded-md bg-[--pastelindigo] hover:bg-[--englishlavender]">
      {children}
    </button>
  )
}

export default Button
