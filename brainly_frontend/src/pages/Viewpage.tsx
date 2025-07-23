import { Card } from "../components/ui/Card";
import { PlusIcon } from "../components/icons/PlusIcon";
import { Button } from "../components/ui/Button";
import { CreateContentModal } from "../components/ui/CreateContentModal";
import { useEffect, useState } from "react";
import Sidebar from "../components/ui/Sidebar";
import { BACKEND_URL } from "../config";

const ViewPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    axios.get(`${BACKEND_URL}/view/${shareLink}`);
  }, []);

  useEffect(() => {}, [modalOpen]);
  return (
    <div>
      <div>
        <Sidebar />
      </div>
      <div className="p-4 ml-56">
        <CreateContentModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
        />
        <div className="flex justify-end gap-4">
          <Button
            startIcon={<PlusIcon size="sm" />}
            variant="primary"
            size="sm"
            text="Add Content"
          />
          <Button
            startIcon={<PlusIcon size="md" />}
            variant="secondary"
            size="md"
            text="Share"
          />
        </div>
        <div className="flex justify-start gap-2 flex-wrap mt-2">
          {contents.map(({ title, link, type }) => (
            <Card type={type} link={link} title={title} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default ViewPage;
