import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ShortSample = ({ preViewState, formDataHandle, boxId }) => {
    const [shortQuestion, setShortQuestion] = useState("");
    let storeState = useSelector((state) => state.formData);
    useEffect(() => {
      if(preViewState){
        setShortQuestion(storeState.find(v=>v.boxId===boxId).title)
      }
    }, []);
    const [shortAnswer, setShortAnswer] = useState("");
  
    const shortQuestionChangeHandle = (e) => {
      setShortQuestion(e.target.value);
      formDataHandle('title', e.target.value, boxId);
    };
  
    const shortAnswerChangeHandle = (e) => {
      setShortAnswer(e.target.value);
      
    };
  
    if (preViewState) {
      return (
        <>
          <h2>{shortQuestion}</h2>
          <TextField
            id="standard-basic"
            label="단답형 답"
            variant="standard"
            style={{ width: "70%", marginTop: "10px" }}
            value={shortAnswer}
            onChange={shortAnswerChangeHandle}
          />
        </>
      );
    } else {
      return (
        <>
          <TextField
            label="단답형 질문"
            variant="standard"
            style={{ width: "95%" }}
            value={shortQuestion}
            onChange={shortQuestionChangeHandle}
          />
          <TextField
            id="standard-basic"
            label="단답형 답"
            variant="standard"
            style={{ width: "70%", marginTop: "10px" }}
            value=""
            disabled
          />
        </>
      );
    }
  };

  export default ShortSample;