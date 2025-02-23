interface ToastProps {
  type: "success" | "danger" | "loading" | "alert";
  message: string;
  toastIndex: number;
  onClose: () => void;
}

const ToastItem: React.FC<ToastProps> = ({ type, message, onClose }) => {
  return (
    <div className="flex bg-white shadow-md relative overflow-hidden rounded-md animate__animated animate__fadeInRight">
      <div
        className={`${
          type === "success"
            ? "bg-green-500"
            : type === "danger"
            ? "bg-red-500"
            : type === "alert"
            ? "bg-yellow-500"
            : "bg-blue-500"
        } absolute left-0 top-0 w-[5px] h-full`}
      ></div>
      <div
        className={`${
          type === "success"
            ? "bg-green-100 border-green-500 text-green-500"
            : type === "danger"
            ? "bg-red-100 border-red-500 text-red-500"
            : type === "alert"
            ? "bg-yellow-100 border-yellow-500 text-yellow-500"
            : "bg-blue-100 border-blue-500 text-blue-500"
        } px-6 py-4 flex items-center justify-between w-full`}
      >
        {type === "success" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 inline-block mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
        {type === "alert" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 inline-block mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01M10.29 3.86a2 2 0 0 1 3.42 0l7.38 12.78A2 2 0 0 1 19.38 20H4.62a2 2 0 0 1-1.71-3.36L10.29 3.86z"
            />
          </svg>
        )}

        {type === "danger" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 inline-block mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <circle
              cx="12"
              cy="12"
              r="9"
              strokeWidth={1}
              stroke="currentColor"
              fill="none"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 9l6 6m0-6l-6 6"
            />
          </svg>
        )}
        {type === "loading" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 inline-block mr-4 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v.01M12 8v.01M12 12v.01M12 16v.01M12 20v.01"
            />
          </svg>
        )}
        <div>{message}</div>
        <button onClick={onClose} className="ml-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ToastItem;
