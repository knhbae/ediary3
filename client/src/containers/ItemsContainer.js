import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  changeField,
  insert,
  toggle,
  remove,
  edit,
  initializeForm,
  initiateEditField,
  readDB,
} from "../modules/items";
import Items from "../components/Items";
import useActions from "../lib/useActions";

const ItemsContainer = () => {
  const { newItem, items } = useSelector(({ items }) => ({
    newItem: items.newItem,
    items: items.items,
  }));

  const [
    onChangeField,
    onInsert,
    onToggle,
    onRemove,
    onEdit,
    onInitializeForm,
    onInitiateEditField,
    onReadDB,
  ] = useActions(
    [
      changeField,
      insert,
      toggle,
      remove,
      edit,
      initializeForm,
      initiateEditField,
      readDB,
    ],
    []
  );
  //DB 불러오기
  const [cases, setCases] = useState(null);
  const [maxId, setMaxId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchCases = async () => {
      try {
        // 요청이 시작 할 때에는 error 와 cases 를 초기화하고
        setError(null);
        setCases(null);
        // loading 상태를 true 로 바꿉니다.
        setLoading(true);
        const response = await axios.get("/api/userItems/");
        setCases(response.data); // 데이터는 response.data 안에 들어있습니다.
        const length = response.data.length;
        // console.log(length);
        // console.log(response.data[length - 1].id);
        setMaxId(response.data[length - 1].id); // 데이터는 response.data 안에 들어있습니다.
        //화면이 바뀔때 마다, DB를 계속 추가해서 초기화를 시킴
        onInitializeForm({
          form: "items",
        });
        onReadDB(response.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchCases();
  }, []);
  // onReadDB(cases);
  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!cases) return null;

  return (
    <div>
      <Items
        maxId={maxId}
        newItem={newItem}
        items={items}
        onChangeField={onChangeField}
        onInsert={onInsert}
        onToggle={onToggle}
        onRemove={onRemove}
        onEdit={onEdit}
        onInitializeForm={onInitializeForm}
        onInitiateEditField={onInitiateEditField}
        onReadDB={onReadDB}
      />
    </div>
  );
};

export default React.memo(ItemsContainer);
