import React from "react";
import AddItems from "./subcomponents/AddItems";
// import EditItems from "./HandleItems/EditItems";
import ShowItems from "./subcomponents/ShowItems";
// import DeleteItems from "./HandleItems/DeleteItems";
// import Grid from "@material-ui/core/Grid";

const Items = ({
  newItem, // 인풋에 입력되는 객체
  items, // 할 일 목록이 들어있는 객체
  onChangeField,
  onInsert,
  onToggle,
  onRemove,
  onEdit,
  onInitializeForm,
  onInitiateEditField
}) => {
  return (
    <div>
      <AddItems
        newItem={newItem}
        onInsert={onInsert}
        onChangeField={onChangeField}
        onInitializeForm={onInitializeForm}
      />
      <div>
        {items.map(item => (
          <div key={item.id}>
            <ShowItems
              item={item}
              onRemove={onRemove}
              newItem={newItem}
              onEdit={onEdit}
              onChangeField={onChangeField}
              onInitializeForm={onInitializeForm}
              onInitiateEditField={onInitiateEditField}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Items;
