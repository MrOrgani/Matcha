import React, { useContext } from "react";
import "./Photo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faStar } from "@fortawesome/free-solid-svg-icons";
import { ProfileFormContext } from "./../ProfileFormContext";
import { notify } from "react-notify-toast";

export const Photo = props => {
  const [state, setState] = useContext(ProfileFormContext);
  const { pics } = state;

  const getMimetype = signature => {
    switch (signature) {
      case "89504E47":
        return "image/png";
      case "FFD8FFDB":
      case "FFD8FFE0":
      case "FFD8FFE1":
        return "image/jpeg";
      default:
        return "Unknown filetype";
    }
  };

  //"inspiration" :  https://medium.com/the-everyday-developer/detect-file-mime-type-using-magic-numbers-and-javascript-16bc513d4e1e
  const handleChange = event => {
    const file = event.target.files[0];
    const readerProof = new FileReader();

    readerProof.onloadend = async function(evt) {
      if (evt.target.readyState === FileReader.DONE) {
        const uint = new Uint8Array(evt.target.result); //turns the 4 letter string into an array of unsigned int
        let bytes = []; // take every byte and turn it into hex
        uint.forEach(byte => {
          bytes.push(byte.toString(16));
        });
        const hex = await bytes.join("").toUpperCase();
        if (getMimetype(hex).slice(0, 5) !== "image") {
          notify.show("Pictures must be of type ong or jpeg", "error");
          return;
        }

        //NORMAL BEHAVIOR WE READ AND UPDATE STATE
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function() {
          const filesToShow = [...pics, reader.result];
          console.log(file);
          setState({ ...state, pics: filesToShow });
          props.setFieldValue("pics", filesToShow);

          //A GARDER
          // const filesToUpload = [...pics, JSON.stringify(file)]; // send the original file to the back for similar verifications
          // props.setFieldValue("pics", filesToUpload);
        };
      }
    };
    readerProof.readAsArrayBuffer(file.slice(0, 4)); //createa blob of the first 4 bytes
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
