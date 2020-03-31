import { createAction, handleActions } from "redux-actions";
// import React from "react";
import produce from "immer";

const CHANGE_FIELD = "weeklygoals/CHANGE_FIELD"; // 인풋 값을 변경함
const INSERT = "weeklygoals/INSERT"; // 새로운 item 를 등록함
const TOGGLE = "weeklygoals/TOGGLE"; // item 를 체크/체크해제 함
const REMOVE = "weeklygoals/REMOVE"; // item 를 제거함
const EDIT = "weeklygoals/EDIT"; // item을 수정함
const INITIALIZE_FORM = "weeklygoals/INITIALIZE_FORM"; // 인풋을 초기화함
const INITIATE_EDIT_FIELD = "weeklygoals/INITIATE_EDIT_FIELD"; // Edit Input을 초기화함

export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form,
    key,
    value
  })
);
export const initiateEditField = createAction(
  INITIATE_EDIT_FIELD,
  ({ form, value }) => ({
    form,
    value
  })
);

let id = 7; // insert 가 호출 될 때마다 1씩 더해집니다.
export const insert = createAction(INSERT, text => ({
  id: id++,
  text,
  done: false
}));

export const toggle = createAction(TOGGLE, id => id);
export const remove = createAction(REMOVE, id => id);
export const edit = createAction(EDIT, ({ id, text, done }) => ({
  id,
  text,
  done
}));
export const initializeForm = createAction(INITIALIZE_FORM, form => form);

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
    memo: ""
  },
  weeklygoals: [
    {
      id: 1,
      text: {
        yyyyww: "2020-11",
        goal: "독서",
        timeToSpend: "10",
        startRange: "1",
        endRange: "2",
        memo: "aaa"
      },
      done: false
    },
    {
      id: 2,
      text: {
        yyyyww: "2020-11",
        goal: "영어",
        timeToSpend: "10",
        startRange: "1",
        endRange: "2",
        memo: "aaa"
      },
      done: false
    },
    {
      id: 3,
      text: {
        yyyyww: "2020-12",
        goal: "독서",
        timeToSpend: "10",
        startRange: "1",
        endRange: "2",
        memo: "aaa"
      },
      done: false
    },
    {
      id: 4,
      text: {
        yyyyww: "2020-12",
        goal: "운동",
        timeToSpend: "10",
        startRange: "1",
        endRange: "2",
        memo: "aaa"
      },
      done: false
    },
    {
      id: 5,
      text: {
        yyyyww: "2020-14",
        goal: "네트워킹",
        timeToSpend: "10",
        startRange: "1",
        endRange: "2",
        memo: "aaa"
      },
      done: false
    },
    {
      id: 6,
      text: {
        yyyyww: "2020-14",
        goal: "영어",
        timeToSpend: "10",
        startRange: "1",
        endRange: "2",
        memo: "aaa"
      },
      done: false
    }
  ]
};

const weeklygoals = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, draft => {
        draft[form][key] = value;
      }),
    [INITIATE_EDIT_FIELD]: (state, { payload: { form, value } }) =>
      produce(state, draft => {
        draft[form] = value;
      }),
    [INSERT]: (state, { payload: item }) =>
      produce(state, draft => {
        draft.weeklygoals.push(item);
      }),
    [TOGGLE]: (state, { payload: id }) =>
      produce(state, draft => {
        const item = draft.weeklygoals.find(item => item.id === id);
        item.done = !item.done;
      }),
    [REMOVE]: (state, { payload: id }) =>
      produce(state, draft => {
        const index = draft.weeklygoals.findIndex(item => item.id === id);
        draft.weeklygoals.splice(index, 1);
      }),
    [EDIT]: (state, { payload: { id, text, done } }) =>
      produce(state, draft => {
        const index = draft.weeklygoals.findIndex(item => item.id === id);
        draft.weeklygoals.splice(index, 1, { id, text, done });
      }),
    [INITIALIZE_FORM]: (state, { payload: { form } }) =>
      produce(state, draft => {
        draft[form] = initialState.input;
      })
  },
  initialState
);

export default weeklygoals;
