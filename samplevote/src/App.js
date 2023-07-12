import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import TitleSample from "./sample/TitleSample";
import VoteBox from "./sample/VoteBox";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateForm } from "./store";

const Body = styled.div`
  background-color: #f0ebf8;
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
`;

const Box = styled.div`
  margin-top: 3%;
  background-color: white;
  border-radius: 8px;
  min-width: 95vh;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 2% 3%;
`;

function App() {
  const [preViewState, setpreViewState] = useState(false);
  let storeState = useSelector((state) => state.formData);
  let dispatch = useDispatch();
  const [boxState, setBoxState] = useState([0]);
  useEffect(() => {
    if (storeState.length !== 0) {
      setBoxState(storeState.map((v) => v.boxId));
      setpreViewState(true);
      setFormData(storeState);
    }
  }, []);

  const [formData, setFormData] = useState([
    {
      boxId: 0,
      type: "radio",
      title: "",
      option: [{ id: 0, value: "옵션1" }],
    },
  ]);

  const addBox = () => {
    let copyBoxState = [...boxState];
    let copyFormData = [...formData];
    if (copyBoxState.length === 0) {
      copyBoxState = copyBoxState.concat(0);
      copyFormData = copyFormData.concat({
        boxId: 0,
        type: "radio",
        title: "",
        option: [{ id: 0, value: "옵션1" }],
      });
    } else {
      let max = 0;
      boxState.map((v) => {
        if (v > max) {
          max = v;
        }
      });
      copyBoxState = copyBoxState.concat(max + 1);

      let max2 = 0;
      formData.map((v) => {
        if (v.boxId > max2) {
          max2 = v.boxId;
        }
      });
      copyFormData = copyFormData.concat({
        boxId: max2 + 1,
        type: "radio",
        title: "",
        option: [{ id: 0, value: "옵션1" }],
      });
    }
    setBoxState(copyBoxState);
    setFormData(copyFormData);
  };

  const removeBox = (index) => {
    const copy = boxState.filter((v) => v != index);
    setBoxState(copy);

    const copy2 = formData.filter((v) => v.boxId != index);
    setFormData(copy2);
  };

  const onDragEnd = (e) => {
    const destination = e.destination.index;
    const source = e.source.index;

    const copy = [...boxState];
    copy.splice(source, 1);
    copy.splice(destination, 0, boxState[source]);
    setBoxState(copy);

    const copyData = [...formData];
    copyData.splice(source, 1);
    copyData.splice(destination, 0, formData[source]);
    setFormData(copyData);
    
    //[boxState[destination], boxState[source]] = [boxState[source], boxState[destination]];
    //console.log(boxState)
  };

  const onSubmitHandle = (e) => {
    //console.log(storeState);
  };

  const preViewClick = () => {
    setpreViewState(true);
    console.log(formData);
    dispatch(updateForm(formData));
  };

  const formDataHandle = (key, value, boxId) => {
    let copyFormData = [...formData];
    if (key === "boxId") {
    } else if (key === "type") {
      copyFormData[boxId].type = value;
    } else if (key === "title") {
      copyFormData[boxId].title = value;
    } else if (key === "option") {
      copyFormData[boxId].option = value;
    }
    //console.log(copyFormData);
    setFormData(copyFormData);
  };

  return (
    <Body>
      <form style={{ width: "100vh" }}>
        <Box>
          <TitleSample preViewState={preViewState} />
        </Box>

        {/* {boxState.map((v) => (
          <Box key={v}>
            <VoteBox preViewState={preViewState} />

            {!preViewState && (
              <Button
                variant="contained"
                onClick={() => removeBox(v)}
                style={{ marginTop: "20px" }}
              >
                박스 삭제
              </Button>
            )}
          </Box>
        ))} */}

        <DragDropContext onDragEnd={(e) => onDragEnd(e)}>
          <div>
            <Droppable droppableId="box">
              {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {boxState.map((v, i) => {
                    return (
                      <Draggable
                        draggableId={"draggable" + v}
                        index={i}
                        key={v}
                        isDragDisabled={preViewState}
                      >
                        {(provided, snapshot) => (
                          <Box
                            key={v}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <VoteBox
                              preViewState={preViewState}
                              formDataHandle={formDataHandle}
                              boxId={v}
                            />

                            {!preViewState && (
                              <Button
                                variant="contained"
                                onClick={() => removeBox(v)}
                                style={{ marginTop: "20px" }}
                              >
                                박스 삭제
                              </Button>
                            )}
                          </Box>
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

        {preViewState ? (
          <Button
            variant="contained"
            onClick={onSubmitHandle}
            style={{ margin: "20px 0" }}
          >
            제출
          </Button>
        ) : (
          <>
            <Button
              variant="contained"
              onClick={addBox}
              style={{ margin: "20px 0" }}
            >
              박스 추가
            </Button>
            <Button
              variant="contained"
              onClick={preViewClick}
              style={{ margin: "20px 0" }}
            >
              미리보기
            </Button>
          </>
        )}
      </form>
    </Body>
  );
}

export default App;
