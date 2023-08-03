import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import BlogComponent from "./Blog";

describe("<Blog />", () => {
  let container;

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

  const blogUpdater = jest.fn();

  beforeEach(() => {
    container = render(
      <BlogComponent.Blog
        blog={blog}
        updateBlog={blogUpdater}
        deleteBlog={() => {}}
        currentUser={currentUser}
      />
    ).container;
  });

  test("initially renders title and author only", () => {
    const toggleDiv = container.querySelector(".togglableContent");
    expect(toggleDiv).toHaveStyle("display: none");

    const mainDiv = container.querySelector(".blog");
    expect(mainDiv).toHaveTextContent(blog.title);
    expect(mainDiv).toHaveTextContent(blog.author);
  });

  test("renders url and username after toggle button click", async () => {
    const user = userEvent.setup();

    const toggleDiv = container.querySelector(".togglableContent");
    expect(toggleDiv).toHaveStyle("display: none");

    const toggleButton = screen.getByText("view");
    await user.click(toggleButton);

    expect(toggleDiv).not.toHaveStyle("display: none");
    expect(toggleDiv).toHaveTextContent(blog.url);
    expect(toggleDiv).toHaveTextContent(blog.user.username);
  });

  test("hides url and username after a second toggle click", async () => {
    const user = userEvent.setup();

    const toggleDiv = container.querySelector(".togglableContent");
    expect(toggleDiv).toHaveStyle("display: none");

    const toggleButton = screen.getByText("view");
    await user.click(toggleButton);
    await user.click(toggleButton);

    expect(toggleDiv).toHaveStyle("display: none");
  });

  test("likes event handler is called twice", async () => {
    const user = userEvent.setup();

    const likeButton = screen.getByText("like");
    await user.click(likeButton);
    await user.click(likeButton);

    expect(blogUpdater.mock.calls).toHaveLength(2);
  });
});

describe("<AddBlogForm />", () => {
  let container;

  const inputFields = ["author", "title", "url"];

  const blogCreator = jest.fn();

  const blog = {
    url: "https://blog.com",
    title: "This is my nightmare!",
    author: "Kobisani Sheesh",
    likes: 0,
  };

  beforeEach(() => {
    container = render(
      <BlogComponent.AddBlogForm createBlog={blogCreator} />
    ).container;
  });

  test("createBlog function is called with data entered by user", async () => {
    const user = userEvent.setup();
    const sendButton = screen.getByText("Add");

    for (const field of inputFields) {
      await user.type(
        container.querySelector(`#${field}-input`),
        blog[field]
      );
    }
    await user.click(sendButton);

    expect(blogCreator).toHaveBeenCalled();
    expect(blogCreator).toHaveBeenCalledWith(blog);
  });

  afterEach(() => blogCreator.mockReset());
});