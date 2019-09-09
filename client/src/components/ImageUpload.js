import React, { useState, useCallback } from "react";
import Dropzone, { useDropzone } from "react-dropzone";
import request from "superagent";

const CLOUDINARY_UPLOAD_PRESET = "zaawjkhe";
const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/drakuseth/upload";

export default function ImageUpload() {
  const [state, setState] = useState({
    uploadedFile: null,
    uploadedFileCloudinaryUrl: ""
  });

  const onDrop = useCallback(files => {
    // Do something with the files
    setState({ uploadedFile: files[0] });
    handleImageUpload(files[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  function handleImageUpload(file) {
    let upload = request
      .post(CLOUDINARY_UPLOAD_URL)
      .field("upload_preset", CLOUDINARY_UPLOAD_PRESET)
      .field("file", file);

    upload.end((err, res) => {
      if (err) {
        console.log(err);
      }

      if (res.body.secure_url !== "") {
        setState({ uploadedFileCloudinaryUrl: res.body.secure_url });
      }
    });
  }
  return (
    <form>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
    </form>
  );
}
