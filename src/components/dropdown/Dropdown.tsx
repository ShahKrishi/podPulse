import { useState } from "react";

export interface DropdownOption {
  label: string;
  value: string | number;
}

export interface DropdownProps {
  label: string;
  options: DropdownOption[];
  onChange?: (value: string | number) => void;
  value?: string | number;
}

export default function Dropdown({
  label,
  options,
  onChange,
  value,
}: DropdownProps) {
  const [open, setOpen] = useState(false);

  const selected = options.find((opt) => opt.value === value)?.label || label;

  return (
    <div className="relative w-full">
      <button
        onClick={() => setOpen(!open)}
        className="w-full bg-white border border-gray-300 px-3 py-2 rounded-md flex justify-between"
      >
        <span>{selected}</span>
        <span>▼</span>
      </button>

      {open && (
        <ul className="absolute bg-white border border-gray-300 mt-2 rounded-md shadow-lg w-full z-20">
          {options.map((item) => (
            <li
              key={item.value}
              onClick={() => {
                onChange?.(item.value);
                setOpen(false);
              }}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
