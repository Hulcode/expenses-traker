import { useRef, useState } from "react";
import { FaUser } from "react-icons/fa"; // Font Awesome
import { FaUpload } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
const ImageInput = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex flex-col items-center gap-3 mb-2.5">
      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        className="hidden"
        onChange={handleImageChange}
      />

      {previewUrl ? (
        // Show preview + remove button
        <div className="relative w-18 h-18">
          <img
            src={previewUrl}
            alt="Profile"
            className="w-18 h-18 rounded-full object-cover"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute -bottom-1 -right-1 w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center"
          >
            <FaTrashCan />
          </button>
        </div>
      ) : (
        // Show placeholder + upload button
        <div className="relative w-18 h-18">
          <div className="w-18 h-18 rounded-full bg-purple-100 flex items-center justify-center">
            <span className="text-purple-400 text-3xl">
              <FaUser />
            </span>
          </div>
          <button
            type="button"
            onClick={onChooseFile}
            className="absolute -bottom-1 -right-1 w-6 h-6 bg-purple-500 text-white rounded-full text-xs flex items-center justify-center"
          >
            <FaUpload />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageInput;
