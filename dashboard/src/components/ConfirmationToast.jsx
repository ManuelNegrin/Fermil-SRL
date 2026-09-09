import { toast } from "react-toastify";

export const confirmToast = (message, onConfirm) => {
  let toastId;
  let accepted = false;
  const accept = () => {
    if (accepted) return;
    accepted = true;
    toast.dismiss(toastId);
    onConfirm();
  };

  toastId = toast.warn(
    <div>
      <div className="mb-2">{message}</div>
      <div className="d-flex gap-2 justify-content-end">
        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => toast.dismiss(toastId)}>Cancelar</button>
        <button type="button" className="btn btn-sm btn-danger" onClick={accept}>Aceptar</button>
      </div>
    </div>,
    { autoClose: false, closeOnClick: false, closeButton: false, draggable: false }
  );
};
