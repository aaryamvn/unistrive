export const Button = ({
  height = "",
  width = "",
  bg,
  onClick = () => {},
  children,
  className = "",
}) => {
  return (
    <button
      className={`font-semibold text-md rounded-[0.5rem] flex items-center select-none justify-between px-[1rem] py-[0.8rem] ${className} ${height} ${width} ${bg}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
