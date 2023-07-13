import PromptCard from "./PromptCard"

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      {data && data.length > 0 ?
        <div className="mt-10 prompt_layout">
          {data.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleTagEdit={() => handleEdit && handleEdit(post)}
              handleTagDelete={() => handleDelete && handleDelete(post)}
            />
          ))}
        </div>
        : <h1>not have data yet. you must login</h1>
      }
    </section>
  )
}

export default Profile