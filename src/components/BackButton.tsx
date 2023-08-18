import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

export default function BackButton() {
  return (
    <div className="fixed top-0 left-0 z-10 text-3xl py-12 px-6 text-[--alabaster] hover:text-[--pastelindigo] drop-shadow">
        <FontAwesomeIcon icon={faAngleLeft} />
    </div>
  )
}
