const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  } else if (blogs.length === 1) {
    return blogs[0].likes;
  } else {
    const totalLikes = blogs.reduce((sum, blog) => sum + blog.likes, 0);
    return totalLikes;
  }
};

const favoriteBlog = (blogs) => {
  let max = 0;
  let fav = null;
  if (blogs.length === 0) {
    return "No blogs received";
  } else {
    for (let blog of blogs) {
      if (blog.likes > max) {
        max = blog.likes;
        fav = blog;
      }
    }
  }
  return {
    title: fav.title,
    author: fav.author,
    likes: fav.likes,
  };
};

const mostBlogs = (blogs) => {
  let authorsCount = {};
  let maxAuthor = "";
  let maxCount = 0;

  if (blogs.length === 0) {
    return "No blogs received";
  }

  for (let blog of blogs) {
    if (authorsCount[blog.author]) {
      authorsCount[blog.author]++;
    } else {
      authorsCount[blog.author] = 1;
    }
  }

  for (const [author, count] of Object.entries(authorsCount)) {
    if (count > maxCount) {
      maxCount = count;
      maxAuthor = author;
    }
  }
  return { author: maxAuthor, blogs: maxCount };
};

const mostLikes = (blogs) => {
  let authorsCount = {};
  let maxAuthor = "";
  let maxCount = 0;

  if (blogs.length === 0) {
    return "No blogs received";
  }

  for (let blog of blogs) {
    if (authorsCount[blog.author]) {
      authorsCount[blog.author] += blog.likes;
    } else {
      authorsCount[blog.author] = blog.likes;
    }
  }

  for (const [author, count] of Object.entries(authorsCount)) {
    if (count > maxCount) {
      maxCount = count;
      maxAuthor = author;
    }
  }
  return { author: maxAuthor, likes: maxCount };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
