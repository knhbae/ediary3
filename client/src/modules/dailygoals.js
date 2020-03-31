import { createAction, handleActions } from "redux-actions";
import produce from "immer";

const CHANGE_FIELD = "dailygoals/CHANGE_FIELD"; // 인풋 값을 변경함
const INSERT = "dailygoals/INSERT"; // 새로운 item 를 등록함
const TOGGLE = "dailygoals/TOGGLE"; // item 를 체크/체크해제 함
const REMOVE = "dailygoals/REMOVE"; // item 를 제거함
const EDIT = "dailygoals/EDIT"; // item을 수정함
const INITIALIZE_FORM = "dailygoals/INITIALIZE_FORM"; // 인풋을 초기화함
const INITIATE_EDIT_FIELD = "dailygoals/INITIATE_EDIT_FIELD"; // Edit Input을 초기화함

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
  dailyinput: {
    date: today,
    goal: "",
    timeToSpend: "",
    startRange: "",
    endRange: "",
    emotion: "",
    memo: ""
  },
  dailygoals: [
    {
      id: 1,
      text: {
        date: "2020-03-22",
        goal: "독서",
        timeToSpend: "1",
        startRange: "1",
        endRange: "2",
        emotion: "#행복",
        memo: "aaa"
      },
      done: false
    },
    {
      id: 2,
      text: {
        date: "2020-03-22",
        goal: "영어",
        timeToSpend: "10",
        startRange: "1",
        endRange: "2",
        emotion: "#행복",
        memo: "aaa"
      },
      done: false
    },
    {
      id: 3,
      text: {
        date: "2020-03-23",
        goal: "독서",
        timeToSpend: "2",
        startRange: "1",
        endRange: "2",
        emotion: "#행복",
        memo: "aaa"
      },
      done: false
    },
    {
      id: 4,
      text: {
        date: "2020-03-24",
        goal: "운동",
        timeToSpend: "10",
        startRange: "1",
        endRange: "2",
        emotion: "#우울",
        memo: "aaa"
      },
      done: false
    },
    {
      id: 5,
      text: {
        date: "2020-03-24",
        goal: "영어",
        timeToSpend: "2",
        startRange: "1",
        endRange: "2",
        emotion: "#화남",
        memo: "aaa"
      },
      done: false
    },
    {
      id: 6,
      text: {
        date: "2020-03-24",
        goal: "수학",
        timeToSpend: "2",
        startRange: "1",
        endRange: "2",
        emotion: "#기쁨",
        memo: "aaa"
      },
      done: false
    }
  ]
};

const dailygoals = handleActions(
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
        draft.dailygoals.push(item);
      }),
    [TOGGLE]: (state, { payload: id }) =>
      produce(state, draft => {
        const item = draft.dailygoals.find(item => item.id === id);
        item.done = !item.done;
      }),
    [REMOVE]: (state, { payload: id }) =>
      produce(state, draft => {
        const index = draft.dailygoals.findIndex(item => item.id === id);
        draft.dailygoals.splice(index, 1);
      }),
    [EDIT]: (state, { payload: { id, text, done } }) =>
      produce(state, draft => {
        const index = draft.dailygoals.findIndex(item => item.id === id);
        draft.dailygoals.splice(index, 1, { id, text, done });
      }),
    [INITIALIZE_FORM]: (state, { payload: { form } }) =>
      produce(state, draft => {
        draft[form] = initialState.dailyinput;
      })
  },
  initialState
);

export default dailygoals;
