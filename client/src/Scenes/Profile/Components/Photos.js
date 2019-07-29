import React from "react"; // , { useContext }
// import { makeStyles } from "@material-ui/core/styles";
// import PhotoMenuBar from "./Components/PhotoMenuBar";
// import axios from "axios";
// import { ProfileFormContext } from "./ProfileFormContext";

// const useStyles = makeStyles(theme => ({
//   root: {
//     flexGrow: 1,
//     display: "flex",
//     flexDirection: "column"
//   }
// }));

// export default function Photos(props) {
//   const [state, setState] = useContext(ProfileFormContext);
//   const classes = useStyles();
//   const [activeStep, setActiveStep] = React.useState(0);
//   const data = JSON.parse(sessionStorage.getItem("data"));
//   const maxSteps = data.pics.length;

//   // console.log(props);

//   function handleNext() {
//     setActiveStep(prevActiveStep => prevActiveStep + 1);
//   }

//   function handleBack() {
//     setActiveStep(prevActiveStep => prevActiveStep - 1);
//   }
//   return (
//     <div className={classes.root}>
//       <img
//         className={classes.img}
//         src={state.pics}
//         // {props.pics[activeStep]
//         alt={
//           state.pics[activeStep]
//           // props.pics[activeStep]
//         }
//       />
//       <PhotoMenuBar
//         backNext={[handleBack, handleNext]}
//         activeStep={activeStep}
//         maxSteps={maxSteps}
//       />
//     </div>
//   );
// }

import { Upload, Icon, Modal } from "antd";
import useProfileForm from "./useProfileForm";

// function getBase64(file) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = error => reject(error);
//   });
// }

// class PicturesWall extends React.Component {
//   state = {
//     previewVisible: false,
//     previewImage: "",
//     fileList: []
//   };

//   handleCancel = () => this.setState({ previewVisible: false });

//   handlePreview = async file => {
//     if (!file.url && !file.preview) {
//       file.preview = await getBase64(file.originFileObj);
//     }

//     this.setState({
//       previewImage: file.url || file.preview,
//       previewVisible: true
//     });
//   };

//   handleChange = ({ fileList }) => this.setState({ fileList });

//   render() {
//     const { previewVisible, previewImage, fileList } = this.state;
//     const uploadButton = (
//       <div>
//         <Icon type="plus" />
//         <div className="ant-upload-text">Upload</div>
//       </div>
//     );
//     return (
//       <div className="clearfix">
//         <Upload
//           action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
//           listType="picture-card"
//           fileList={fileList}
//           onPreview={this.handlePreview}
//           onChange={this.handleChange}
//         >
//           {fileList.length >= 8 ? null : uploadButton}
//         </Upload>
//         <Modal
//           visible={previewVisible}
//           footer={null}
//           onCancel={this.handleCancel}
//         >
//           <img alt="example" style={{ width: "100%" }} src={previewImage} />
//         </Modal>
//       </div>
//     );
//   }
// }

const PicturesWall = () => {
  const {
    values,
    handlePreview,
    handlePictures,
    handleCancel
  } = useProfileForm();
  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  return (
    <div className="clearfix">
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={values.fileList}
        onPreview={handlePreview}
        onChange={handlePictures}
      >
        {values.fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal
        // visible={values.previewVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{ width: "100%" }}
          src={values.previewImage}
        />
      </Modal>
    </div>
  );
};

export default PicturesWall;
