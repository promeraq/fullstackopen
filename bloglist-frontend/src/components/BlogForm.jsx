const BlogForm = ({ addBlog, handleBlogChange, newBlog }) => (
  <form onSubmit={addBlog}>
    <label htmlFor="title">Title:</label>
    <input
      type="text"
      id="title"
      placeholder="title"
      name="title"
      value={newBlog.title}
      onChange={(event) => handleBlogChange(event.target)}
    />
    <label htmlFor="author">Author:</label>
    <input
      type="text"
      id="author"
      placeholder="author"
      name="author"
      value={newBlog.author}
      onChange={(event) => handleBlogChange(event.target)}
    />
    <label htmlFor="url">URL:</label>
    <input
      type="text"
      id="url"
      placeholder="url"
      name="url"
      value={newBlog.url}
      onChange={(event) => handleBlogChange(event.target)}
    />
    <button type="submit">save</button>
  </form>
);

export default BlogForm;
