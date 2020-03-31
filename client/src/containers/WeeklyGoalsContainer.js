import React from "react";
import { useSelector } from "react-redux";
import {
  changeField,
  insert,
  toggle,
  remove,
  edit,
  initializeForm,
  initiateEditField
} from "../modules/weeklygoals";
import WeeklyGoals from "../components/WeeklyGoals";
import useActions from "../lib/useActions";

const WeeklyGoalsContainer = () => {
  const { input, weeklygoals } = useSelector(({ weeklygoals }) => ({
    input: weeklygoals.input,
    weeklygoals: weeklygoals.weeklygoals
  }));

  const { items } = useSelector(({ items }) => ({
    items: items.items
  }));

  const [
    onChangeField,
    onInsert,
    onToggle,
    onRemove,
    onEdit,
    onInitializeForm,
    onInitiateEditField
  ] = useActions(
    [
      changeField,
      insert,
      toggle,
      remove,
      edit,
      initializeForm,
      initiateEditField
    ],
    []
  );

  return (
    <WeeklyGoals
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
    />
  );
};

export default React.memo(WeeklyGoalsContainer);
