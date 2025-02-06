import { TodoCardType } from "../types";

const TodoCard = ({
  id,
  title,
  due_date: dueDate,
  status,
  priority,
}: TodoCardType) => {
  // Status color mapping
  const statusColors = {
    completed: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    in_progress: "bg-blue-100 text-blue-800",
  };

  const statusDisplayText = {
    completed: "Completed",
    pending: "Pending",
    in_progress: "In Progress",
  };

  const priorityColors = {
    HIGH: "bg-red-100 text-red-800",
    MEDIUM: "bg-orange-100 text-orange-800",
    LOW: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="w-full my-2 px-2">
      {/* Desktop View */}
      <div className="hidden md:flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="w-16 text-center">
          <span className="text-sm font-medium text-gray-600">{id}</span>
        </div>
        <div className="flex-1">
          <h3 className="text-base font-medium text-gray-800 line-clamp-1">
            {title}
          </h3>
        </div>
        <div className="w-36">
          <span className="text-sm text-gray-600">{dueDate}</span>
        </div>
        <div className="w-32">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[status]}`}
          >
            {statusDisplayText[status]}
          </span>
        </div>
        <div className="w-32">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[priority]}`}
          >
            {priority}
          </span>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden bg-white rounded-lg border border-gray-200 shadow-sm p-4 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600">{id}</span>
          <span className="text-sm text-gray-600">{dueDate}</span>
        </div>
        <h3 className="text-base font-medium line-clamp-2 text-gray-800">
          {title}
        </h3>
        <div className="flex flex-wrap gap-2">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[status]}`}
          >
            {statusDisplayText[status]}
          </span>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[priority]}`}
          >
            {priority}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
