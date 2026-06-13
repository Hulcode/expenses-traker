const CustomToolTip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded border p-2 shadow-md">
        <h5 className="text-purple-600 text-xs font-semibold mb-1">
          {payload[0].name}
        </h5>
        <p className="text-sm text-gray-900 font-medium">
          <span className="text-sm text-gray-600">Amount: </span>{" "}
          {payload[0].value}
        </p>
      </div>
    );
  }
};

export default CustomToolTip;
