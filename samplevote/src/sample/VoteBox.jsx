import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import RadioCkSample from "./RadioCkSample";
import ShortSample from "./ShortSample";
import LongSample from "./LongSample";
import { useSelector } from "react-redux";

const VoteBox = ({ preViewState, formDataHandle, boxId }) => {
  const [voteType, setVoteType] = useState([
    {
      name: "단답형",
      id: "ShortSample",
      type: "short",
    },
    {
      name: "장문형",
      id: "LongSample",
      type: "long",
    },
    {
      name: "객관식",
      id: "RadioCkSample",
      type: "radio",
    },
    {
      name: "체크박스",
      id: "RadioCkSample",
      type: "chkbox",
    },
    {
      name: "드롭다운",
      id: "RadioCkSample",
      type: "dropDown",
    },
  ]);
  const [voteState, setVoteState] = useState("radio");
  let storeState = useSelector((state) => state.formData);
  useEffect(() => {
    if (storeState.length !== 0) {
      setVoteState(storeState.find((v) => v.boxId === boxId).type);
    }
  }, []);

  const typeHandleChange = (e) => {
    setVoteState(e.target.value);
    formDataHandle('type', e.target.value, boxId);
  };
  

  return (
    <>
      {!preViewState && (
        <FormControl fullWidth>
          <InputLabel>투표 타입</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={voteState}
            label="투표 타입"
            onChange={typeHandleChange}
          >
            {voteType.map((v, i) => {
              return (
                <MenuItem value={v.type} key={v.type}>
                  {v.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      )}

      {voteState === "short" && <ShortSample preViewState={preViewState} formDataHandle={formDataHandle} boxId={boxId}/>}
      {voteState === "long" && <LongSample preViewState={preViewState} formDataHandle={formDataHandle} boxId={boxId}/>}
      {voteState === "radio" && (
        <RadioCkSample type="radio" preViewState={preViewState} formDataHandle={formDataHandle} boxId={boxId}/>
      )}
      {voteState === "chkbox" && (
        <RadioCkSample type="chkbox" preViewState={preViewState} formDataHandle={formDataHandle} boxId={boxId}/>
      )}
      {voteState === "dropDown" && (
        <RadioCkSample type="dropDown" preViewState={preViewState} formDataHandle={formDataHandle} boxId={boxId}/>
      )}
    </>
  );
};

export default VoteBox;
