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
} from "../modules/dailygoals";
import DailyGoals from "../components/DailyGoals";
import useActions from "../lib/useActions";

const DailyGoalsContainer = () => {
  const { dailyinput, dailygoals } = useSelector(({ dailygoals }) => ({
    dailyinput: dailygoals.dailyinput,
    dailygoals: dailygoals.dailygoals
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
    <DailyGoals
      items={items}
      dailyinput={dailyinput}
      dailygoals={dailygoals}
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

export default React.memo(DailyGoalsContainer);
