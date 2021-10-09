import React from "react";

export const TextBox = ({
  title,
  placeholder,
  value,
  setValue,
  type = "text",
  width = "w-full",
  height = "h-[3rem]",
  min = null,
  max = null,
}) => {
  return (
    <div className={`flex flex-col gap-1`}>
      <h3 className="uppercase font-semibold text-muted1 text-sm">{title}</h3>
      <input
        type={type}
        className={`${width} ${height} bg-bgVariant1 text-bgVariantInverted1 rounded-md outline-none border-none p-5`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        min={min}
        max={max}
      />
    </div>
  );
};
