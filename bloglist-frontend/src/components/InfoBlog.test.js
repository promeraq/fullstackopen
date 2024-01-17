import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InfoBlog from "./InfoBlog";

test("clicking the view button shows details", async () => {
  const blog = {
    title: "My blog",
    author: "Anonim",
    likes: 100000000,
    url: "https://en.wikipedia.org/",
  };

  // A session is started to interact with the rendered component:
  const user = userEvent.setup();
  const { container } = render(<InfoBlog blog={blog} />);

  const likeButton = screen.getByText("Like");
  await user.click(likeButton);

  const likes = container.querySelector(".likes");
  const url = container.querySelector(".url");
  expect(url).toBeDefined();
  expect(likes).toBeDefined();
});

test("clicking the like button twice calls the event handler prop twice", async () => {
  const blog = {
    title: "Title",
    author: "Anonim",
    likes: 10000,
    url: "https://en.wikipedia.org/wiki/",
    user: {},
  };

  const user = userEvent.setup();
  const updateBlog = jest.fn();

  const { container } = render(
    <InfoBlog blog={blog} updateBlog={updateBlog} />
  );

  const likeButton = screen.getByText("Like");
  await user.click(likeButton);
  await user.click(likeButton);
  expect(updateBlog).toHaveBeenCalledTimes(2);
});
