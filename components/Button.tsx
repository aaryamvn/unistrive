export const Button = ({
  height = "",
  width = "",
  bg,
  onClick = () => {},
  children,
}) => {
  return (
    <button
      className={`${height} ${width} ${bg} font-semibold text-md rounded-[0.5rem] flex items-center justify-between px-[1rem] py-[0.8rem]`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
