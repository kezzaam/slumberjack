import React, { ReactNode } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'

interface AlertProps {
  children: ReactNode;
}

export default function Alert({ children }: AlertProps): JSX.Element {
  return (
    <div className="relative flex flex-col items-center justify-flex-end z-10 mt-10">
      <div className="absolute left-0 flex flex-row items-center justify-between space-x-6 bg-[--alabaster] border-l-4 border-[--morningblue] p-6 mx-4 -mb-3 shadow" role="alert">
        <FontAwesomeIcon icon={faTriangleExclamation as IconDefinition} className="text-4xl text-[--morningblue]" />
        <p className="font-bold">
          {children}
        </p>
      </div>
    </div>
  )
}
