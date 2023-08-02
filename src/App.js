import { useState, useEffect } from "react";

import BlogComponents from "./components/Blog";
import LoginComponents from "./components/Login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import blogService from "./services/blogs";
import loginService from "./services/login";

import storageUtils from "./utils/storage";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [statusMessage, setStatusMessage] = useState(
    { message: null, className: null }
  );

  const updateStatusMessage = (newMessage, notificationType, timeout=5000) => {
    setStatusMessage(
      { message: newMessage, className: notificationType }
    );
    setTimeout(
      () => {
        setStatusMessage({ message: null, ...statusMessage });
      }, timeout
    );
  };

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    );
  }, []);

  useEffect(() => {
    const loggedUserJSON = storageUtils.userFromLocalStorage();

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
      storageUtils.userToLocalStorage(userLogin);
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
        console.error("user must be logged in for this action");
        updateStatusMessage(
          "User must be logged in for this action", "error"
        );
        return;
      }
      const newBlog = await blogService.addNewBlog(blog, user);
      console.log("Blog added", newBlog);
      console.log(user);
      // user info is accessed here so that the username can be viewed in the react app
      setBlogs(
        blogs.concat(
          {
            ...blog,
            id: newBlog.id,
            user: {
              username: user.username,
              name: user.name
            }
          }
        )
      );
      updateStatusMessage("New blog post was successfully added", "notification");
    } catch (error) {
      updateStatusMessage(
        "New blog was not added, check that all fields are filled", "error"
      );
      console.error(error.message);
    }
  };

  const blogDeleter = async (blog) => {
    try {
      if (!user) {
        console.error("user must be logged in for this action");
        updateStatusMessage(
          "User must be logged in for this action", "error"
        );
        return;
      }
      await blogService.deleteBlog(blog, user);
      setBlogs(
        blogs.filter((b) => b.id !== blog.id)
      );
      updateStatusMessage("Blog successfully deleted!", "notification");
    } catch (error) {
      updateStatusMessage(
        "blog was not deleted", "error"
      );
    }
  };

  const updateLikesForBlog = async (blog) => {
    const updatedBlog = await blogService
      .updateLikes({ ...blog, likes: blog.likes + 1 });

    setBlogs(
      blogs.map(
        (blog) => blog.id === updatedBlog.id ? updatedBlog : blog
      )
    );
    updateStatusMessage("Blog post was successfully liked", "notification");
  };

  const logoutHandler = () => {
    storageUtils.userRemoveLocalStorage();
    setUser(null);
    updateStatusMessage(`${user.name} successfully logged out`, "notification");
  };

  const blogsRender = (blogUpdater) => {
    return (
      <>
        <h2>Blog Posts</h2>
        {
          blogs
            .sort((a, b) => b.likes - a.likes)
            .map(
              blog =>
                <BlogComponents.Blog
                  key={blog.id}
                  blog={blog}
                  updateBlog={blogUpdater}
                  deleteBlog={blogDeleter}
                  currentUser={user}
                />
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
          ?
          (
            <LoginComponents.LoginForm
              loginUser={loginUserToApp}
            />
          )
          :
          (
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
              {blogsRender(updateLikesForBlog)}
            </>
          )
      }
    </div>
  );
};

export default App;
