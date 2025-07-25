import DeleteIcon from "../icons/DeleteIcon";
import { PlusIcon } from "../icons/PlusIcon";
import { useEffect, useState } from "react";
import ShareIcon from "../icons/ShareIcon";
import AlertModal from "./AlertModal";
import { Button } from "./Button";
import { BACKEND_URL } from "../../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TagIcon from "../icons/TagIcon";

interface CardProps {
  _id: string;
  title: string;
  link: string;
  type: "twitter" | "youtube";
  tags: [];
  refresh: () => void;
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
  }, [type, link]);
  return (
    <div className="max-w-72 h-fit  bg-white rounded-sm p-4 mb-2 border-2 border-gray-200">
      <div className="flex justify-between">
        <div className="flex items-center">
          <div className="text-gray-500 pr-2">
            <PlusIcon size="sm" />
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
      <div className="pt-4 mb-4">
        {type === "youtube" && (
          <iframe
            className="w-full"
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
            refresh();
            navigate("/");
          }}
        />
      </div>
    </div>
  );
}
