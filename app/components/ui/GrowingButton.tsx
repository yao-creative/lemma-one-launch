import React, { MouseEvent } from 'react';

interface GrowingButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  children: React.ReactNode;
}

const GrowingButton: React.FC<GrowingButtonProps> = ({ onClick, className, children }) => {
  return (
    <button
      onClick={onClick}
      className={`transition-transform duration-300 transform hover:scale-110 ${className}`}
    >
      {children}
    </button>
  );
};

export default GrowingButton;