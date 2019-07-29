import { useContext } from "react";
import { ProfileFormContext } from "./ProfileFormContext";

const useProfileForm = () => {
  const [state, setState] = useContext(ProfileFormContext);

  function handleChange(event) {
    event.persist();
    // console.log("NAME", event.target.name, "value", event.target.value);
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  }

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setState({
      previewImage: file.url || file.preview,
      previewVisible: true
    });
  };

  const handleCancel = () => setState({ previewVisible: false });

  const handlePictures = ({ fileList }) =>
    setState({ ...state, fileList: fileList });

  const trigerSubmit = event => {
    event.preventDefault();
    console.log("event", state);
  };

  return {
    handleChange,
    trigerSubmit,
    handlePictures,
    handleCancel,
    // handleChangePics,
    handlePreview,
    values: state,
    setState
  };
};

export default useProfileForm;
