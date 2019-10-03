import React, { useContext } from "react";
import "./Photo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faStar } from "@fortawesome/free-solid-svg-icons";
import { ProfileFormContext } from "./../ProfileFormContext";

export const Photo = props => {
  const [state, setState] = useContext(ProfileFormContext);
  const { pics } = state;

  // console.log("state = ", state);
  const handleChange = event => {
    const file = event.target.files[0];
    const reader = new FileReader();
    if (file && file.type.match("image.*")) {
      reader.readAsDataURL(file);
    }
    reader.onloadend = function() {
      const allFiles = [...pics, reader.result];
      setState({ ...state, pics: allFiles });
      props.setFieldValue("pics", allFiles);
    };
  };

  async function handleDelete(index) {
    pics.splice(index, 1);
    const notDeletedPhotos = pics;
    // filter(file => pics.indexOf(file) !== index);
    if (index <= state.indexOfPP) {
      await setState({
        ...state,
        pics: notDeletedPhotos,
        indexOfPP: state.indexOfPP <= 0 ? 0 : state.indexOfPP - 1
      });
      await props.setFieldValue("pics", notDeletedPhotos);
      await props.setFieldValue("indexOfPP", state.indexOfPP);
    } else {
      await setState({ ...state, pics: notDeletedPhotos });
      props.setFieldValue("pics", notDeletedPhotos);
    }
  }

  function handleFav(index) {
    setState({ ...state, indexOfPP: index });
    props.setFieldValue("indexOfPP", index);
  }
  return (
    <React.Fragment>
      <div className="gridPhotos">
        {state.pics.map((file, index) => (
          <div key={index} className="textWithBlurredBg">
            <img
              alt={index}
              className={
                state.indexOfPP === index || (index === 0 && pics.length === 1)
                  ? "favPreviewImg"
                  : "previewImg"
              }
              src={file}
            />
            <div className="iconsImages">
              <FontAwesomeIcon
                icon={faTrash}
                size="2x"
                onClick={() => handleDelete(index)}
              />
              <FontAwesomeIcon
                icon={faStar}
                size="2x"
                onClick={() => handleFav(index)}
              />
            </div>
          </div>
        ))}
      </div>
      {state.pics.length < 5 ? (
        <div>
          <input
            id="ppt"
            className="uploadButton"
            type="file"
            accept="image/png, image/jpeg"
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
