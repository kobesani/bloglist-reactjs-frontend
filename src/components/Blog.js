import { useState } from "react";
import Togglable from "./Togglable";

const Blog = ({ blog, updateBlog, deleteBlog, currentUser }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };

  const handleLike = async () => {
    updateBlog(blog);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      deleteBlog(blog);
    }
  };

  return (
    <div className="blog" style={blogStyle}>
      {blog.title} {blog.author}
      <Togglable buttonLabel="view">
        url: {blog.url}<br/>
        likes: {blog.likes}<br/>
        user: {blog.user.username}<br/>
        <button onClick={handleLike}>like</button>
        {
          currentUser.id === blog.user.id
            ? <button onClick={handleDelete}>remove</button>
            : null
        }
      </Togglable>
    </div>
  );
};

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

export default { Blog, AddBlogForm };
