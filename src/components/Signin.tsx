import React, { useState } from 'react'
import LogoHeader from '@/components/LogoHeader'
import Button from '@/components/Button'
import ButtonReverse from '@/components/ButtonReverse'
import Image from 'next/image'
import { auth } from '@/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import Link from 'next/link'
import AuthUser from '../app/(auth)/AuthUser'
import { useRouter } from 'next/navigation'


// sign-in functionality
export default function Signin(): JSX.Element {

    // Sign In state
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)

    const router = useRouter()

    // Handles the sign-in form submission.   
    const handleSignIn = (e) => {
      e.preventDefault()
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential)
          const user = userCredential.user
          if (user) {
            router.push('/home') // Navigate to the home page if a user is found
          }
        })
        .catch((error) => {
          if (error.code === 'auth/user-not-found') {
            setErrorMessage('User not found. Please check your email.')
          } else if (error.code === 'auth/wrong-password') {
            setErrorMessage('Invalid password. Please try again.')
          } else {
            setErrorMessage(error.message)
          }
        })
    }
    

    // Handles the sign-in with Google.
    const handleGoogleSignIn = () => {
        // Write sign in logic
    }

    // Handles the sign-in with Twitter.
    const handleTwitterSignIn = () => {
        // Write sign in logic
    }

    // Handles the sign-in with Facebook.
    const handleFacebookSignIn = () => {
        // Write sign in logic
    }

    return (
        <main className="flex min-h-screen items-center flex-col solid">
          <LogoHeader />
          <div className="min-h-full flex-col flex items-center justify-center py-8 px-4 sm:px-4 lg:px-8">
            <div className="max-w-md w-full space-y-8">
              <div>
                <h2 className="mt-6 text-center text-3xl font-bold">Sign in</h2>
                <p className="mt-2 text-center text-sm">
                  Or <Link href="/signup" className="font-medium">Create an account</Link>
                </p>
              </div>
            </div>
      
            <form className="mt-8 space-y-6" onSubmit={handleSignIn}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <span className="text-sm">
                    <label htmlFor="email">Email address</label> and <label htmlFor="password">password</label>:
                  </span>
                  <input
                    id="email"
                    type="email"
                    autoComplete="none"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[--pastelindigo] rounded-t-md focus:outline-[--pastelgrey] focus:ring-none focus:border-[--englishlavender] focus:z-10 sm:text-sm"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
      
                <div>
                  <input
                    id="password"
                    type="password"
                    autoComplete="none"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[--pastelindigo] rounded-b-md focus:outline-[--pastelgrey] focus:ring-none focus:border-[--englishlavender] focus:z-10 sm:text-sm"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              {errorMessage && <div className="text-[--pastelgrey]">{errorMessage}</div>}

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 rounded" />
                  <label className="ml-2 block text-sm">Remember me</label>
                </div>
      
                <div className="text-sm">
                  <a href="#" className="font-medium">Forgot password?</a>
                </div>
              </div>
      
              <div>
                <Button type="submit">Sign in</Button>
              </div>
      
              <div className="separator text-sm">
                Or continue with
              </div>
      
              <div className="flex space-x-2">
                <ButtonReverse onClick={handleGoogleSignIn}>
                  <Image src="/images/icons8-google-48.svg" alt="Google Icon" width={30} height={30} />
                </ButtonReverse>
      
                <ButtonReverse onClick={handleTwitterSignIn}>
                  <Image src="/images/icons8-twitter-48.svg" alt="Twitter Icon" width={30} height={30} />
                </ButtonReverse>
      
                <ButtonReverse onClick={handleFacebookSignIn}>
                  <Image src="/images/icons8-facebook-48.svg" alt="Facebook Icon" width={30} height={30} />
                </ButtonReverse>
              </div>
            </form>
          </div>
          {/* displays sign in state */}
          <AuthUser/>
        </main>
    )
}
