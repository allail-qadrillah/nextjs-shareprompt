'use client'

import { useState, useEffect } from "react"
import PromptCard from "./PromptCard"
import { useRouter } from "next/navigation"

const PromptCardList = ({ data, handleTagClick, handleProfileClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          handleProfileClick={handleProfileClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])
  const router = useRouter()

  const handleSearchChange = (e) => {

  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json()

      setPosts(data)
    }
    fetchPosts()
  }, [])

  const handleprofileClick = (post) => {
    router.push(`/profile?id=${post.creator._id}`)
  }

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type="text"
          className='search_input peer'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
        />
      </form>
      <PromptCardList
        data={posts}
        handleTagClick={() => { }}
        handleProfileClick={handleprofileClick}
      />
    </section>
  )
}

export default Feed