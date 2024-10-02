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
        className={`w-auto min-w-[100px] px-3 py-2 rounded-full text-sm font-medium transition-colors ${
          checked
            ? 'bg-purple-600 text-white'
            : 'bg-black/20 text-white hover:bg-black/30'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <span className="flex items-center justify-center">
          {label}
          {checked && <span className="ml-2">✓</span>}
        </span>
      </Checkbox.Root>
    </div>
  );
};

export default CustomCheckbox;