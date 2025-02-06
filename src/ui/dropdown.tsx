import React, { ChangeEvent } from "react";

type DropdownProps = {
  name: string;
  data: [string, string][];
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  value: string | null;
};

const Dropdown: React.FC<DropdownProps> = ({
  name,
  data,
  handleChange,
  value,
}) => {
  return (
    <div className="relative xl:grow-0 grow max-w-[200px]  sm:max-w-[350px]">
      <select
        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
          handleChange(e);
        }}
        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 text-sm"
        name={name}
        value={value ?? ""}
      >
        <option value="" disabled selected>
          Select an option
        </option>
        {data.map(([label, value]) => {
          return (
            <option key={label + value} value={value} className="text-gray-700">
              {label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Dropdown;
