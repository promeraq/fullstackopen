import styles from "../styles/App.module.css";
import React from "react";

const InfoBlog = ({ blog, updateBlog, deleteBlog }) => {
  return (
    <div className={styles.info}>
      <p>url:{blog.url} </p>
      <div className={styles.likeButton}>
        <p>likes:{blog.likes ? blog.likes : 0}</p>
        <button id="likeButton" onClick={updateBlog}>
          Like
        </button>
      </div>
      <p>author:{blog.author}</p>
      {blog.user && <p>username:{blog.user.name}</p>}
      <button id="deleteButton" onClick={deleteBlog}>
        Delete
      </button>
    </div>
  );
};

export default InfoBlog;
