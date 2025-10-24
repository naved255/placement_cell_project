

export default function ReviewCard({
  title,
  subtitle,
  details = [],
  status,
  onApprove,
  onReject,
  type = "job"
}) {
  const statusColor =
    status.toLowerCase() === "approved"
      ? "bg-green-100 text-green-700"
      : status.toLowerCase() === "rejected"
      ? "bg-red-100 text-red-700"
      : "bg-yellow-100 text-yellow-700";

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow duration-200">
      
      <div className="flex justify-between items-start mb-3">
        <div>
          <h2 className="text-xl font-semibold text-green-700">{title}</h2>
          {subtitle && (
            <p className="text-gray-600 text-sm font-medium">{subtitle}</p>
          )}
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}>
          {status || "Pending"}
        </span>
      </div>

      
      <div className="space-y-1 mb-4">
        {details.map((item, index) => (
          <p key={index} className="text-gray-700 text-sm">
            <span className="font-medium">{item.label}:</span> {item.value}
          </p>
        ))}
      </div>

      
      {status.toLowerCase() === "pending" && (
        <div className="flex justify-end gap-2">
          <button
            onClick={onApprove}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-md"
          >
            Approve
          </button>
          <button
            onClick={onReject}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
}
