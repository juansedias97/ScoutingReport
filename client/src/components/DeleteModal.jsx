import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { BsTrash } from "react-icons/bs";

const DeleteModal = ({ id, deleteRecord }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = () => {
    deleteRecord(id);
    handleClose();
  };
  return (
    <>
      <button onClick={handleShow} className="text-red-500">
        <BsTrash />
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        size="xl"
      >
        <div className="m-4">
          <div>
            <h1 className="text-2xl">Delete Scouting Report</h1>
          </div>
          <p className="mt-4">
            Are you sure you would like to delete the report?
          </p>
          <div className="flex gap-4 justify-end ">
            <button
              onClick={handleClose}
              className="hover:text-blue-700 hover:underline"
            >
              Cancel
            </button>
            <button
              className="py-2 px-4 rounded-full bg-red-500 text-white"
              onClick={() => handleDelete()}
            >
              Yes I am Sure
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default DeleteModal;
