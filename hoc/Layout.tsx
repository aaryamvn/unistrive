import { Navbar } from "../components/Navbar";

export const Layout = ({
  children,
  includeNav = true,
  containerClassName = "",
}) => {
  return (
    <div>
      {includeNav && <Navbar />}
      <div
        className={`${
          includeNav && "h-[calc(100vh-5.4rem)]"
        } ${containerClassName}`}
      >
        {children}
      </div>
    </div>
  );
};
