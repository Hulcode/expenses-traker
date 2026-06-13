import { LuArrowUp, LuArrowDown, LuTrash2, LuHandCoins } from "react-icons/lu";

const TransactionInfoCard = ({ title, icon, date, amount, type, onDelete }) => {
  const getAmountStyles = () => {
    if (type === "income") return "text-green-700 font-medium bg-green-100";
    if (type === "expense") return "text-red-700 font-medium bg-red-100";
    return "text-gray-600 bg-gray-100";
  };

  const getArrow = () => {
    if (type === "income") return <LuArrowUp className="w-3.5 h-3.5" />;
    if (type === "expense") return <LuArrowDown className="w-3.5 h-3.5" />;
    return null;
  };

  return (
    <div className="w-full bg-white rounded-lg border border-gray-100 p-2 mb-3">
      <div className="flex items-center justify-between">
        {/* Left — icon and details */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
            {icon ? (
              <img src={icon} alt={title} className="w-5 h-5" /> // 👈 render as image
            ) : (
              <LuHandCoins className="w-5 h-5 text-gray-500" /> // 👈 fallback
            )}
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-800">{title}</h4>
            <p className="text-xs text-gray-400">{date}</p>
          </div>
        </div>

        {/* Right — badge + optional delete */}
        <div className="flex items-center gap-2">
          <span
            className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-sm ${getAmountStyles()}`}
          >
            {type === "expense" ? "-" : "+"}${amount} {getArrow()}
          </span>

          {onDelete && (
            <button
              className="text-gray-400 hover:text-red-500 transition-colors p-1"
              aria-label="Delete transaction"
              onClick={onDelete}
            >
              <LuTrash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;
