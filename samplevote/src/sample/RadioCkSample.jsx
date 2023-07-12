import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";

const InlineDiv = styled.div`
  display: inline-block;
  cursor: pointer;
`;

const RadioCkSample = ({ preViewState, type, formDataHandle, boxId }) => {
  const [radioCkTitle, setRadioCkTitle] = useState("");
  const [radioCkList, setRadioCkList] = useState([
    {
      id: 0,
      value: "옵션 1",
    },
  ]);
  const [EtcAddState, setEtcAddState] = useState(false);
  const [radioCkEtcText, setRadioCkEtcText] = useState("");
  const [dropDownVal, setDropDownVal] = useState("");
  let storeState = useSelector((state) => state.formData);
  useEffect(() => {
    if (preViewState) {
      setRadioCkTitle(storeState.find((v) => v.boxId === boxId).title);
    }
  }, []);

  useEffect(() => {
    if (storeState.length !== 0) {
      const option = storeState.filter((v) => v.boxId === boxId)[0].option;
      setRadioCkList(option);
    }
  }, []);

  const radioCkTitleChangeHandle = (e) => {
    setRadioCkTitle(e.target.value);
    formDataHandle("title", e.target.value, boxId);
  };

  const radioCkEtcTextChangeHandle = (e) => {
    setRadioCkEtcText(e.target.value);
  };

  const optionChangeHandle = (id, e) => {
    const newList = [];
    radioCkList.map((v) => {
      if (v.id === id) {
        v.value = e.target.value;
      }
      newList.push(v);
    });

    setRadioCkList(newList);

    formDataHandle("option", newList, boxId);
  };

  const addOption = () => {
    let max = 0;
    radioCkList.map((v) => {
      if (v.id > max) {
        max = v.id;
      }
    });

    if (radioCkList.find((v) => v.id === "etc") === undefined) {
      setRadioCkList([
        ...radioCkList,
        {
          //id: radioCkList.length,
          id: max + 1,
          //value: "옵션 " + (radioCkList.length + 1),
          value: "옵션 " + (max + 2),
        },
      ]);
      formDataHandle(
        "option",
        [
          ...radioCkList,
          {
            //id: radioCkList.length,
            id: max + 1,
            //value: "옵션 " + (radioCkList.length + 1),
            value: "옵션 " + (max + 2),
          },
        ],
        boxId
      );
    } else {
      const newRadioList = [...radioCkList];
      newRadioList.splice(newRadioList.length - 1, 0, {
        //id: newRadioList.length - 1,
        id: max + 1,
        //value: "옵션 " + newRadioList.length,
        value: "옵션 " + (max + 2),
      });
      setRadioCkList(newRadioList);
      formDataHandle("option", newRadioList, boxId);
    }
  };

  const addEtc = () => {
    setRadioCkList([
      ...radioCkList,
      {
        id: "etc",
        value: "기타...",
      },
    ]);
    formDataHandle(
      "option",
      [
        ...radioCkList,
        {
          id: "etc",
          value: "기타...",
        },
      ],
      boxId
    );

    setEtcAddState(true);
  };

  const deleteOption = (id) => {
    let newRadioList = [...radioCkList];
    newRadioList = newRadioList.filter((v) => v.id != id);

    if (id === "etc") {
      setEtcAddState(false);
    }

    setRadioCkList(newRadioList);
    formDataHandle("option", newRadioList, boxId);
  };

  const onDragEnd = (e) => {
    const destination = e.destination.index;
    const source = e.source.index;
    const copy = [...radioCkList];
    copy.splice(source, 1);
    copy.splice(destination, 0, radioCkList[source]);
    setRadioCkList(copy);

    const copyData = [...radioCkList];
    copyData.splice(source, 1);
    copyData.splice(destination, 0, radioCkList[source]);
    formDataHandle("option", copyData, boxId);
  };

  if (preViewState) {
    if (type === "radio") {
      return (
        <>
          <h2>{radioCkTitle}</h2>

          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
          >
            {radioCkList.map((v) => {
              if (v.id === "etc") {
                return (
                  <FormControlLabel
                    value={v.id}
                    key={v.id}
                    control={<Radio />}
                    label={
                      <>
                        <span>기타 : </span>
                        <TextField
                          variant="standard"
                          value={radioCkEtcText}
                          onChange={radioCkEtcTextChangeHandle}
                        />
                      </>
                    }
                  />
                );
              } else {
                return (
                  <FormControlLabel
                    value={v.id}
                    key={v.id}
                    control={<Radio />}
                    label={v.value}
                  />
                );
              }
            })}
          </RadioGroup>
        </>
      );
    } else if (type === "chkbox") {
      return (
        <>
          <h2>{radioCkTitle}</h2>

          <FormGroup>
            {radioCkList.map((v) => {
              if (v.id === "etc") {
                return (
                  <FormControlLabel
                    value={v.id}
                    key={v.id}
                    control={<Checkbox />}
                    label={
                      <>
                        <span>기타 : </span>
                        <TextField
                          variant="standard"
                          value={radioCkEtcText}
                          onChange={radioCkEtcTextChangeHandle}
                        />
                      </>
                    }
                  />
                );
              } else {
                return (
                  <FormControlLabel
                    value={v.id}
                    key={v.id}
                    control={<Checkbox />}
                    label={v.value}
                  />
                );
              }
            })}
          </FormGroup>
        </>
      );
    } else {
      return (
        <>
          <h2>{radioCkTitle}</h2>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Sample</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              value={dropDownVal}
              label="Sample"
              onChange={(e) => {
                setDropDownVal(e.target.value);
              }}
            >
              {radioCkList.map((v, i) => {
                return (
                  <MenuItem value={v.id} key={v.id}>
                    {v.value}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </>
      );
    }
  } else {
    if (type === "radio") {
      return (
        <>
          <TextField
            label="객관식 질문"
            variant="standard"
            style={{ width: "95%" }}
            value={radioCkTitle}
            onChange={radioCkTitleChangeHandle}
          />
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
          >
            <DragDropContext onDragEnd={(e) => onDragEnd(e)}>
              <div>
                <Droppable droppableId="optionList">
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {radioCkList.map((v, i) => {
                        if (v.id === "etc") {
                          return (
                            <FormControlLabel
                              value={v.id}
                              key={v.id}
                              control={<Radio disabled />}
                              label={
                                <>
                                  <TextField
                                    variant="standard"
                                    value={v.value}
                                    disabled
                                  />
                                  <IconButton
                                    aria-label="delete"
                                    size="small"
                                    onClick={() => deleteOption(v.id)}
                                  >
                                    <DeleteIcon fontSize="inherit" />
                                  </IconButton>
                                </>
                              }
                            />
                          );
                        } else {
                          return (
                            <Draggable
                              draggableId={"draggable" + v.id}
                              index={i}
                              key={v.id}
                            >
                              {(provided, snapshot) => (
                                <div
                                  key={v}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <DragHandleIcon
                                    style={{
                                      cursor: "pointer",
                                      position: "relative",
                                      top: "8px",
                                    }}
                                  />
                                  <FormControlLabel
                                    value={v.id}
                                    //key={v.id}
                                    control={<Radio disabled />}
                                    label={
                                      <>
                                        <TextField
                                          variant="standard"
                                          value={v.value}
                                          onChange={(e) => {
                                            optionChangeHandle(v.id, e);
                                          }}
                                        />
                                        {radioCkList.length === 1 ? null : (
                                          <IconButton
                                            aria-label="delete"
                                            size="small"
                                            onClick={() => deleteOption(v.id)}
                                          >
                                            <DeleteIcon fontSize="inherit" />
                                          </IconButton>
                                        )}
                                      </>
                                    }
                                  />
                                </div>
                              )}
                            </Draggable>
                          );
                        }
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </DragDropContext>

            <FormControlLabel
              value=""
              control={<Radio />}
              label={
                <>
                  <InlineDiv onClick={addOption}>옵션추가</InlineDiv>
                  {EtcAddState ? null : (
                    <InlineDiv>
                      <span style={{ color: "black", cursor: "auto" }}>
                        또는{" "}
                      </span>
                      <InlineDiv onClick={addEtc}>'기타'추가</InlineDiv>
                    </InlineDiv>
                  )}
                </>
              }
              disabled
            />
          </RadioGroup>
        </>
      );
    } else if (type === "chkbox") {
      return (
        <>
          <TextField
            label="체크박스"
            variant="standard"
            style={{ width: "95%" }}
            value={radioCkTitle}
            onChange={radioCkTitleChangeHandle}
          />
          <FormGroup>
            <DragDropContext onDragEnd={(e) => onDragEnd(e)}>
              <div>
                <Droppable droppableId="optionList">
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {radioCkList.map((v, i) => {
                        if (v.id === "etc") {
                          return (
                            <FormControlLabel
                              value={v.id}
                              key={v.id}
                              control={<Checkbox disabled />}
                              label={
                                <>
                                  <TextField
                                    variant="standard"
                                    value={v.value}
                                    disabled
                                  />
                                  <IconButton
                                    aria-label="delete"
                                    size="small"
                                    onClick={() => deleteOption(v.id)}
                                  >
                                    <DeleteIcon fontSize="inherit" />
                                  </IconButton>
                                </>
                              }
                            />
                          );
                        } else {
                          return (
                            <Draggable
                              draggableId={"draggable" + v.id}
                              index={i}
                              key={v.id}
                            >
                              {(provided, snapshot) => (
                                <div
                                  key={v}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <DragHandleIcon
                                    style={{
                                      cursor: "pointer",
                                      position: "relative",
                                      top: "8px",
                                    }}
                                  />
                                  <FormControlLabel
                                    value={v.id}
                                    //key={v.id}
                                    control={<Checkbox disabled />}
                                    label={
                                      <>
                                        <TextField
                                          variant="standard"
                                          value={v.value}
                                          onChange={(e) => {
                                            optionChangeHandle(v.id, e);
                                          }}
                                        />
                                        {radioCkList.length === 1 ? null : (
                                          <IconButton
                                            aria-label="delete"
                                            size="small"
                                            onClick={() => deleteOption(v.id)}
                                          >
                                            <DeleteIcon fontSize="inherit" />
                                          </IconButton>
                                        )}
                                      </>
                                    }
                                  />
                                </div>
                              )}
                            </Draggable>
                          );
                        }
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </DragDropContext>

            <FormControlLabel
              value=""
              control={<Checkbox />}
              label={
                <>
                  <InlineDiv onClick={addOption}>옵션추가</InlineDiv>
                  {EtcAddState ? null : (
                    <InlineDiv>
                      <span style={{ color: "black", cursor: "auto" }}>
                        또는{" "}
                      </span>
                      <InlineDiv onClick={addEtc}>'기타'추가</InlineDiv>
                    </InlineDiv>
                  )}
                </>
              }
              disabled
            />
          </FormGroup>
        </>
      );
    } else {
      return (
        <>
          <TextField
            label="드롭다운 Sample"
            variant="standard"
            style={{ width: "95%" }}
            value={radioCkTitle}
            onChange={radioCkTitleChangeHandle}
          />

          <DragDropContext onDragEnd={(e) => onDragEnd(e)}>
            <div>
              <Droppable droppableId="optionList">
                {(provided, snapshot) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {radioCkList.map((v, i) => {
                      return (
                        <Draggable
                          draggableId={"draggable" + v.id}
                          index={i}
                          key={v.id}
                        >
                          {(provided, snapshot) => (
                            <div
                              key={v.id}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <DragHandleIcon
                                style={{
                                  cursor: "pointer",
                                  position: "relative",
                                  top: "5px",
                                }}
                              />
                              <TextField
                                variant="standard"
                                value={v.value}
                                onChange={(e) => {
                                  optionChangeHandle(v.id, e);
                                }}
                              />
                              {radioCkList.length === 1 ? null : (
                                <IconButton
                                  aria-label="delete"
                                  size="small"
                                  onClick={() => deleteOption(v.id)}
                                >
                                  <DeleteIcon fontSize="inherit" />
                                </IconButton>
                              )}
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </DragDropContext>

          <InlineDiv onClick={addOption}>옵션추가</InlineDiv>
        </>
      );
    }
  }
};

export default RadioCkSample;
