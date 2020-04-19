import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { post } from "axios";

const CHANGE_FIELD = "actionItems/CHANGE_FIELD"; // 인풋 값을 변경함
const INSERT = "actionItems/INSERT"; // 새로운 item 를 등록함
const TOGGLE = "actionItems/TOGGLE"; // item 를 체크/체크해제 함
const REMOVE = "actionItems/REMOVE"; // item 를 제거함
const EDIT = "actionItems/EDIT"; // item을 수정함
const INITIALIZE_FORM = "actionItems/INITIALIZE_FORM"; // 인풋을 초기화함
const INITIATE_EDIT_FIELD = "actionItems/INITIATE_EDIT_FIELD"; // Edit newItem을 초기화함
const READ_DB = "actionItems/READ_DB"; // DB를 읽어옴

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
export const insert = createAction(INSERT, (item) => ({
  item,
}));

export const toggle = createAction(TOGGLE, (id) => id);
export const remove = createAction(REMOVE, (id) => id);
export const edit = createAction(EDIT, ({ id, text, done }) => ({
  id,
  text,
  done,
}));
export const initializeForm = createAction(INITIALIZE_FORM, (form) => form);

export const readDB = createAction(READ_DB, (itemlist) => itemlist);

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
    categoryTag: "",
  },
  items: [
    {
      id: 0,
      text: {
        goal: "",
        quantity: "",
        unit: "",
        startDate: "",
        endDate: "",
        period: "",
        desc: "",
        categoryTag: "",
      },
      done: true,
    },
  ],
};

const addItem = (addedItem) => {
  const url = "/api/addUserItem/";
  const formData = {
    goal: addedItem.text.goal,
    quantity: addedItem.text.quantity,
    unit: addedItem.text.unit,
    startDate: addedItem.text.startDate,
    endDate: addedItem.text.endDate,
    period: addedItem.text.period,
    desc: addedItem.text.desc,
    categoryTag: addedItem.text.categoryTag,
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

const deleteItem = (id) => {
  const url = "/api/deleteItem/" + id;
  fetch(url, {
    method: "DELETE",
  });
};

const editItem = (id, editedItem) => {
  const url = "/api/editUserItem/" + id;
  const formData = {
    goal: editedItem.goal,
    quantity: editedItem.quantity,
    unit: editedItem.unit,
    startDate: editedItem.startDate,
    endDate: editedItem.endDate,
    period: editedItem.period,
    desc: editedItem.desc,
    categoryTag: editedItem.categoryTag,
  };
  const config = {
    headers: {
      "content-type": "application/json",
    },
  };
  // console.log(formData);
  return post(url, formData, config);
};
const actionItems = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value;
      }),
    [INITIATE_EDIT_FIELD]: (state, { payload: { form, value } }) =>
      produce(state, (draft) => {
        draft[form] = value;
      }),
    [INSERT]: (state, { payload: { item } }) =>
      produce(state, (draft) => {
        // console.log(item);
        addItem(item);
        draft.items.push(item);
      }),
    [TOGGLE]: (state, { payload: id }) =>
      produce(state, (draft) => {
        const item = draft.items.find((item) => item.id === id);
        item.done = !item.done;
      }),
    [REMOVE]: (state, { payload: id }) =>
      produce(state, (draft) => {
        deleteItem(id);
        const index = draft.items.findIndex((item) => item.id === id);
        draft.items.splice(index, 1);
      }),
    [EDIT]: (state, { payload: { id, text, done } }) =>
      produce(state, (draft) => {
        editItem(id, text);
        const index = draft.items.findIndex((item) => item.id === id);
        draft.items.splice(index, 1, { id, text, done });
      }),
    [INITIALIZE_FORM]: (state, { payload: { form } }) =>
      produce(state, (draft) => {
        if (form === "newItem") {
          draft[form] = initialState.newItem;
        } else if ((form = "items")) {
          draft[form] = initialState.items;
        }
      }),
    [READ_DB]: (state, { payload: itemlist }) =>
      produce(state, (draft) => {
        for (var i = 0; i < itemlist.length; i++) {
          if (itemlist[i].isdeleted === 0) {
            let tempItem = {};
            tempItem = {
              id: itemlist[i].id,
              text: {
                goal: itemlist[i].goal,
                quantity: itemlist[i].quantity,
                unit: itemlist[i].unit,
                startDate: itemlist[i].startDate,
                endDate: itemlist[i].endDate,
                period: itemlist[i].period,
                desc: itemlist[i].desciption,
                categoryTag: itemlist[i].categoryTag,
              },
              done: itemlist[i].isdone,
            };
            draft.items.push(tempItem);
          }
        }
      }),
  },
  initialState
);

export default actionItems;
