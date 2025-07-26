import axios from "axios";
import { Card } from "../components/ui/Card";
import { CreateContentModal } from "../components/ui/CreateContentModal";
import { useEffect, useState } from "react";
import Sidebar from "../components/ui/Sidebar";
import { BACKEND_URL } from "../config";
import { useParams } from "react-router-dom";

const ViewPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { shareId } = useParams<{ shareId: string }>();
  const [contents, setContents] = useState([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/view/${shareId}`)
      .then((response) => {
        setContents(response.data?.content);
      })
      .catch((error) => {
        console.error("Failed to fetch content:", error);
      });
  }, [shareId]);

  // Log contents after state updates
  useEffect(() => {
    console.log(contents);
  }, [contents]);

  return (
    <div>
      <Sidebar />
      <div className="p-4 ml-56">
        <CreateContentModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
        <div className="flex justify-start gap-2 flex-wrap mt-2">
          {contents.map(({ _id, title, link, type, tags }) => (
            <Card
              key={_id}
              _id={_id}
              type={type}
              link={link}
              title={title}
              tags={tags}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewPage;
