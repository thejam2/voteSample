import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const LongSample = ({ preViewState, formDataHandle, boxId }) => {
    const [longQuestion, setLongQuestion] = useState("");
    const [longAnswer, setLongAnswer] = useState("");
    let storeState = useSelector((state) => state.formData);
    useEffect(() => {
      if(preViewState){
        setLongQuestion(storeState.find(v=>v.boxId===boxId).title)
      }
    }, []);
    const longQuestionChangeHandle = (e) => {
      setLongQuestion(e.target.value);
      formDataHandle('title', e.target.value, boxId);
    };
  
    const longAnswerChangeHandle = (e) => {
      setLongAnswer(e.target.value);
    };
  
    if (preViewState) {
      return (
        <>
          <h2>{longQuestion}</h2>
  
          <div>
            <TextField
              label="장문형 답"
              multiline
              variant="standard"
              onChange={longAnswerChangeHandle}
            />
          </div>
        </>
      );
    } else {
      return (
        <>
          <TextField
            label="장문형 질문"
            variant="standard"
            style={{ width: "95%" }}
            value={longQuestion}
            onChange={longQuestionChangeHandle}
          />
          <TextField
            id="standard-basic"
            label="장문형 답"
            variant="standard"
            style={{ width: "70%", marginTop: "10px" }}
            value=""
            multiline
            disabled
          />
        </>
      );
    }
  };

  export default LongSample;