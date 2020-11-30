import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Blog from "./Blog";
import config from "../configs/config";

describe("<Blog />", () => {
  let blog;

  beforeEach(() => {
    blog = {
      title: "Blog title",
      author: "Blog author",
      url: "url.com",
      likes: 0,
      user: {
        username: "minhvo",
        name: "Minh Vo"
      }
    };

    window.localStorage.setItem(config.LOGGED_USER_CREDENTIALS_NAME, JSON.stringify({
      username: "minhvo",
      name: "Minh Vo"
    }));
  });

  test("render only title and author by default", () => {
    const component = render(<Blog
      blog={blog}
      likeBlog={() => { }}
      removeBlog={() => { }}
    />);
    expect(component.getByText("Blog title Blog author")).toBeDefined();

    expect(component.container.querySelector("divTest")).toEqual(null);
  });

  test("render url after clicking button", () => {
    const component = render(<Blog
      blog={blog}
      likeBlog={() => { }}
      removeBlog={() => { }}
    />);
    const button = component.getByText("show");
    fireEvent.click(button);

    expect(component.getByText("url.com")).toBeDefined();
    expect(component.getByText("likes 0")).toBeDefined();
  });

  test("fire two click events when clicking like button twice", () => {
    const mockHandler = jest.fn();
    const component = render(<Blog
      blog={blog}
      likeBlog={mockHandler}
      removeBlog={() => { }}
    />);
    const showButton = component.getByText("show");
    fireEvent.click(showButton);

    const likeButton = component.getByText("like");
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });

  afterEach(() => {
    window.localStorage.removeItem(config.LOGGED_USER_CREDENTIALS_NAME);
  });
});