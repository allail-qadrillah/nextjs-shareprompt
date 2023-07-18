'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from "next/navigation";

import Form from '@components/Form'

function EditPrompt() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const promptId = searchParams.get('id')

  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    title: '',
    prompt: '',
    tag: '',
  })

  useEffect(() => {
    const getPromptDeatils = async () => {
      const response = await fetch(`api/prompt/${promptId}`)
      const data = await response.json()

      setPost({
        title: data.title,
        prompt: data.prompt,
        tag: data.tag
      })
    }
    
    if(promptId) getPromptDeatils()
  }, [promptId])


  const updatePrompt = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    if (!promptId) return alert("Prompt id not found!")

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          title: post.title,
          prompt: post.prompt,
          tag: post.tag
        })
      })

      if (response.ok) {
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }

  }

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  )
}

export default EditPrompt