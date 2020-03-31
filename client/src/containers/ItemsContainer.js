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
} from "../modules/items";
import Items from "../components/Items";
import useActions from "../lib/useActions";

const ItemsContainer = () => {
  const { newItem, items } = useSelector(({ items }) => ({
    newItem: items.newItem,
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
    <Items
      newItem={newItem}
      items={items}
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

export default React.memo(ItemsContainer);
