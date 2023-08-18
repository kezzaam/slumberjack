import React from 'react'
import Button from './Button'

// NOTE - if using more than once, change this to be more reusable with props
export default function Pagination({ handlePrevious, handleNext }) {

    return (
        <div className="flex flex-row items-center justify-between space-x-20 pt-10">
            <Button onClick={handlePrevious}>Previous</Button>
            <Button onClick={handleNext}>Next</Button>
        </div>
    )
}
