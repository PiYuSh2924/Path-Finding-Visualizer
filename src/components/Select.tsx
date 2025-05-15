import React, { ChangeEvent } from "react";

interface Option {
  value: string | number;
  name: string;
}

interface SelectProps {
  value: string | number;
  onChange: (value: ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  label: string;
  isDisabled?: boolean;
}

const Select = ({
    value,
    onChange,
    options,
    label,
    isDisabled = false,
  }: SelectProps) => {
  return (
    <div className="flex flex-col items-start gap-1">
      <label className="text-xs text-gray-300 ml-1" htmlFor={label}>
        {label}
      </label>
      <select
        className="bg-gray-700 disabled:pointer-events-none rounded-md cursor-pointer hover:bg-gray-800 transition ease-in active:ring-0 active:border-0 p-2 min-w-[200px] sm:min-w-full"
        disabled={isDisabled}
        id={label}
        value={value}
        onChange={onChange}
      >
        {options.map(({ value, name }) => (
          <option key={value} value={value}>
            {name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select