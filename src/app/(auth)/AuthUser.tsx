import { onAuthStateChanged, signOut } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { auth } from '../../firebase'

export default function AuthUser() {
    const [authUser, setAuthUser] = useState(null)

    useEffect(() => {
        const listen =onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user)
            } else {
                setAuthUser(null)
            }
        })

        return () => {
            listen()
        }

    }, [])

    const userSignOut = () => {
        signOut(auth).then(() => {
            console.log('sign out successful')
        }).catch(error => console.log(error))

    }


  return (
    <div className="flex flex-col items-center text-xs">
        { 
        authUser ? 
        <>
        <p>{`Signed In as ${authUser.email}`}</p>
        <button className="text-[--englishlavender]" onClick={userSignOut}>Sign Out</button>
        </> : 
        <p>Signed Out</p>
        }
    </div>
  )
}
