const Blog = require("../models/blog");
const blogsRouter = require("express").Router();
const { userExtractor } = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const result = await Blog.find({}).populate("user", {
    name: 1,
    username: 1,
  });
  response.json(result);
});

blogsRouter.get("/:id", async (request, response) => {
  const person = await Blog.findById(request.params.id);

  if (!person) {
    return response.status(404).end();
  }
  return response.json(person);
});

blogsRouter.post("/", userExtractor, async (request, response) => {
  const { title, url, author, likes } = request.body;
  if (await Blog.exists({ title })) {
    return response.status(400).json({ error: "title must be unique" });
  } else if (title === undefined) {
    return response.status(400).json({ error: "title missing" });
  } else if (url === undefined) {
    return response.status(400).json({ error: "author missing" });
  }
  const user = request.user;
  const blog = new Blog({
    title: title,
    url: url,
    author: author,
    likes: likes,
    user: user.id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog.id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
  const user = request.user;
  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response.status(404).json({ error: "blog not found" });
  }
  if (user.id.toString() !== blog.user.toString()) {
    return response.status(401).json({ error: "user invalid" });
  }
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;
  const update = {};
  if (body.title !== undefined) update.title = body.title;
  if (body.url !== undefined) update.url = body.url;
  if (body.author !== undefined) update.author = body.author;
  if (body.likes !== undefined) update.likes = body.likes;
  if (Object.keys(update).length === 0) {
    response.status(400).end();
  }
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      update,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedBlog) {
      return response.status(404).json({ error: "El blog no se encontró" });
    }

    response.json(updatedBlog);
  } catch (error) {
    response
      .status(500)
      .json({ error: "Ha ocurrido un error al actualizar el blog" });
  }
});

module.exports = blogsRouter;
