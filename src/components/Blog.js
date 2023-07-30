import { useState } from "react";

const Blog = ({blog}) => (
  <div>
    {blog.title} {blog.author}
  </div>  
);

const AddBlogForm = ({ createBlog }) => {
  const blogDefault = {
    title: "",
    url: "",
    author: "",
    likes: 0
  };
  const [blog, setBlog] = useState(blogDefault);
  const inputFields = ["author", "title", "url"];
  const handleInputChange = (field, value) => {
    setBlog({ ...blog, [field]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createBlog(blog);
    setBlog(blogDefault);
  };

  return (
    <>
      <h2>Add new blog</h2>
      <form onSubmit={handleSubmit}>
        {
          inputFields.map(
            (field) => (
              <div key={field}>
                {field}
                <input
                  type="text"
                  value={blog[field]}
                  name={field}
                  onChange={({ target }) => handleInputChange(field, target.value)}
                />
              </div>
            )
          )
        }
        <button type="submit">Add</button>
      </form>
    </>
  );
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { Blog, AddBlogForm };
