
export default function SubmitButton({ children, disabled }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="w-full bg-green-600 text-white py-2.5 rounded-lg font-semibold hover:bg-green-700 transition-all disabled:opacity-50"
    >
      {children}
    </button>
  );
}
