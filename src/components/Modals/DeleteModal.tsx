import { Dialog } from "@headlessui/react";
import {
  ExclamationTriangleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Modal from "./Modal";

type DeleteModalProps = {
  title: React.ReactNode;
  buttonCy?: string;
  onConfirm: () => void;
};

const DeleteModal: React.FC<DeleteModalProps> = ({
  title,
  buttonCy,
  onConfirm,
}) => {
  return (
    <Modal
      button={
        <TrashIcon data-cy={buttonCy} className="h-6 w-6 cursor-pointer" />
      }
      onConfirm={onConfirm}
      header={{ hide: true }}
      buttonOk={{ text: "Delete", class: "btn-danger" }}
      dataCy={{
        modal: "modal-delete",
        body: "todo-modal-delete",
        cancel: "modal-delete-cancel-button",
        confirm: "modal-delete-confirm-button",
      }}
    >
      <div>
        <ExclamationTriangleIcon
          data-cy="modal-delete-icon"
          className="h-24 w-24 text-red-600 mx-auto"
          aria-hidden="true"
        />
        <div className="mt-3 text-center sm:mt-5">
          <Dialog.Title
            data-cy="modal-delete-title"
            as="h3"
            className="text-lg font-medium leading-6 text-gray-900"
          >
            {title}
          </Dialog.Title>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
