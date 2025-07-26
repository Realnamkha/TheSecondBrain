import type { ReactElement } from "react";
import { useState } from "react";

const SidebarItems = ({
  contents,
  icon,
  text,
}: {
  contents: any;
  icon: ReactElement;
  text: string;
}) => {
  const [filteredContents, setFilteredContents] = useState([]);

  function filterContent() {
    const result = contents.filter(
      (content) => content.type === text.toLowerCase()
    );
    setFilteredContents(result);
  }

  return (
    <div className="flex pr-4 py-4 pl-8 text-gray-700 cursor-pointer hover:bg-gray-200  transition-all duration-150">
      <div className="pr-2">{icon}</div>
      <div
        className=""
        onClick={() => {
          filterContent();
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default SidebarItems;
