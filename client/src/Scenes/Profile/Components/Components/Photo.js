import React, { useContext } from "react";
import "./Photo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faStar } from "@fortawesome/free-solid-svg-icons";
import { ProfileFormContext } from "./../ProfileFormContext";

export const Photo = props => {
  const [state, setState] = useContext(ProfileFormContext);
  const { pics } = state;
  // const indexOfPP = state.indexOfPP.low;
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

  function handleDelete(index) {
    const notDeletedPhotos = pics.filter(file => pics.indexOf(file) !== index);
    if (index <= state.indexOfPP) {
      setState({
        ...state,
        pics: notDeletedPhotos,
        indexOfPP: state.indexOfPP < 0 ? 0 : state.indexOfPP - 1
      });
      props.setFieldValue("pics", notDeletedPhotos);
      props.setFieldValue(
        "indexOfPP",
        state.indexOfPP < 0 ? 0 : state.indexOfPP - 1
      );
    } else {
      setState({ ...state, pics: notDeletedPhotos });
      props.setFieldValue("pics", notDeletedPhotos);
    }
  }

  function handleFav(index) {
    setState({ ...state, indexOfPP: index });
    props.setFieldValue("indexOfPP", index);
  }
  // console.log("state length", state, pics.length, state.indexOfPP);
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
              {/* <a href="#"> */}
              <FontAwesomeIcon
                icon={faTrash}
                size="2x"
                onClick={() => handleDelete(index)}
              />
              {/* </a> */}
              {/* <a href="#"> */}
              <FontAwesomeIcon
                icon={faStar}
                size="2x"
                onClick={() => handleFav(index)}
              />
              {/* </a> */}
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
