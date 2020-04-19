import { createAction, handleActions } from "redux-actions";
// import React from "react";
import produce from "immer";
import { post } from "axios";

const CHANGE_FIELD = "weeklygoals/CHANGE_FIELD"; // 인풋 값을 변경함
const INSERT = "weeklygoals/INSERT"; // 새로운 item 를 등록함
const TOGGLE = "weeklygoals/TOGGLE"; // item 를 체크/체크해제 함
const REMOVE = "weeklygoals/REMOVE"; // item 를 제거함
const EDIT = "weeklygoals/EDIT"; // item을 수정함
const INITIALIZE_FORM = "weeklygoals/INITIALIZE_FORM"; // 인풋을 초기화함
const INITIATE_EDIT_FIELD = "weeklygoals/INITIATE_EDIT_FIELD"; // Edit Input을 초기화함
const READ_DB = "weeklygoals/READ_DB"; // DB를 읽어옴

export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form,
    key,
    value,
  })
);
export const initiateEditField = createAction(
  INITIATE_EDIT_FIELD,
  ({ form, value }) => ({
    form,
    value,
  })
);

// let id = Math.random(); // insert 가 호출 될 때마다 1씩 더해집니다.
export const insert = createAction(INSERT, (weeklygoal) => ({
  weeklygoal,
}));

export const toggle = createAction(TOGGLE, (id) => id);
export const remove = createAction(REMOVE, (id) => id);
export const edit = createAction(EDIT, ({ id, text, done }) => ({
  id,
  text,
  done,
}));
export const initializeForm = createAction(INITIALIZE_FORM, (form) => form);

export const readDB = createAction(READ_DB, (weeklygoallist) => weeklygoallist);

let today = new Date();
let dd = String(today.getDate()).padStart(2, "0");
let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
let yyyy = today.getFullYear();
today = yyyy + "-" + mm + "-" + dd;

const initialState = {
  input: {
    yyyyww: "",
    goal: "",
    timeToSpend: "",
    startRange: "",
    endRange: "",
    unit: "",
    memo: "",
  },
  weeklygoals: [
    {
      id: 0,
      text: {
        yyyyww: "",
        goal: "",
        timeToSpend: "",
        startRange: "",
        endRange: "",
        unit: "",
        memo: "",
      },
      done: 0,
    },
  ],
};

const addWGoal = (addedWGoal) => {
  const url = "/api/addUserWGoal/";
  const formData = {
    yyyyww: addedWGoal.weeklygoal.text.yyyyww,
    goal: addedWGoal.weeklygoal.text.goal,
    timeToSpend: addedWGoal.weeklygoal.text.timeToSpend,
    startRange: addedWGoal.weeklygoal.text.startRange,
    endRange: addedWGoal.weeklygoal.text.endRange,
    unit: addedWGoal.weeklygoal.text.unit,
    memo: addedWGoal.weeklygoal.text.memo,
  };
  console.log(formData);
  const config = {
    headers: {
      "content-type": "application/json",
    },
  };
  // console.log(formData);
  return post(url, formData, config);
};

const deleteWGoal = (id) => {
  const url = "/api/deleteWGoal/" + id;
  fetch(url, {
    method: "DELETE",
  });
};

const editWGoal = (id, editedWGoal) => {
  const url = "/api/editUserWGoal/" + id;
  const formData = {
    yyyyww: editedWGoal.yyyyww,
    goal: editedWGoal.goal,
    timeToSpend: editedWGoal.timeToSpend,
    startRange: editedWGoal.startRange,
    endRange: editedWGoal.endRange,
    unit: editedWGoal.unit,
    memo: editedWGoal.memo,
  };
  console.log(formData);
  const config = {
    headers: {
      "content-type": "application/json",
    },
  };
  // console.log(formData);
  return post(url, formData, config);
};

const weeklygoals = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value;
      }),
    [INITIATE_EDIT_FIELD]: (state, { payload: { form, value } }) =>
      produce(state, (draft) => {
        draft[form] = value;
      }),
    [INSERT]: (state, { payload: item }) =>
      produce(state, (draft) => {
        addWGoal(item);
        draft.weeklygoals.push(item.weeklygoal);
      }),
    [TOGGLE]: (state, { payload: id }) =>
      produce(state, (draft) => {
        const item = draft.weeklygoals.find((item) => item.id === id);
        item.done = !item.done;
      }),
    [REMOVE]: (state, { payload: id }) =>
      produce(state, (draft) => {
        deleteWGoal(id);
        const index = draft.weeklygoals.findIndex((item) => item.id === id);
        draft.weeklygoals.splice(index, 1);
      }),
    [EDIT]: (state, { payload: { id, text, done } }) =>
      produce(state, (draft) => {
        editWGoal(id, text);
        const index = draft.weeklygoals.findIndex((item) => item.id === id);
        draft.weeklygoals.splice(index, 1, { id, text, done });
      }),
    [INITIALIZE_FORM]: (state, { payload: { form } }) =>
      produce(state, (draft) => {
        if (form === "input") {
          draft[form] = initialState.input;
        } else if ((form = "weeklygoals")) {
          draft[form] = initialState.weeklygoals;
        }
      }),
    [READ_DB]: (state, { payload: weeklygoallist }) =>
      produce(state, (draft) => {
        for (var i = 0; i < weeklygoallist.length; i++) {
          if (weeklygoallist[i].isdeleted === 0) {
            let tempItem = {};
            tempItem = {
              id: weeklygoallist[i].id,
              text: {
                yyyyww: weeklygoallist[i].yyyyww,
                goal: weeklygoallist[i].goal,
                timeToSpend: weeklygoallist[i].timeToSpend,
                startRange: weeklygoallist[i].startRange,
                endRange: weeklygoallist[i].endRange,
                unit: weeklygoallist[i].unit,
                memo: weeklygoallist[i].memo,
              },
              done: weeklygoallist[i].isdone,
            };
            // console.log(tempItem);
            draft.weeklygoals.push(tempItem);
          }
        }
      }),
  },
  initialState
);

export default weeklygoals;
