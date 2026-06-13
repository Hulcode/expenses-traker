const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black/50">
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow-sm">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-200 rounded-t">
            <h3 className="text-lg font-medium text-gray-900 ">{title}</h3>

            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-100 hover:text-gray-900 rounded-lg w-8 h-8 flex items-center justify-center"
              onClick={onClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>

          {/* Modal body */}
          <div className="p-4 md:p-5">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
