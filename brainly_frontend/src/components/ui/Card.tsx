import DeleteIcon from "../icons/DeleteIcon";
import { useEffect, useState } from "react";
import ShareIcon from "../icons/ShareIcon";
import AlertModal from "./AlertModal";
import { Button } from "./Button";
import { BACKEND_URL } from "../../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TagIcon from "../icons/TagIcon";
import TwitterIcon from "../icons/TwitterIcon";
import YoutubeIcon from "../icons/YoutubeIcon";
import DocumentIcon from "../icons/DocumentIcon";
import RedditIcon from "../icons/RedditIcon";

interface CardProps {
  _id: string;
  title: string;
  link: string;
  type: string;
  tags: { name: string }[];
  refresh?: () => void;
}
declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: () => void;
      };
    };
  }
}

export function Card({ _id, title, link, type, tags, refresh }: CardProps) {
  const navigate = useNavigate();
  const [alertOpen, setAlertOpen] = useState(false);
  useEffect(() => {
    if (type === "twitter" && window?.twttr?.widgets?.load) {
      window.twttr.widgets.load();
    }
    if (type === "reddit") {
      const script = document.createElement("script");
      script.src = "https://embed.redditmedia.com/widgets/platform.js";
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [type, link]);
  return (
    <div className="max-w-72 max-h-96  bg-white rounded-2xl  p-4 mb-2 border-2 border-gray-200">
      <div className="flex justify-between">
        <div className="flex items-center">
          <div className="text-gray-500 pr-2">
            {type === "twitter" && <TwitterIcon size="sm" />}
            {type === "youtube" && <YoutubeIcon size="sm" />}
            {type === "reddit" && <RedditIcon size="sm" />}
            {type === "document" && <DocumentIcon size="sm" />}
          </div>
          <div>{title}</div>
        </div>
        <div className="flex items-center">
          <div className="text-gray-500 pr-2">
            <a href={link} target="_blank">
              <ShareIcon size="sm" />
            </a>
          </div>
          <div>
            <Button
              size="xm"
              variant="transparent"
              startIcon={<DeleteIcon size="sm" />}
              onClick={() => {
                setAlertOpen(true);
              }}
            ></Button>
          </div>
        </div>
      </div>
      <div className="pt-2 mb-4 overflow-y-auto max-h-56">
        {type === "youtube" && (
          <iframe
            className="w-full mt-2"
            src={link.replace("watch", "embed").replace("?v=", "/")}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}
        {type === "twitter" && (
          <blockquote className="twitter-tweet">
            <a href={link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}
        {type === "google-doc" && (
          <iframe
            className="w-full h-96 mt-2"
            src={link}
            title="Google Doc"
            allowFullScreen
          ></iframe>
        )}
        {type === "reddit" && (
          <blockquote className="reddit-card">
            <a href={link}></a>
          </blockquote>
        )}
        {type === "document" && (
          <div className="flex justify-center items-center mt-2">
            <iframe
              className="w-fit h-96"
              src={link}
              title="External Document or Blog"
              referrerPolicy="no-referrer"
            />
            <p className="text-sm text-center mt-2">
              If the content doesn’t load,{" "}
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                click here to open the link
              </a>
              .
            </p>
          </div>
        )}
      </div>
      <div className="flex flex-wrap justify-start items-center gap-2 text-xs">
        {tags.map(({ name }) => (
          <Button
            size="xm"
            variant="secondary"
            text={name}
            startIcon={<TagIcon size="sm" />}
          />
        ))}
      </div>
      <div>
        <AlertModal
          open={alertOpen}
          onClose={() => setAlertOpen(false)}
          message="Are you really sure you want to delete this item?"
          onConfirm={() => {
            axios.delete(`${BACKEND_URL}/api/v1/content/${_id}`, {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            });
            refresh?.();
            navigate("/");
          }}
        />
      </div>
    </div>
  );
}
