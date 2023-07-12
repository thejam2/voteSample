import { configureStore, createSlice } from "@reduxjs/toolkit";

let formData = createSlice({
  name: "formData",
  initialState: [],
  reducers : {
    updateForm(state, action){
        return action.payload
    }
  }
});
export let {updateForm} = formData.actions

let formResultData = createSlice({
    name: "formResultData",
    initialState: [],
    reducers : {
      updateResult(state, action){
          return action.payload
      }
    }
  });
export let {updateResult} = formResultData.actions

export default configureStore({
  reducer: {
    formData : formData.reducer,
    formResultData : formResultData.reducer,
  },
});
