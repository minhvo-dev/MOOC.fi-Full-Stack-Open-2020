import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import NewBlogForm from "./NewBlogForm";
import config from "../configs/config";

describe("<NewBlogForm />", () => {
  test("receive correct input form data", () => {
    const addNewBlog = jest.fn();
    const component = render(
      <NewBlogForm handleNewBlog={addNewBlog} />
    );
    window.localStorage.setItem(config.LOGGED_USER_CREDENTIALS_NAME, JSON.stringify({
      username: "minhvo",
      name: "Minh Vo"
    }));

    const form = component.container.querySelector("form");
    const title = component.container.querySelector("#title");
    const author = component.container.querySelector("#author");
    const url = component.container.querySelector("#url");

    fireEvent.change(title, {
      target: {
        value: "New title"
      }
    });
    fireEvent.change(author, {
      target: {
        value: "New author"
      }
    });
    fireEvent.change(url, {
      target: {
        value: "url.com"
      }
    });
    fireEvent.submit(form);

    expect(addNewBlog.mock.calls).toHaveLength(1);
    expect(addNewBlog.mock.calls[0][0].title).toBe("New title");
    expect(addNewBlog.mock.calls[0][0].author).toBe("New author");
    expect(addNewBlog.mock.calls[0][0].url).toBe("url.com");
  });
});
