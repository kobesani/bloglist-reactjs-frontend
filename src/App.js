import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const blogDefault = {
    title: "",
    url: "",
    author: "",
    likes: 0
  };
  const [blog, setBlog] = useState(blogDefault);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      console.log(
        `Logging in with username=${username} and password=${password}`
      );
      const userLogin = await loginService.login({ username, password });
      setUser(userLogin);
      setUsername("");
      setPassword("");
      console.log(user);
    } catch (error) {
      console.error("Error caught")
      console.error(error.message);
    }
  };

  const handleNewBlogSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!user) {
        console.error("user must be logged in for this action")
        return;
      }
      const newBlog = await blogService.addNewBlog(blog, user);
      console.log("Blog added", newBlog);
    } catch (error) {
      console.error(error.message);
    }
    
  };

  const loginForm = () => {
    return (
      <>
        <h2>login</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </>
    );
  };

  const showUser = () => {
    return (
      <div>
        <p>{user.name} logged in</p>
      </div>
    );
  };

  const logoutButton = () => {
    return (
      <>
        <button onClick={() => setUser(null)}>logout</button>
      </>
    );
  };

  const blogForm = () => {
    return (
      <>
        <h2>Add new blog</h2>
        <form onSubmit={handleNewBlogSubmit}>
          <div>
            title
            <input 
              type="text"
              value={blog.title}
              name="title"
              onChange={({ target }) => setBlog({...blog, title: target.value})}
            />
          </div>
          <div>
            author
            <input 
              type="text"
              value={blog.author}
              name="title"
              onChange={({ target }) => setBlog({...blog, author: target.value})}
            />
          </div>
          <div>
            url
            <input 
              type="text"
              value={blog.url}
              name="title"
              onChange={({ target }) => setBlog({...blog, url: target.value})}
            />
          </div>
          <button type="submit">Add</button>
        </form>
      </>
    );
  };

   return (
    <div>
      { user === null && loginForm() }
      { user !== null && showUser() }
      <h2>blogs</h2>
      {
        blogs
          .map(
            blog =>
              <Blog key={blog.id} blog={blog} />
          )
      }
      {blogForm()}
      { user !== null && logoutButton()}
    </div>
  );
};

export default App;
