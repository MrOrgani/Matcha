import React from "react";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";

export const Submit = () => {
  return (
    <Button
      variant="contained"
      type="submit"
      style={{
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        color: "white",
        marginBottom: "20px"
      }}
    >
      <SaveIcon />
      Save
    </Button>
  );
};
