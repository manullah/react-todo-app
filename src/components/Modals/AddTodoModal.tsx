import { useState } from "react";
import { IAddTodoForm, TTodo } from "../../services/entities/todoListEntities";
import { Priority } from "../../services/enum/todoListEnum";
import Input from "../Inputs/Input";
import Select from "../Inputs/Select";
import Modal from "./Modal";

const initialTodoState = () => ({
  activity_group_id: "",
  title: "",
  priority: "very-high",
});

type AddTodoModalProps = {
  initialData?: TTodo;
  button: React.ReactNode;
  onConfirm: (data: IAddTodoForm) => void;
};

const AddTodoModal: React.FC<AddTodoModalProps> = ({
  initialData,
  button,
  onConfirm,
}) => {
  const [addTodoState, setAddTodoState] = useState<{
    activity_group_id: string;
    title: string;
    priority: string;
  }>(initialTodoState());

  return (
    <Modal
      button={button}
      header={{ text: `${initialData ? "Ubah" : "Tambah"} List Item` }}
      buttonOk={{ disabled: !(addTodoState.title && addTodoState.priority) }}
      onConfirm={() => {
        onConfirm(addTodoState);
        setAddTodoState(initialTodoState());
      }}
      onOpen={() => {
        if (initialData) {
          setAddTodoState({
            activity_group_id: initialData.activity_group_id,
            title: initialData.title,
            priority: initialData.priority,
          });
        }
      }}
    >
      <div className="grid gap-6">
        <Input
          name="name"
          label="NAMA LIST ITEM"
          placeholder="Tambahkan Nama Activity"
          value={addTodoState.title}
          onChange={(value) =>
            setAddTodoState((prev) => ({ ...prev, title: value }))
          }
        />

        <Select
          name="priority"
          label="PRIORITY"
          value={addTodoState.priority}
          options={[
            { text: "Very High", value: Priority.VeryHigh },
            { text: "High", value: Priority.High },
            { text: "Medium", value: Priority.Medium },
            { text: "Low", value: Priority.Low },
            { text: "Very Low", value: Priority.VeryLow },
          ]}
          onChange={(value) =>
            setAddTodoState((prev) => ({ ...prev, priority: value }))
          }
        />
      </div>
    </Modal>
  );
};

export default AddTodoModal;