import { useState, useEffect } from 'react';

import BlogComponents from './components/Blog';
import LoginComponents from './components/Login';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [statusMessage, setStatusMessage] = useState(
    {message: null, className: null}
  );

  const userToLocalStorage = (userToStore) =>
    window
      .localStorage
      .setItem(
        "loggedBloglistAppUser", JSON.stringify(userToStore)
      );

  const userFromLocalStorage = () => {
    return (
      window
        .localStorage
        .getItem("loggedBloglistAppUser")
    );
  };

  const updateStatusMessage = (newMessage, notificationType, timeout=5000) => {
    setStatusMessage(
      {message: newMessage, className: notificationType}
    );
    setTimeout(
      () => {
        setStatusMessage({message: null, ...statusMessage})
      }, timeout
    );
  };

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, []);

  useEffect(() => {
    const loggedUserJSON = userFromLocalStorage();

    if (loggedUserJSON) {
      console.log("User found in local storage, already logged in");
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const loginUserToApp = async (username, password) => {
    try {
      console.log(
        `Logging in with username=${username} and password=${password}`
      );
      const userLogin = await loginService.login({ username, password });
      userToLocalStorage(userLogin);
      setUser(userLogin);
      updateStatusMessage(`${userLogin.name} successfully logged in`, "notification");
    } catch (error) {
      console.error(error.message);
      updateStatusMessage("Username or password is incorrect", "error");
    }
  };

  const addNewBlog = async (blog) => { 
    try {
      if (!user) {
        console.error("user must be logged in for this action")
        updateStatusMessage(
          "User must be logged in for this action", "error"
        );
        return;
      }
      const newBlog = await blogService.addNewBlog(blog, user);
      console.log("Blog added", newBlog);
      setBlogs(blogs.concat({...blog, id: newBlog.id}));
      updateStatusMessage("New blog post was successfully added", "notification");
    } catch (error) {
      updateStatusMessage(
        "New blog was not added, check that all fields are filled", "error"
      );
      console.error(error.message);
    }
    
  };

  const logoutHandler = () => {
    window
      .localStorage
      .removeItem("loggedBloglistAppUser");
    setUser(null);
    updateStatusMessage(`${user.name} successfully logged out`, "notification");
  };

  const blogsRender = () => {
    return (
      <>
        <h2>Blog Posts</h2>
        {
          blogs.map(
            blog => <BlogComponents.Blog key={blog.id} blog={blog} />
          )
        }
      </>
    );
  };

   return (
    <div>
      <Notification
        message={statusMessage.message}
        className={statusMessage.className}
      />
      {
        user === null
          ? (
              <LoginComponents.LoginForm
                loginUser={loginUserToApp}
              />
            )
          : (
              <>
                <LoginComponents.ShowUser
                  username={user.name}
                  logoutHandler={logoutHandler}
                />
                <Togglable buttonLabel="add blog">
                  <BlogComponents.AddBlogForm
                    createBlog={addNewBlog}
                  />
                </Togglable>
                {blogsRender()}
              </>
            )
      }
    </div>
  );
};

export default App;
