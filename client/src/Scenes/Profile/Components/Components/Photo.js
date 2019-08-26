import React, { useState } from "react";
import "./Photo.css";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

export const Photo = () => {
  const [state, setState] = useState({
    files: []
  });

  //   function getBase64(img, callback) {
  //     const reader = new FileReader();
  //     // reader.addEventListener("load", () => callback(reader.result));
  //     reader.onloadend = function() {
  //       console.log("RESULT", reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }

  const handleChange = event => {
    const { files } = state;
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = function() {
      const allFiles = [...files, reader.result];
      console.log("RESULT", reader.result);
      setState({
        files: allFiles
      });
    };
    reader.readAsDataURL(file);
    // console.log("end", end);
  };
  return (
    <React.Fragment>
      <div className="gridPhotos">
        {state.files.map((file, index) => (
          <a key={index} className="textWithBlurredBg">
            <img className="previewImage" src={file} />
            <h2>Click to delete</h2>
          </a>
        ))}
      </div>
      {state.files.length < 5 ? (
        //   <label for="ppt">
        <div>
          <input
            id="ppt"
            className="uploadButton"
            type="file"
            onChange={handleChange}
          />
          <label
            htmlFor="ppt"
            // class="button"
            style={{ border: "1px solid black" }}
          >
            Add a photo
          </label>
        </div>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};
