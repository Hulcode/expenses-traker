const UserAvatar = ({ fullName, width, height, style }) => {
  function firstTwoWordLetters(fullName) {
    if (!fullName) return ""; // safety check
    return fullName
      .trim()
      .split(" ")
      .map((word) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }

  return (
    <div
      className={`${width} ${height} ${style} rounded-full flex items-center justify-center bg-primary text-white font-semibold cursor-pointer`}
    >
      <span>{firstTwoWordLetters(fullName)}</span>
    </div>
  );
};

export default UserAvatar;
