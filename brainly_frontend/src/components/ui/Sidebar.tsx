import DocumentIcon from "../icons/DocumentIcon";
import LinkIcon from "../icons/LinkIcon";
import Logo from "../icons/Logo";
import RedditIcon from "../icons/RedditIcon";
import TagIcon from "../icons/TagIcon";
import TwitterIcon from "../icons/TwitterIcon";
import YoutubeIcon from "../icons/YoutubeIcon";
import SidebarItems from "./SidebarItems";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-screen min-w-56 fixed left-0 top-0 bg-white border-2">
      <div className="flex text-2xl justify-center items-center pt-4">
        <Link to="/" className="flex items-center">
          <div className="pr-4 text-purple-600">
            <Logo size="mmd" />
          </div>
          <div>Brainly</div>
        </Link>
      </div>
      <div className="pt-4">
        <SidebarItems
          icon={<YoutubeIcon size="md" />}
          text="Youtube"
          route="/youtube"
        />
        <SidebarItems
          icon={<TwitterIcon size="md" />}
          text="Twitter"
          route="/twitter"
        />
        <SidebarItems
          icon={<RedditIcon size="md" />}
          text="Reddit"
          route="/reddit"
        />
        <SidebarItems
          icon={<DocumentIcon size="md" />}
          text="Documents"
          route="/documents"
        />
        <SidebarItems icon={<TagIcon size="md" />} text="Tag" route="/tag" />
        <SidebarItems icon={<LinkIcon size="md" />} text="Link" route="/link" />
      </div>
    </div>
  );
};
export default Sidebar;
