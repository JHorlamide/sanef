import React from "react";
import { NavLink } from "react-router-dom";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

interface AppNavLinkProps {
  path: string;
  title: string;
  className: string;
  leftIcon?: React.ReactNode | string;
  rightIcon?: React.ReactNode | string;
}

const AppNavLink = ({
  path,
  title,
  leftIcon,
  rightIcon,
  className
}: AppNavLinkProps) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        classNames(`${className}`, isActive ? "text-yellow-500" : "")
      }
    >
      {!!leftIcon && leftIcon}
      {title}
      {!!rightIcon && rightIcon}
    </NavLink>
  );
};

export const BecomeAgent = ({ path, title, className }: AppNavLinkProps) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        classNames(
          `${className}`,
          isActive ? "text-white bg-yellow-500 border-yellow-500" : "text-black"
        )
      }
    >
      {title}
    </NavLink>
  );
};

export default AppNavLink;
