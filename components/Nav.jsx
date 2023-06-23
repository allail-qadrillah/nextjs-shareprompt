"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders } from "next-auth/react"


const Nav = () => {
  const { data:session } = useSession()
  const [provider, setProviders] = useState(null)
  const [ToggleDropdown, setToggleDropdown] = useState(false)

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders()

      setProviders(response)
    }

    setUpProviders()
  }, [])


  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="./assets/images/logo.svg"
          alt="Promptopia Logo"
          width={30}
          height={30}
          className="cursor-pointer"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt"  className="black_btn" >
              Create Post
            </Link>

            <button type="button" className="outline_btn" onClick={signOut}>
              Sign Out</button>

            <Link href='/profile'>
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {provider &&
              Object.values(provider).map((provider) => (
                <button
                  type="button"
                  key={provider.key}
                  onClick={() => signIn(provider.id)}
                  className="black_btn">
                  SignIn</button>
              )
              )
            }
          </>
        )}
      </div>
      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {ToggleDropdown && (
              <div className="dropdown">
                <Link
                  href='/profile'
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}>
                My Profile
                </Link>

                <Link
                  href='/create-prompt'
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}>
                Create Prompt
                </Link>

                <button
                type="button"
                onClick={() => {
                  setToggleDropdown(false)
                  signOut()
                }}
                className="black_btn w-full mt-5"
                >SignOut</button>
              </div>
            )}
          </div>
        ) : (
          <>
            {provider &&
              Object.values(provider).map((provider) => (
                <button
                  type="button"
                  key={provider.key}
                  onClick={() => signIn(provider.id)}
                  className="black_btn">
                  SignIn</button>
              )
              )
            }
          </>
        )}
      </div>

    </nav>
  )
}

export default Nav