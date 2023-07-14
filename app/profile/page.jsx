'use client'

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"

import Profile from "@components/Profile"

function MyProfile() {
  const router = useRouter()
  const { data: session } = useSession()
  const [Posts, setPosts] = useState([])
  const searchParams = useSearchParams()
  const pathName = usePathname()

  const userId = searchParams.get('id')
  // apakah id session dengan id params sama?
  // true = user dapat edit dan delete
  // false = user hanya liat doang
  if (userId === session?.user.id || (!userId && pathName === '/profile')) {
    useEffect(() => {
      const fetchPosts = async () => {
        const response = await fetch(`/api/users/${session?.user.id}/posts`)
        const data = await response.json()
        setPosts(data)
      }
      if (session?.user.id) fetchPosts()
    }, [session])

  } else {
    useEffect(() => {
      const fetchPosts = async () => {
        const response = await fetch(`/api/users/${userId}/posts`)
        const data = await response.json()
        setPosts(data)
      }
      if (session?.user.id) fetchPosts()

    }, [session])
  }

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  }
  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure want to delete this prompt?")

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE'
        })

        const filteredPost = Posts.filter((p) => p._id !== post._id)
        setPosts(filteredPost)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile MyProfile"
      data={Posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile
