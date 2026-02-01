import { createPortal } from "react-dom";

const Modal = ({ open, children, customClasses = "", onClose }) => {
  if (!open) return null; // modal completely hidden when closed

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div
        className={`bg-[#e4ddd4] p-4 rounded-md shadow-lg animate-fade-slide-up ${customClasses}`}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl font-bold"
        >
          ×
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;