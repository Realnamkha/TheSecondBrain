import type { ReactElement } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

const SidebarItems = ({
  text,
  icon,
  route,
}: {
  text: string;
  icon: ReactElement;
  route: string;
}) => {
  // Optional: check if this route is active to apply active styles
  const resolved = useResolvedPath(route);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link
      to={route}
      className={`flex pr-4 py-4 pl-8 text-gray-700 cursor-pointer transition-all duration-150 ${
        match ? "bg-gray-300 font-semibold" : "hover:bg-gray-200"
      }`}
    >
      <div className="pr-2">{icon}</div>
      <div>{text}</div>
    </Link>
  );
};

export default SidebarItems;
