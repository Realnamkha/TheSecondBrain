import DocumentIcon from "../icons/DocumentIcon";
import LinkIcon from "../icons/LinkIcon";
import Logo from "../icons/Logo";
import TagIcon from "../icons/TagIcon";
import TwitterIcon from "../icons/TwitterIcon";
import YoutubeIcon from "../icons/YoutubeIcon";
import SidebarItems from "./SidebarItems";

const Sidebar = () => {
  return (
    <div className="h-screen min-w-56 fixed left-0 top-0 bg-white border-2">
      <div className="flex text-2xl justify-center items-center pt-4">
        <div className="pr-4 text-purple-600">
          <Logo size="mmd" />
        </div>
        <div>Brainly</div>
      </div>
      <div className="pt-4">
        <SidebarItems icon={<YoutubeIcon size="md" />} text="Youtube" />
        <SidebarItems icon={<TwitterIcon size="md" />} text="Twitter" />
        <SidebarItems icon={<DocumentIcon size="md" />} text="Documents" />
        <SidebarItems icon={<TagIcon size="md" />} text="Tag" />
        <SidebarItems icon={<LinkIcon size="md" />} text="Link" />
      </div>
    </div>
  );
};

export default Sidebar;
