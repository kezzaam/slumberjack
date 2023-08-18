"use client"

import React, { useState, useEffect, useContext } from 'react'
import LogoHeader from './LogoHeader'
import Button from './Button'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faCirclePlus,
    faCloud,
    faChartSimple,
    faBrain,
    faGears,
} from "@fortawesome/free-solid-svg-icons"
import { DreamContext } from '@/context/DreamContext'
import { useRouter } from 'next/navigation'

export default function Welcome() {
  // context for changing background image based on user goal
  const { backgroundImage, userName } = useContext(DreamContext)

    // Set body's background image based on goal selection
    useEffect(() => {
      document.body.style.backgroundImage = `url(${backgroundImage})`;
  
      // Clean up the effect by removing the background image style when the component unmounts
      return () => {
        document.body.style.backgroundImage = '';
      };
    }, [backgroundImage]); 

  const router = useRouter()

    const handleGotIt = () => {
        router.push('/home')
    }

    return (
        <main className="flex min-h-screen min-w-screen items-center flex-col overlay">
            <LogoHeader />
            <div className="min-h-full flex-col flex items-center justify-center py-8 px-4 sm:px-4 lg:px-8">
                <div className="w-screen">
                    <div>
                        {/* Replace with user name */}
                        <h2 className="mt-6 text-3xl text-center font-bold">Welcome, {userName}!</h2>

                        <div className="m-10 p-8 flex flex-col rounded-md bg-[--heatherindigo]">
                            <h2 className="text-xl font-bold ">Get started towards</h2>
                            {/* Replace with user goal */}
                            <h3 className="text-xl font-bold ">Dream Recall</h3>
                            <p className="my-4 flex flex-row items-center space-x-4">
                                When you record a new dream, it gets stored in the dream log. Dream information is tracked over time so you can see important patterns at a glance.
                            </p>
                            <div className="my-4 flex flex-row items-center space-x-4 text-lg">
                                <FontAwesomeIcon icon={faCirclePlus} />
                                <h4>Record a new dream</h4>
                            </div>
                            <div className="my-4 flex flex-row items-center space-x-4 text-lg">
                                <FontAwesomeIcon icon={faCloud}/>
                                <h4>Dream log</h4>
                            </div>
                            <div className="my-4 flex flex-row items-center space-x-4 text-lg">
                                <FontAwesomeIcon icon={faChartSimple} />
                                <h4>Dream tracking</h4>
                            </div>
                            <div className="my-4 flex flex-row items-center space-x-4 text-lg">
                                <FontAwesomeIcon icon={faBrain} />
                                <h4>Dream interpretation</h4>
                            </div>
                            <div className="my-4 flex flex-row items-center space-x-4 text-lg">
                                <FontAwesomeIcon icon={faGears} />
                                <h4>Settings</h4>
                            </div>
                            <div className="my-4">
                                
                            </div>
                            <Button onClick={handleGotIt}>Got it, thanks!</Button>
                        </div>

                    </div>
                </div>

            </div>
        </main>
    )
}
