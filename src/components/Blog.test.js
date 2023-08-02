import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import BlogComponent from "./Blog";
import userEvent from "@testing-library/user-event";
// import userEvent from '@testing-library/user-event'

test("renders Blog content", () => {
  // not testing functionality of deleting or updating blogs
  const dummyFunction = () => {};

  // usually contains token and name fields in the app
  const currentUser = {
    username: "Kobisan",
    id:"64c031f5a4583b7077636565"
  };

  const blog = {
    url: "https://blog.com",
    title: "This is my nightmare!",
    author: "Kobisani Sheesh",
    likes: 0,
    user: currentUser
  };

  const { container } = render(
    <BlogComponent.Blog
      blog={blog}
      updateBlog={dummyFunction}
      deleteBlog={dummyFunction}
      currentUser={currentUser}
    />
  );

  const element = container.querySelector(".blog");
  // output the html to the console for debugging purposes
  // screen.debug(element);

  expect(element).toHaveTextContent(blog.title);
});
