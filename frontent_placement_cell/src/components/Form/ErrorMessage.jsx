

const ErrorAlert = ({ message, cancle }) => {
  if (!message) return null;

  // If message is an object, pick something readable
  const errorText =
    typeof message === "string"
      ? message
      : message?.message || message?.error || JSON.stringify(message);

  return (
    <div className="my-3 text-red-700 flex gap-1 bg-red-100 border border-red-300 px-4 py-2 rounded">
      <div className="flex-1">
        {errorText}
      </div>
      <div>
        <svg
          onClick={cancle}
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#1f1f1f"
          className="cursor-pointer hover:scale-110 transition"
        >
          <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
        </svg>
      </div>
    </div>
  );
};

export default ErrorAlert;
