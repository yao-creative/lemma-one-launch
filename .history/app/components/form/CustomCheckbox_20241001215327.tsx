import React from 'react';
import * as Checkbox from '@radix-ui/react-checkbox';

interface CustomCheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
  disabled?: boolean;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ checked, onCheckedChange, label, disabled = false }) => {
  return (
    <div className="flex items-center">
      <Checkbox.Root
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className={`w-auto min-w-[120px] px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          checked
            ? 'bg-purple-600 text-white'
            : 'bg-white text-black hover:bg-gray-100'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <span className="flex items-center justify-center">
          {label}
          {checked && <span className="ml-2">: D</span>}
        </span>
      </Checkbox.Root>
    </div>
  );
};

export default CustomCheckbox;