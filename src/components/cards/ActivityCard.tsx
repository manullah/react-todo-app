import moment from "moment";
import { Link } from "react-router-dom";
import { TActivity } from "../../services/entities/activityGroupEntities";
import DeleteModal from "../Modals/DeleteModal";

type ActivityCardProps = {
  activity: TActivity;
  handleDelete: (id: string) => void;
};

const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  handleDelete,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-8">
      <Link to={`/detail/${activity.id}`}>
        <h4 className="text-xl font-bold mb-4">{activity.title}</h4>
      </Link>
      <div className="flex justify-between text-gray-400">
        <p>{moment(activity.created_at).format("DD MMMM YYYY")}</p>
        <DeleteModal
          title={
            <p>
              Apakah anda yakin menghapus activity{" "}
              <strong>“{activity.title}</strong>?
            </p>
          }
          onConfirm={() => handleDelete(activity.id)}
        ></DeleteModal>
      </div>
    </div>
  );
};

export default ActivityCard;
