"use client";
import React from "react";
import { Button, Modal, Select } from "flowbite-react";
import { AiOutlineCloseCircle, AiOutlinePlusCircle } from "react-icons/ai";

import FormEdit from "./FormEdit";
import Image from "next/image";
import { BASE_URL } from "@/app/api/BaseAPI";

export default function EditTTRForm({ id }) {
  const [openModal, setOpenModal] = React.useState(undefined);
  const [modalSize, setModalSize] = React.useState("6xl");
  const props = { modalSize, openModal, setModalSize, setOpenModal };

  const loadTutorialById = (id) => {
    let requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch(`${BASE_URL}tutorials/${id}`, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  const handleOpenModal = () => {

    loadTutorialById(id);
    props.setOpenModal("size");
	
  };
  return (
    <>
      <button
        onClick={handleOpenModal}
        className="rounded-main p-2.5  text-white  "
      >
        <Image
          src={"/assets/icons/edit.svg"}
          width={23}
          height={23}
          alt="edit icon"
          className="dark:invert"
        />
      </button>
      <Modal
        show={props.openModal === "size"}
        size={props.modalSize}
        onClose={() => props.setOpenModal(undefined)}
      >
        <button
          className="absolute top-2 right-2 bg-gray-300 rounded-full p-1"
          onClick={() => props.setOpenModal(undefined)}
        >
          <AiOutlineCloseCircle className="text-3xl" />
        </button>

        <Modal.Body>
          <FormEdit id={id} closeModal={() => props.setOpenModal(undefined)} />
        </Modal.Body>
      </Modal>
    </>
  );
}
