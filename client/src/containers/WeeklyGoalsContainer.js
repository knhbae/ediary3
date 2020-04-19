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
} from "../modules/weeklygoals";
import WeeklyGoals from "../components/WeeklyGoals";
import useActions from "../lib/useActions";

const WeeklyGoalsContainer = () => {
  const { input, weeklygoals } = useSelector(({ weeklygoals }) => ({
    input: weeklygoals.input,
    weeklygoals: weeklygoals.weeklygoals,
  }));

  const { items } = useSelector(({ items }) => ({
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
  const [wgoal, setWGoal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [maxWId, setMaxWId] = useState(0);

  useEffect(() => {
    const fetchWGoal = async () => {
      try {
        // 요청이 시작 할 때에는 error 와 cases 를 초기화하고
        setError(null);
        setWGoal(null);
        // loading 상태를 true 로 바꿉니다.
        setLoading(true);
        const response = await axios.get("/api/userWeeklyItems/");
        setWGoal(response.data); // 데이터는 response.data 안에 들어있습니다.
        const length = response.data.length;
        // console.log(response.data);
        setMaxWId(response.data[length - 1].id); // 데이터는 response.data 안에 들어있습니다.
        // console.log(response.data[length - 1].id);
        //화면이 바뀔때 마다, DB를 계속 추가해서 초기화를 시킴
        onInitializeForm({
          form: "weeklygoals",
        });
        onReadDB(response.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchWGoal();
  }, []);
  // onReadDB(cases);
  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!wgoal) return null;

  return (
    <WeeklyGoals
      maxWId={maxWId}
      items={items}
      input={input}
      weeklygoals={weeklygoals}
      onChangeField={onChangeField}
      onInsert={onInsert}
      onToggle={onToggle}
      onRemove={onRemove}
      onEdit={onEdit}
      onInitializeForm={onInitializeForm}
      onInitiateEditField={onInitiateEditField}
      onReadDB={onReadDB}
    />
  );
};

export default React.memo(WeeklyGoalsContainer);
