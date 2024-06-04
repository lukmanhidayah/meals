"use client";

import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

export default function ImagePicker({ label, name }) {
  const [pickedImage, setPickedImage] = useState();
  const ref = useRef();

  function handleClick() {
    ref.current.click();
  }

  function handleChangeImage(event) {
    const file = event.target.files[0];

    if (!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No Image Picket Yet</p>}
          {pickedImage && <Image src={pickedImage} alt="Selected Image" fill />}
        </div>
        <input
          onChange={handleChangeImage}
          ref={ref}
          className={classes.input}
          type="file"
          id={name}
          multiple
          accept="image/png, image/jpg"
          name={name}
          required
        />
      </div>
      <button onClick={handleClick} className={classes.button} type="button">
        Pick an Image
      </button>
    </div>
  );
}
