"use client";

import React from "react";

interface InputItemProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required: boolean;
}

const InputItem: React.FC<InputItemProps> = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  required,
  ...props
}) => {
  return (
    <div className="input_item mb-4">
      <label className="text-[#656d9a] font-medium mb-2 block">{label}</label>
      <input
        className="px-3 py-2 border border-gray-300 rounded-md w-full text-[14px] focus:outline-none focus:border-primary"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        {...props}
      />
    </div>
  );
};

export default InputItem;
