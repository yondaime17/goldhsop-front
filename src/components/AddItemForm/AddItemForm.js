import React, { useState } from "react";
import axios from "axios";
import UploadImage from "../uploadImage/UploadImage";
import "./AddItemForm.scss";
import texts from "../../utils/Texts";
import { useLanguage } from "../../context/LanguageContext";
import CategoryDropdown from "../categoryDropdown/CategoryDropdown";
import MetalChooser from "../metalChooser/MetalChooser";

function AddItemForm({ user }) {
  const { language } = useLanguage();
  const text = texts[language] || texts["en"];

  const titleRef = React.useRef("");
  const descriptionRef = React.useRef("");
  const probeRef = React.useRef("");
  const weightRef = React.useRef("");
  const priceRef = React.useRef("");
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [category, setCategory] = useState("");
  const [metal, setMetal] = useState("gold");

  const onDrop = (acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
    setErrors((prevErrors) => ({ ...prevErrors, images: null }));
  };

  const validateFields = () => {
    const newErrors = {};
    if (!titleRef.current.value.trim())
      newErrors.title = `${text.requiredField}`;
    if (!metal.trim()) newErrors.metal = `${text.requiredField}`;
    if (!probeRef.current.value.trim())
      newErrors.probe = `${text.requiredField}`;
    if (!weightRef.current.value.trim())
      newErrors.weight = `${text.requiredField}`;
    if (!priceRef.current.value.trim())
      newErrors.price = `${text.requiredField}`;
    if (!category.trim()) newErrors.category = `${text.requiredField}`;
    if (!descriptionRef.current.value.trim())
      newErrors.description = `${text.requiredField}`;
    if (files.length === 0) newErrors.images = `${text.min1image}`;
    else if (files.length > 5) newErrors.images = `${text.max5images}`;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateFields()) return;
    try {
      const formData = new FormData();
      formData.append("title", titleRef.current.value);
      formData.append("description", descriptionRef.current.value);
      formData.append("probe", probeRef.current.value);
      formData.append("weight", weightRef.current.value);
      formData.append("price", priceRef.current.value);
      formData.append("metal", metal);
      formData.append("category", category);
      formData.append("owner", user._id);
      files.forEach((file, index) => {
        formData.append("images", file, `image_${index}`);
      });

      const response = await axios.post(
        "http:localhost:3000/api/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(response.data);
      titleRef.current.value = "";
      descriptionRef.current.value = "";
      probeRef.current.value = "";
      weightRef.current.value = "";
      priceRef.current.value = "";
      setCategory("");
      setFiles([]);
      setErrors({});
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="add_item_form">
      <h4 className="page_title">{text.addItem}</h4>
      <div className="input_fields">
        <div className="basic_field">
          <label>{text.title}</label>
          {errors.title ? <p style={{ color: "red" }}>{errors.title}</p> : " "}
          <input type="text" ref={titleRef} />
        </div>

        <div className="basic_field">
          <label>{text.metal}</label>
          {errors.metal ? (
            <p style={{ color: "red" }}>{errors.metal}</p>
          ) : (
            " "
          )}
          <MetalChooser setMetal={setMetal} metal={metal} />
        </div>

        <div className="basic_field">
          <label>{text.probe}</label>
          {errors.probe ? <p style={{ color: "red" }}>{errors.probe}</p> : " "}
          <input type="number" ref={probeRef} />
        </div>
        <div className="basic_field">
          <label>{text.weight}</label>
          {errors.weight ? (
            <p style={{ color: "red" }}>{errors.weight}</p>
          ) : (
            " "
          )}

          <input type="number" ref={weightRef} />
        </div>
        <div className="basic_field">
          <label>{text.price} (₾)</label>
          {errors.price ? <p style={{ color: "red" }}>{errors.price}</p> : " "}

          <input type="number" ref={priceRef} />
        </div>
        <div className="basic_field">
          <label>{text.category}</label>
          {errors.category ? (
            <p style={{ color: "red" }}>{errors.category}</p>
          ) : (
            " "
          )}
          <CategoryDropdown setCategory={setCategory} category={category} />
        </div>
      </div>
      <div>
        <label>{text.description}</label>
        {errors.description ? (
          <p style={{ color: "red" }}>{errors.description}</p>
        ) : (
          " "
        )}

        <textarea ref={descriptionRef} rows="8" />
      </div>
      <div className="image_upload">
        <label>{text.image + " (" + text.max5 + ")"}</label>
        <UploadImage
          onDrop={onDrop}
          files={files}
          setFiles={setFiles}
          errors={errors}
        />
      </div>
      <button onClick={handleSubmit} className="add_item_btn">
        {text.add}
      </button>
    </div>
  );
}

export default AddItemForm;
