import type { ReactElement } from "react";

const SidebarItems = ({ icon, text }: { icon: ReactElement; text: string }) => {
  return (
    <div className="flex pr-4 py-4 pl-8 text-gray-700 cursor-pointer hover:text-black transition-all duration-150">
      <div className="pr-2">{icon}</div>
      <div className="">{text}</div>
    </div>
  );
};

export default SidebarItems;
