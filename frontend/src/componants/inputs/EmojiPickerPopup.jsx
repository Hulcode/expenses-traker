import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { HiPhotograph } from "react-icons/hi";
import { HiXCircle } from "react-icons/hi";
const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(icon);
  return (
    <div className="flex flex-col mb-2">
      <button
        className="w-14 h-14 flex items-center justify-center text-2xl bg-purple-50 rounded-full border border-purple-100 hover:bg-purple-100 transition-colors mb-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        {icon ? (
          <img src={imageUrl} alt="icon" className="w-8 h-8" />
        ) : (
          <HiPhotograph className="text-purple-500 text-2xl" />
        )}
      </button>

      <p className="text-xs text-gray-500 mb-2">Pick Icon</p>

      {isOpen && (
        <div className="absolute z-50 mt-2">
          <button
            className="text-2xl cursor-pointer -mb-1"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <HiXCircle />
          </button>

          <EmojiPicker
            open={isOpen}
            onEmojiClick={(emojiData) => {
              setImageUrl(emojiData.imageUrl);
              onSelect(emojiData.imageUrl || "");
              setIsOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;
