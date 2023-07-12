import { TextField } from "@mui/material";
import { useState } from "react";

const TitleSample = ({ preViewState }) => {
    const [title, setTitle] = useState("설문 Title Sample");
    const titleChangeHandle = (e) => {
      setTitle(e.target.value);
    };
  
    if (preViewState) {
      return <h1>{title}</h1>;
    } else {
      return (
        <TextField
          label="설문 Title Sample"
          variant="standard"
          style={{ width: "95%" }}
          InputProps={{
            readOnly: preViewState,
          }}
          value={title}
          onChange={titleChangeHandle}
        />
      );
    }
  };

  export default TitleSample;