import { useContext } from "react";
import { ProfileFormContext } from "./ProfileFormContext";

const useProfileForm = () => {
  const [state, setState] = useContext(ProfileFormContext);

  function handleChange(event) {
    event.persist();
    console.log("NAME", event.target.name, "value", event.target.value);
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
  };

  const handleChangePics = ({ fileList }) => setState({ fileList });
  const handleCancel = () => this.setState({ previewVisible: false });

  const handlePicture = event => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = e => {
        console.log("event", e);
        state.pics.push(e.target.result);

        // this.setState({ state });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    console.log("state", state);
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log("event", state);
  };

  return {
    handleChange,
    handleSubmit,
    handlePicture,
    handleCancel,
    handleChangePics,
    handlePreview,
    values: state,
    setState
  };
};

export default useProfileForm;
