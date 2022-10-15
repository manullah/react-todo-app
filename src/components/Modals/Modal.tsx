import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

type ModalProps = {
  children: React.ReactNode;
  button: React.ReactNode;
  header?: {
    hide?: boolean;
    text?: string;
  };
  buttonOk?: {
    text?: string;
    class?: string;
    disabled?: boolean;
  };
  onConfirm: () => void;
  onOpen?: () => void;
};

const Modal: React.FC<ModalProps> = ({
  children,
  button,
  header = { hide: false, text: "" },
  buttonOk,
  onConfirm,
  onOpen,
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      onOpen && onOpen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <>
      <div onClick={() => setOpen((prev) => !prev)}>{button}</div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                  {!header.hide && (
                    <div className="px-4 pt-5 sm:p-6 border-b flex justify-between">
                      <h5 className="font-semibold">{header.text}</h5>
                      <div
                        className="cursor-pointer"
                        onClick={() => setOpen(false)}
                      >
                        <span className="sr-only">Close</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </div>
                    </div>
                  )}

                  <div className="px-4 pt-5 pb-4 sm:p-6 flex flex-col gap-8">
                    {children}

                    <div className="sm:flex sm:flex-row-reverse justify-center gap-4">
                      <button
                        type="button"
                        className={buttonOk?.class || "btn-primary"}
                        disabled={buttonOk?.disabled}
                        onClick={() => {
                          onConfirm();
                          setOpen(false);
                        }}
                      >
                        {buttonOk?.text || "Simpan"}
                      </button>
                      <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => setOpen(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default Modal;
