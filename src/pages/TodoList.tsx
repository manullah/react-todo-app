import {
  ChevronLeftIcon,
  PencilIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useActivityGroupHelper } from "../utils/activityGroupHelper";
import OutsideClickHandler from "react-outside-click-handler";
import { useTodoListHelper } from "../utils/todoListHelper";
import AddTodoModal from "../components/Modals/AddTodoModal";
import TodoCard from "../components/cards/TodoCard";
import { AlertContext } from "../App";
import SortingButton from "../components/buttons/SortingButton";

const TodoListPage = () => {
  const { setAlert } = useContext(AlertContext);

  const navigate = useNavigate();
  const params = useParams();
  const id = params.id as string;

  const {
    activityDetail,
    getDetail,
    handleEdit: handleActivityEdit,
  } = useActivityGroupHelper();
  const {
    isLoading,
    todoList,
    getList,
    handleCreate,
    handleDelete,
    handleEdit: handleTodoEdit,
    doSorting,
  } = useTodoListHelper();

  useEffect(() => {
    getDetail(id);
    getList(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [stateEditActivity, setStateEditActivity] = useState({
    toggle: false,
    title: "",
  });
  const editActivity = () => {
    setStateEditActivity((prev) => ({
      toggle: !prev.toggle,
      title: activityDetail?.title || "",
    }));

    if (stateEditActivity.toggle) {
      console.log("masu ");
      handleActivityEdit(id, stateEditActivity.title);
    }
  };

  const listComponent = () => {
    if (isLoading.list) {
      return <div>Loading...</div>;
    }

    if (todoList?.data.length) {
      return (
        <div className="grid gap-4">
          {todoList?.data.map((todo, index) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              handleUpdate={(data) => {
                handleTodoEdit(todo.id, data);
              }}
              handleDelete={async (id) => {
                await handleDelete(id, todo.activity_group_id);
                setAlert({
                  show: true,
                  text: <p>Todo berhasil dihapus</p>,
                });
              }}
            />
          ))}
        </div>
      );
    }

    return (
      <img
        data-cy="todo-empty-state"
        src="/assets/todo-empty-state.svg"
        alt="empty"
        className="mx-auto my-4"
      />
    );
  };

  return (
    <>
      <div className="my-12 flex justify-between items-center">
        <div className="flex items-center">
          <ChevronLeftIcon
            data-cy="todo-back-button"
            className="h-6 w-6 mr-8 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          {stateEditActivity.toggle ? (
            <OutsideClickHandler onOutsideClick={editActivity}>
              <input
                type="text"
                value={stateEditActivity.title}
                className="text-4xl font-bold bg-transparent border-b border-b-gray-700 max-w-fit min-w-fit focus:outline-none"
                onChange={(value) => {
                  setStateEditActivity((prev) => ({
                    ...prev,
                    title: value.target.value,
                  }));
                }}
              />
            </OutsideClickHandler>
          ) : (
            <h1
              className="text-4xl font-bold cursor-pointer"
              data-cy="todo-title"
              onClick={editActivity}
            >
              {activityDetail?.title}
            </h1>
          )}
          <PencilIcon
            data-cy="todo-title-edit-button"
            className="h-6 w-6 ml-4 cursor-pointer"
            onClick={editActivity}
          />
        </div>

        <div className="flex items-center gap-4">
          <SortingButton onSort={(sort) => doSorting(sort)} />
          <AddTodoModal
            button={
              <button data-cy="todo-add-button" className="btn-primary">
                <PlusIcon className="h-6 w-6 mr-2" />
                Tambah
              </button>
            }
            onConfirm={(data) =>
              handleCreate({
                ...data,
                activity_group_id: id as unknown as string,
              })
            }
          />
        </div>
      </div>

      {listComponent()}
    </>
  );
};

export default TodoListPage;
