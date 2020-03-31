import { createAction, handleActions } from "redux-actions";
import produce from "immer";

const CHANGE_FIELD = "items/CHANGE_FIELD"; // 인풋 값을 변경함
const INSERT = "items/INSERT"; // 새로운 item 를 등록함
const TOGGLE = "items/TOGGLE"; // item 를 체크/체크해제 함
const REMOVE = "items/REMOVE"; // item 를 제거함
const EDIT = "items/EDIT"; // item을 수정함
const INITIALIZE_FORM = "items/INITIALIZE_FORM"; // 인풋을 초기화함
const INITIATE_EDIT_FIELD = "items/INITIATE_EDIT_FIELD"; // Edit newItem을 초기화함

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

let id = 4; // insert 가 호출 될 때마다 1씩 더해집니다.
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
  newItem: {
    goal: "",
    quantity: "",
    unit: "",
    startDate: today,
    endDate: today,
    period: "",
    desc: "",
    categoryTag: ""
  },
  items: [
    {
      id: 1,
      text: {
        goal: "뇌와 과학",
        quantity: "459",
        unit: "pages",
        startDate: "2020-01-01",
        endDate: "2020-04-01",
        period: "91",
        desc: "재밌는 뇌과학 책",
        categoryTag: "#뇌과학 #심리학 #마케팅"
      },
      done: true
    },
    {
      id: 2,
      text: {
        goal: "영어회화",
        quantity: "300",
        unit: "Hrs",
        startDate: "2020-01-01",
        endDate: "2020-12-31",
        period: "365",
        desc: "가벼운 Talk가 가능한 수준",
        categoryTag: "#영어 #영어회화 #미드"
      },
      done: false
    },
    {
      id: 3,
      text: {
        goal: "2020운동",
        quantity: "100",
        unit: "Hrs",
        startDate: "2020-01-01",
        endDate: "2020-12-31",
        period: "365",
        desc: "2020년 동안 열심히 운동",
        categoryTag: "#운동"
      },
      done: false
    }
  ]
};

const items = handleActions(
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
        draft.items.push(item);
      }),
    [TOGGLE]: (state, { payload: id }) =>
      produce(state, draft => {
        const item = draft.items.find(item => item.id === id);
        item.done = !item.done;
      }),
    [REMOVE]: (state, { payload: id }) =>
      produce(state, draft => {
        const index = draft.items.findIndex(item => item.id === id);
        draft.items.splice(index, 1);
      }),
    [EDIT]: (state, { payload: { id, text, done } }) =>
      produce(state, draft => {
        const index = draft.items.findIndex(item => item.id === id);
        draft.items.splice(index, 1, { id, text, done });
      }),
    [INITIALIZE_FORM]: (state, { payload: { form } }) =>
      produce(state, draft => {
        draft[form] = initialState.newItem;
      })
  },
  initialState
);

export default items;
