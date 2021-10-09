import React from "react";

interface DropdownInputProps {
  title: string;
  value: string;
  setValue: (string) => void;
  width?: string;
  height?: string;
  options: string[];
}

export const DropdownInput: React.FC<DropdownInputProps> = ({
  title,
  value,
  setValue,
  width = "w-full",
  height = "h-[3rem]",
  options,
}) => {
  return (
    <div className={`flex flex-col gap-1`}>
      <label
        htmlFor={title}
        className="uppercase font-semibold text-muted1 text-sm"
      >
        {title}
      </label>

      <select
        id={title}
        className={`${width} ${height} bg-bgVariant1 text-bgVariantInverted1 rounded-md outline-none border-none p-3`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        {options?.map((option) => (
          <option value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};
