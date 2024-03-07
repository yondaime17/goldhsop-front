import React, { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import texts from "../../utils/Texts";
import { MdDelete } from "react-icons/md";
import { useDropzone } from "react-dropzone";

import "./UploadImage.scss";

const UploadImage = ({ onDrop, errors, files, setFiles }) => {
  const { language } = useLanguage();
  const text = texts[language] || texts.en;
  const [thumbnailIndex, setThumbnailIndex] = useState(null); // Changed initial state to null

  useEffect(() => {
    // Set the first image as the initial thumbnail when files change
    if (files.length > 0 && thumbnailIndex === null) {
      setThumbnailIndex(0);
    }
  }, [files, thumbnailIndex]);

  const handleDelete = (index) => {
    const updatedFiles = files.filter((file, i) => i !== index);
    setFiles(updatedFiles);

    // If the deleted image was the thumbnail, update the thumbnail index
    if (index === thumbnailIndex) {
      setThumbnailIndex(null); // Reset thumbnail index
    }
  };

  const handleChooseThumbnail = (index) => {
    setThumbnailIndex(index);
    const updatedFiles = [...files];
    const selectedFile = updatedFiles.splice(index, 1)[0];
    updatedFiles.unshift(selectedFile);
    setFiles(updatedFiles);
    setThumbnailIndex(0);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop,
  });

  return (
    <div className="upload_images">
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} name="images" />
        <label>{text.dragNdrop}</label>
        {errors.images && <p style={{ color: "red" }}>{errors.images}</p>}
      </div>
      {files && files.length > 0 ? (
        <div className="preview">
          {files.map((file, index) => (
            <div key={index} className="preview_item">
              <div className="preview_actions">
                <div className="set_thumbnail">
                  <input
                    type="checkbox"
                    checked={index === thumbnailIndex}
                    onChange={() => handleChooseThumbnail(index)}
                  />
                  <label>Thumbnail</label>
                </div>

                <MdDelete
                  className="delete_icon"
                  size="20px"
                  color="#ffa500"
                  onClick={() => handleDelete(index)}
                />
              </div>
              <img className="preview_img" src={file.preview} alt={file.name} />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default UploadImage;
