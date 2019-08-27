import React, { useContext } from "react";
import "./Photo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { ProfileFormContext } from "./../ProfileFormContext";

export const Photo = props => {
  const [state, setState] = useContext(ProfileFormContext);
  const { pics } = state;

  const handleChange = event => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = function() {
      const allFiles = [...pics, reader.result];
      setState({ ...state, pics: allFiles });
      props.setFieldValue("pics", allFiles);
    };
    reader.readAsDataURL(file);
  };

  function handleClick(index) {
    // const { files } = state;
    const notDeletedPhotos = pics.filter(file => pics.indexOf(file) !== index);
    setState({ ...state, pics: notDeletedPhotos });
    props.setFieldValue("pics", notDeletedPhotos);
  }
  return (
    <React.Fragment>
      <div className="gridPhotos">
        {state.pics.map((file, index) => (
          <a
            key={index}
            className="textWithBlurredBg"
            onClick={() => handleClick(index)}
          >
            <img className="previewImage" src={file} />
            <h2>
              <FontAwesomeIcon icon={faTrash} size="6x" />
            </h2>
          </a>
        ))}
      </div>
      {state.pics.length < 5 ? (
        <div>
          <input
            id="ppt"
            className="uploadButton"
            type="file"
            onChange={handleChange}
          />
          <label htmlFor="ppt" style={{ border: "1px solid black" }}>
            Add a photo
          </label>
        </div>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};
