import React from "react";
import AddItems from "./subcomponents/AddItems";
import ShowItems from "./subcomponents/ShowItems";
// import Test2 from "./Test2";

const Items = ({
  maxId,
  newItem, // 인풋에 입력되는 객체
  items, // 할 일 목록이 들어있는 객체
  onChangeField,
  onInsert,
  onToggle,
  onRemove,
  onEdit,
  onInitializeForm,
  onInitiateEditField,
  onReadDB,
}) => {
  return (
    <div>
      <AddItems
        maxId={maxId}
        newItem={newItem}
        onInsert={onInsert}
        onChangeField={onChangeField}
        onInitializeForm={onInitializeForm}
      />
      <div>
        {items.map((item) =>
          item.id === 0 ? (
            ""
          ) : (
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
          )
        )}
      </div>
    </div>
  );
};

export default Items;
