import React, { useState, useContext } from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { Upload, Icon, Modal, Tag } from "antd";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import { ProfileFormContext } from "./../ProfileFormContext";
// import { Hobbies } from "./Components/Hobbies";

const Hobbies = [
  "La lecture",
  "Les jeux de société et jeux de réflexion",
  "La promenade",
  "L’apprentissage d’une nouvelle langue",
  "Le tricot",
  "La cuisine",
  "Regarder la télévision",
  "Prendre soin de soi",
  "Faire le ménage",
  "Le bricolage",
  "Le jardinage",
  "Écouter de la musique",
  "Nager",
  "Le bénévolat",
  "L’astronomie",
  "S’occuper de son animal de compagnie",
  "Voyager",
  "Le modélisme",
  "L’Origami",
  "Apprendre à jouer d’un instrument de musique",
  "La couture",
  "Visiter les monuments historiques",
  "Aller au théâtre",
  "Le karting",
  "Le karaoké",
  "Le paintball",
  "La peinture",
  "Le rubik’s cube",
  "Le vide-grenier",
  "Aller au cinéma",
  "Jouer au billard",
  "Le sport",
  "Créer et gérer un blog",
  "Le Scrapbooking",
  "La photographie",
  "Le dessin",
  "Les jeux vidéo",
  "Les devinettes",
  "La vente en ligne",
  "Aller au restaurant",
  "Débusquer les bonnes affaires sur internet",
  "Le shopping",
  "Collectionner",
  "Écouter la radio",
  "Une fête improvisée chez soi",
  "Prendre des nouvelles d’un ami, d’un proche",
  "Établir la liste des choses à faire pour le lendemain",
  "Le repassage",
  "La poterie",
  "La randonnée"
];

export const FirstName = props => {
  return (
    <TextField
      className="input"
      type="text"
      label="First Name"
      name="firstName"
      variant="outlined"
      // required
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      helperText={
        props.helperText[0] && props.helperText[1] && props.helperText[2]
      }
    />
  );
};

export const LastName = props => {
  return (
    <TextField
      className="input"
      type="text"
      name="lastName"
      label="Last Name"
      variant="outlined"
      // required
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      helperText={
        props.helperText[0] && props.helperText[1] && props.helperText[2]
      }
    />
  );
};

export const Email = props => {
  // const { handleChange, values } = useProfileForm();

  return (
    <TextField
      className="input"
      type="email"
      label="Email"
      name="email"
      variant="outlined"
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      helperText={
        props.helperText[0] && props.helperText[1] && props.helperText[2]
      }
    />
  );
};

export const Login = props => {
  return (
    <TextField
      className="input"
      type="text"
      label="Login"
      name="login"
      variant="outlined"
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      helperText={
        props.helperText[0] && props.helperText[1] && props.helperText[2]
      }
    />
  );
};

export const Bio = props => {
  return (
    <TextField
      className="input"
      type="text"
      label="Bio"
      name="bio"
      multiline
      rows="4"
      variant="outlined"
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      helperText={
        props.helperText[0] && props.helperText[1] && props.helperText[2]
      }
    />
  );
};

export const Gender = props => {
  return (
    <TextField
      select
      label="Select Gender"
      // required
      value={props.value}
      onChange={props.onChange}
      // onBlur={props.onBlur}
      helperText={
        props.helperText[0] && props.helperText[1] && props.helperText[2]
      }
      margin="normal"
      variant="outlined"
    >
      <MenuItem value="" />
      <MenuItem value="male">Male</MenuItem>
      <MenuItem value="female">Female</MenuItem>
    </TextField>
  );
};

export const SexualOrientation = props => {
  return (
    <TextField
      select
      label="Sexual Orientation"
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      helperText={
        props.helperText[0] && props.helperText[1] && props.helperText[2]
      }
      margin="normal"
      variant="outlined"
    >
      <MenuItem value="" />
      <MenuItem key="bi" value="bi">
        Bi
      </MenuItem>
      <MenuItem key="straight" value="straight">
        Straight
      </MenuItem>
      <MenuItem key="gay" value="gay">
        Gay
      </MenuItem>
    </TextField>
  );
};

export const Age = props => {
  return (
    <TextField
      id="filled-number"
      label="Age"
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      helperText={
        props.helperText[0] && props.helperText[1] && props.helperText[2]
      }
      type="number"
      InputLabelProps={{
        shrink: true
      }}
      margin="normal"
      variant="outlined"
    />
  );
};

export const UploadFile = props => {
  // https://stackoverflow.com/questions/56149756/reactjs-how-to-handle-image-file-upload-with-formik */

  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  return (
    <React.Fragment>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={props.fileList}
        onPreview={props.onPreview}
        onChange={event => {
          // console.log("EVENT ", event.fileList);
          props.setFieldValue("fileList", event.fileList);
        }}
      >
        {props.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal
        // visible={values.previewVisible}
        footer={null}
        onCancel={props.handleCancel}
      >
        <img
          alt="example"
          style={{ width: "100%" }}
          src={props.values.previewImage}
        />
      </Modal>
    </React.Fragment>
  );
};

const { CheckableTag } = Tag;
export const Tags = props => {
  const [state, setState] = useContext(ProfileFormContext);
  console.log("test", state);
  const { hobbies } = state;
  function handleChange(tag, checked) {
    const { hobbies } = state;
    const nextSelectedTags = checked
      ? [...selectedTags, tag]``
      : hobbies.filter(t => t !== tag);
    // console.log("You are interested in: ", nextSelectedTags);
    setState({ hobbies: nextSelectedTags });
  }

  const tagsFromServer = Hobbies;
  const { selectedTags } = state;
  return (
    <div>
      {/* <h6 style={{ marginRight: 8, display: "inline" }}>Categories:</h6> */}
      {tagsFromServer.map(tag => (
        <CheckableTag
          key={tag}
          checked={hobbies.indexOf(tag) > -1}
          onChange={checked => handleChange(tag, checked)}
        >
          {tag}
        </CheckableTag>
      ))}
    </div>
  );
};

export const Submit = () => {
  return (
    <Button
      variant="contained"
      type="submit"
      style={{
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        color: "white"
      }}
    >
      <SaveIcon />
      Save
    </Button>
  );
};
