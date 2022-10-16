import { PlusIcon } from "@heroicons/react/24/outline";
import { useContext, useEffect } from "react";
import { AlertContext } from "../App";
import TodoCard from "../components/cards/ActivityCard";
import { useActivityGroupHelper } from "../utils/activityGroupHelper";

const ActivityGroupPage = () => {
  const { setAlert } = useContext(AlertContext);

  const { isLoading, activityList, getList, handleCreate, handleDelete } =
    useActivityGroupHelper();

  useEffect(() => {
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const listComponent = () => {
    if (isLoading.list) {
      return <div>Loading...</div>;
    }

    if (activityList?.data.length) {
      return (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {activityList?.data.map((item, index) => (
            <TodoCard
              key={index}
              activity={item}
              handleDelete={async (id) => {
                await handleDelete(id);
                setAlert({
                  show: true,
                  text: <p>Activity berhasil dihapus</p>,
                });
              }}
            />
          ))}
        </div>
      );
    }

    return (
      <img
        data-cy="activity-empty-state"
        src="/assets/activity-empty-state.svg"
        alt="empty"
        className="mx-auto my-4"
      />
    );
  };

  return (
    <>
      <div className="my-12 flex justify-between items-center">
        <h1 data-cy="activity-title" className="text-4xl font-bold">
          Activity
        </h1>
        <button
          data-cy="activity-add-button"
          className="btn-primary"
          onClick={handleCreate}
        >
          <PlusIcon className="h-6 w-6 mr-2" />
          Tambah
        </button>
      </div>

      {listComponent()}
    </>
  );
};

export default ActivityGroupPage;
