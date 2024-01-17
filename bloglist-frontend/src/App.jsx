import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import InfoBlog from "./components/InfoBlog";
import styles from "./styles/App.module.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const blogFormRef = useRef();
  const blogRef = useRef();

  useEffect(() => {
    const fetchUserDataAndBlogs = async () => {
      const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON);
        setUser(user);
        blogService.setToken(user.token);

        try {
          const blogs = await blogService.getAll();
          const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
          setBlogs(sortedBlogs);
        } catch (error) {
          // Manejar error, por ejemplo, mostrando un mensaje al usuario
          console.error("Error fetching blogs:", error);
        }
      }
    };

    fetchUserDataAndBlogs();
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
      const blogList = blogs.sort((a, b) => b.likes - a.likes);
      const filtered = blogList.filter(
        (blog) => blog.user.username === username
      );
      setBlogs(filtered);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
    setBlogs([]);
  };

  const handleBlogChange = (target) => {
    const { name, value } = target;
    setNewBlog({
      ...newBlog,
      [name]: value,
    });
  };

  const addBlog = async (event) => {
    event.preventDefault();
    try {
      const newBlogCreated = await blogService.create(newBlog);
      setBlogs(blogs.concat(newBlogCreated));
      handleMessage(newBlog);
    } catch (error) {
      console.error("Error addidng", error);
    }
  };

  const updateBlog = async (id, blogData) => {
    const updatedBlog = {
      ...blogData,
      likes: blogData.likes + 1,
    };
    try {
      await blogService.update(id, updatedBlog);
      handleMessage(updatedBlog);
      const unsortedBlogs = blogs.map((blog) =>
        blog.id === id ? updatedBlog : blog
      );
      const sortedBlogs = unsortedBlogs.sort((a, b) => a.likes - b.likes);
      setBlogs(sortedBlogs);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBlog = async (id) => {
    try {
      await blogService.deleteByID(id);
      setBlogs((blogs) => blogs.filter((blog) => blog.id !== id));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handleMessage = (newBlog) => {
    return (
      <h1>
        a new blog ${newBlog.name} by ${newBlog.author} was added!
      </h1>
    );
  };

  const loginForm = () => {
    return (
      <Togglable ref={blogFormRef} buttonShow="Log in" buttonHide="Cancel">
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    );
  };

  return (
    <div>
      <h1>BLOGS</h1>
      <Notification message={errorMessage} />
      {user === null ? loginForm() : ""}
      {user && (
        <div>
          <div>
            <p>{user.name} logged in</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <h2>Create new</h2>
          <BlogForm
            addBlog={addBlog}
            handleBlogChange={handleBlogChange}
            newBlog={newBlog}
          />
        </div>
      )}
      {blogs && (
        <div>
          <h2>list of blogs</h2>
          {blogs.map((blog) => (
            <div className={styles.bloglist}>
              <Blog key={blog.id} blog={blog} />
              <Togglable ref={blogRef} buttonShow="View" buttonHide="Hide">
                <InfoBlog
                  updateBlog={() => updateBlog(blog.id, blog)}
                  deleteBlog={() => deleteBlog(blog.id)}
                  key={blog.id}
                  blog={blog}
                />
              </Togglable>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
