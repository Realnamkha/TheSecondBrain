import { Button } from "./Button";
import CrossIcon from "../icons/CrossIcon";
import useOutsideClick from "../../hooks/useOutsideClick";
// import { useNavigate } from "react-router-dom";

const AlertModal = ({
  open,
  onClose,
  message,
  onConfirm,
  confirmText = "Yes",
  cancelText = "No",
}: {
  open: boolean;
  onClose: () => void;
  message: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
}) => {
  const ref = useOutsideClick(onClose, open);

  if (!open) return null;

  return (
    <div className="fixed p-4 flex justify-end inset-0 z-50">
      <div className="absolute inset-0 bg-slate-500 opacity-40"></div>
      <div
        ref={ref}
        className="relative z-10 bg-white p-4 rounded-2xl shadow-lg w-fit h-fit mt-16"
      >
        <div className="flex justify-end">
          <div onClick={onClose} className="cursor-pointer">
            <CrossIcon />
          </div>
        </div>
        <div className="p-2 rounded-2xl">
          <h3 className="text-center">{message}</h3>
          <div className="flex mt-4 justify-around">
            <Button
              onClick={onClose}
              variant="primary"
              size="sm"
              text={cancelText}
            />
            <Button
              onClick={onConfirm}
              variant="destructive"
              size="sm"
              text={confirmText}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
