import { FC, ReactNode } from "react";

const SidebarEmpty: FC<{
  children?: ReactNode;
  className: string;
}> = ({ children, className }) => {
  return (
    <>
      <div className={`${className}`}>{children}</div>
    </>
  );
};

export default SidebarEmpty;
