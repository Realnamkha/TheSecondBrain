import DocumentIcon from "../icons/DocumentIcon";
import LinkIcon from "../icons/LinkIcon";
import Logo from "../icons/Logo";
import RedditIcon from "../icons/RedditIcon";
import TagIcon from "../icons/TagIcon";
import TwitterIcon from "../icons/TwitterIcon";
import YoutubeIcon from "../icons/YoutubeIcon";
import SidebarItems from "./SidebarItems";

const Sidebar = ({ contents }: { contents: any }) => {
  return (
    <div className="h-screen min-w-56 fixed left-0 top-0 bg-white border-2">
      <div className="flex text-2xl justify-center items-center pt-4">
        <div className="pr-4 text-purple-600">
          <Logo size="mmd" />
        </div>
        <div>Brainly</div>
      </div>
      <div className="pt-4">
        <SidebarItems
          contents={contents}
          icon={<YoutubeIcon size="md" />}
          text="Youtube"
        />
        <SidebarItems
          contents={contents}
          icon={<TwitterIcon size="md" />}
          text="Twitter"
        />
        <SidebarItems
          contents={contents}
          icon={<RedditIcon size="md" />}
          text="Reddit"
        />
        <SidebarItems
          contents={contents}
          icon={<DocumentIcon size="md" />}
          text="Documents"
        />
        <SidebarItems
          contents={contents}
          icon={<TagIcon size="md" />}
          text="Tag"
        />
        <SidebarItems
          contents={contents}
          icon={<LinkIcon size="md" />}
          text="Link"
        />
      </div>
    </div>
  );
};

export default Sidebar;
