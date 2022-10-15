import { PencilIcon } from "@heroicons/react/24/outline";
import { priorityColors } from "../../config/colors";
import { IAddTodoForm, TTodo } from "../../services/entities/todoListEntities";
import AddTodoModal from "../Modals/AddTodoModal";
import DeleteModal from "../Modals/DeleteModal";

type TodoCardProps = {
  todo: TTodo;
  handleDelete: (id: string) => void;
  handleUpdate: (data: IAddTodoForm) => void;
};

const TodoCard: React.FC<TodoCardProps> = ({
  todo,
  handleDelete,
  handleUpdate,
}) => {
  const isChecked = !!!todo.is_active;

  return (
    <div className="bg-white shadow-lg rounded-xl p-8">
      <div className="flex justify-between">
        <div className="flex items-center gap-6">
          <div className="flex h-5 items-center">
            <input
              type="checkbox"
              checked={isChecked}
              className="h-6 w-6 rounded border-gray-300 text-primary focus:ring-inprimary"
              onChange={() =>
                handleUpdate({
                  activity_group_id: todo.activity_group_id,
                  is_active: isChecked ? 1 : 0,
                })
              }
            />
          </div>

          <span
            className="w-5 h-5 rounded-full"
            style={{ backgroundColor: priorityColors[todo.priority] }}
          ></span>

          <h4 className={`text-xl ${isChecked ? "line-through" : ""}`}>
            {todo.title}
          </h4>

          <AddTodoModal
            initialData={todo}
            button={<PencilIcon className="h-6 w-6 cursor-pointer" />}
            onConfirm={handleUpdate}
          />
        </div>

        <DeleteModal
          title={
            <p>
              Apakah anda yakin menghapus item <strong>“{todo.title}</strong>?
            </p>
          }
          onConfirm={() => handleDelete(todo.id)}
        />
      </div>
    </div>
  );
};

export default TodoCard;
