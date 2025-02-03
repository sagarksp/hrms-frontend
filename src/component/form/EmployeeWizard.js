'use client';
import React from 'react'
import RenderSteps from "./RenderSteps"


export const EmployeeWizard = () => {
  return (
   

    <div className="flex w-full items-start gap-x-6">

        <div className="flex  flex-1 flex-col">
            <h1 className="mb-14 text-xl  font-medium text-richblack-5">
                  Joining form
            </h1>
            <div className="flex-1">
            <RenderSteps/>
            </div>
        </div>

    </div>
  )
}
