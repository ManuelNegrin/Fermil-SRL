import { toast } from "react-toastify";

export const confirmToast = (message, onConfirm) => {
  toast.warn(
    ({ closeToast }) => <div>
      <div className="mb-2">{message}</div>
      <div className="d-flex gap-2 justify-content-end">
        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={closeToast}>Cancelar</button>
        <button type="button" className="btn btn-sm btn-danger" onClick={() => { closeToast(); onConfirm(); }}>Aceptar</button>
      </div>
    </div>,
    { autoClose: false, closeOnClick: false, closeButton: false, draggable: false, pauseOnHover: false }
  );
};
