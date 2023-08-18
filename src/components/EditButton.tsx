import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

interface EditButtonProps {
  onClick: () => void;
}

export default function EditButton({ onClick }: EditButtonProps) {
  return (
    <div
      className="fixed top-0 right-0 z-10 text-2xl py-12 px-6 text-[--alabaster] hover:text-[--pastelindigo] drop-shadow"
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faPenToSquare} />
    </div>
  );
}
