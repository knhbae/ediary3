import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { post } from "axios";
const CHANGE_FIELD = "dailygoals/CHANGE_FIELD"; // 인풋 값을 변경함
const INSERT = "dailygoals/INSERT"; // 새로운 item 를 등록함
const TOGGLE = "dailygoals/TOGGLE"; // item 를 체크/체크해제 함
const REMOVE = "dailygoals/REMOVE"; // item 를 제거함
const EDIT = "dailygoals/EDIT"; // item을 수정함
const INITIALIZE_FORM = "dailygoals/INITIALIZE_FORM"; // 인풋을 초기화함
const INITIATE_EDIT_FIELD = "dailygoals/INITIATE_EDIT_FIELD"; // Edit Input을 초기화함
const READ_DB = "dailygoals/READ_DB"; // DB를 읽어옴

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

export const insert = createAction(INSERT, (text) => ({
  text,
}));

export const toggle = createAction(TOGGLE, (id) => id);
export const remove = createAction(REMOVE, (id) => id);
export const edit = createAction(EDIT, ({ id, text, done }) => ({
  id,
  text,
  done,
}));
export const initializeForm = createAction(INITIALIZE_FORM, (form) => form);

export const readDB = createAction(READ_DB, (dailygoallist) => dailygoallist);

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
    memo: "",
  },
  dailygoals: [
    {
      id: 0,
      text: {
        date: "",
        goal: "",
        timeToSpend: "",
        startRange: "",
        endRange: "",
        emotion: "",
        memo: "",
      },
      done: 0,
    },
  ],
};

const addDGoal = (addedDGoal) => {
  const url = "/api/addUserDGoal/";
  // console.log(addedDGoal);
  const formData = {
    date: addedDGoal.text.date,
    goal: addedDGoal.text.goal,
    timeToSpend: addedDGoal.text.timeToSpend,
    startRange: addedDGoal.text.startRange,
    endRange: addedDGoal.text.endRange,
    emotion: addedDGoal.text.emotion,
    memo: addedDGoal.text.memo,
  };
  // console.log(formData);
  const config = {
    headers: {
      "content-type": "application/json",
    },
  };
  // console.log(formData);
  return post(url, formData, config);
};

const deleteDGoal = (id) => {
  const url = "/api/deleteDGoal/" + id;
  fetch(url, {
    method: "DELETE",
  });
};

const editDGoal = (id, editedDGoal) => {
  const url = "/api/editUserDGoal/" + id;
  const formData = {
    date: editedDGoal.date,
    goal: editedDGoal.goal,
    timeToSpend: editedDGoal.timeToSpend,
    startRange: editedDGoal.startRange,
    endRange: editedDGoal.endRange,
    emotion: editedDGoal.emotion,
    memo: editedDGoal.memo,
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

const dailygoals = handleActions(
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
        addDGoal(item.text);
        draft.dailygoals.push(item.text);
      }),
    [TOGGLE]: (state, { payload: id }) =>
      produce(state, (draft) => {
        const item = draft.dailygoals.find((item) => item.id === id);
        item.done = !item.done;
      }),
    [REMOVE]: (state, { payload: id }) =>
      produce(state, (draft) => {
        deleteDGoal(id);
        const index = draft.dailygoals.findIndex((item) => item.id === id);
        draft.dailygoals.splice(index, 1);
      }),
    [EDIT]: (state, { payload: { id, text, done } }) =>
      produce(state, (draft) => {
        editDGoal(id, text);
        const index = draft.dailygoals.findIndex((item) => item.id === id);
        draft.dailygoals.splice(index, 1, { id, text, done });
      }),
    [INITIALIZE_FORM]: (state, { payload: { form } }) =>
      produce(state, (draft) => {
        if (form === "dailyinput") {
          draft[form] = initialState.dailyinput;
        } else if ((form = "dailygoals")) {
          draft[form] = initialState.dailygoals;
        }
      }),
    [READ_DB]: (state, { payload: dailygoallist }) =>
      produce(state, (draft) => {
        // console.log(dailygoallist);
        for (var i = 0; i < dailygoallist.length; i++) {
          if (dailygoallist[i].isdeleted === 0) {
            let tempItem = {};
            tempItem = {
              id: dailygoallist[i].id,
              text: {
                date: dailygoallist[i].dodate,
                goal: dailygoallist[i].goal,
                timeToSpend: dailygoallist[i].timeToSpend,
                startRange: dailygoallist[i].startRange,
                endRange: dailygoallist[i].endRange,
                emotion: dailygoallist[i].emotion,
                memo: dailygoallist[i].memo,
              },
              done: dailygoallist[i].isdone,
            };
            // console.log(tempItem);
            draft.dailygoals.push(tempItem);
          }
        }
      }),
  },
  initialState
);

export default dailygoals;
