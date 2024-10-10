import React, { MouseEvent } from 'react';

interface GrowingButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  children: React.ReactNode;
  preventScroll?: boolean;
}

const GrowingButton: React.FC<GrowingButtonProps> = ({ onClick, className, children, preventScroll = true }) => {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (preventScroll) {
      event.preventDefault();
    }
    onClick(event);
  };

  return (
    <button
      onClick={handleClick}
      className={`transition-transform duration-300 transform hover:scale-110 ${className}`}
      type={preventScroll ? "button" : "submit"}
    >
      {children}
    </button>
  );
};

export default GrowingButton;