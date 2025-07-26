import { Card } from "../components/ui/Card";
import { PlusIcon } from "../components/icons/PlusIcon";
import { Button } from "../components/ui/Button";
import { CreateContentModal } from "../components/ui/CreateContentModal";
import { useEffect, useState } from "react";
import Sidebar from "../components/ui/Sidebar";
import { useContent } from "../hooks/useContent";
import { BACKEND_URL, URL } from "../config";
import axios from "axios";
import AlertModal from "../components/ui/AlertModal";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ filterType }: { filterType?: string }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const { contents, refresh } = useContent();
  const [filteredContents, setFilteredContents] = useState([]);
  const isLoggedIn = Boolean(localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/signin");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    refresh();
  }, [modalOpen]);
  useEffect(() => {
    if (filterType) {
      setFilteredContents(contents.filter((c) => c.type === filterType));
    } else {
      setFilteredContents(contents);
    }
  }, [contents, filterType]);

  return (
    <div>
      <div>
        <Sidebar /> ✅
      </div>
      <div className="p-4 ml-56">
        <CreateContentModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
        />
        <div className="flex justify-end gap-4 mr-3 mt-[-10px]">
          <Button
            onClick={() => {
              console.log("Opening modal");
              setModalOpen(true);
            }}
            startIcon={<PlusIcon size="sm" />}
            variant="primary"
            size="sm"
            text="Add Content"
          />
          <Button
            onClick={async () => {
              const response = await axios.post(
                `${BACKEND_URL}/api/v1/sharelink`,
                {
                  share: true,
                },
                {
                  headers: {
                    Authorization: localStorage.getItem("token"),
                  },
                }
              );
              const shareUrl = `${URL}/view/${response.data?.hash}`;
              alert("Link copied " + shareUrl);
              copyToClipboard(shareUrl);
            }}
            startIcon={<PlusIcon size="md" />}
            variant="secondary"
            size="md"
            text="Share"
          />
          <Button
            onClick={() => setAlertOpen(true)}
            variant="destructive"
            size="sm"
            text="Logout"
          />
        </div>
        <div>
          {isLoggedIn && (
            <AlertModal
              open={alertOpen}
              onClose={() => setAlertOpen(false)}
              message="Are you really sure you want to logout?"
              onConfirm={() => {
                axios.post(
                  `${BACKEND_URL}/api/v1/logout`,
                  {},
                  {
                    headers: {
                      Authorization: localStorage.getItem("token"),
                    },
                  }
                );
                localStorage.removeItem("token");
                navigate("/signin");
              }}
            />
          )}
        </div>
        <div className="flex justify-start gap-2 flex-wrap mt-2">
          {filteredContents.map(({ _id, title, link, type, tags }) => (
            <Card
              key={_id}
              _id={_id}
              type={type}
              link={link}
              title={title}
              tags={tags}
              refresh={refresh}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
function copyToClipboard(text: string) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log("Text copied to clipboard!");
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
    });
}
