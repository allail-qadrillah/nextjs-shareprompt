import Link from 'next/link'

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text_left'>
        <span className='blue_gradient'>{type} Post</span>
      </h1>
      <p className='desc text-left max-w-md'>
        {type} and share amazing prompts with the world, and let your imagination run wild wit any Al-powered platform.
      </p>

      <form
        onSubmit={handleSubmit}
        className='mt-4 w-full max-w-2xl flex flex-col gap-2 glassmorphism'
      >
      
        <label >
          <span className='font-satoshi font-semibold text-base text-gray-700'
          >Title {' '}
            {/* <span className='font-normal'>(#product #ai)</span> */}
          </span>
        </label>
        <input
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          placeholder='what is the use of your prompt?'
          required
          className='form_input'
        />
      
        <label >
          <span className='font-satoshi font-semibold text-base text-gray-700'
          >You AI Prompt</span>
        </label>
        <textarea 
          value={post.prompt}
          onChange={(e) => setPost({ ...post, prompt: e.target.value })}
          placeholder='Write your prompt here...'
          required
          className='form_textarea'
        />

        <label >
          <span className='font-satoshi font-semibold text-base text-gray-700'
          >Tag {' '}
            {/* <span className='font-normal'>(#product #ai)</span> */}
          </span>
        </label>
        <input 
          value={post.tag}
          onChange={(e) => setPost({ ...post, tag: e.target.value })}
          placeholder='What is your prompt about?'
          required
          className='form_input'
        />
        
        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/' className='text-gray-500 text-sm'>
            Cancel
          </Link>
          <button
          type='submit'
          disabled={submitting}
          className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          >
            {submitting ? `${type}...`: type}
          </button>
        </div>

      </form>

    </section>
  )
}

export default Form