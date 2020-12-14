// dummy function
const dummy = () => {
  return 1;
};

// calculate the total likes of all of the blogs
const totalLikes = (blogs) => {
  return blogs.reduce(
    (accumulator, current) => accumulator + current.likes,
    0
  );
};

// get the favorite blog based on the likes
// return undefined if the blogs is empty
const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return undefined;
  }
  const { title, author, likes } = blogs.reduce(
    (accumulator, current) => accumulator.likes > current.likes
      ? accumulator : current,
    blogs[0]
  );
  return {
    title,
    author,
    likes,
  };
};

// get the author who has the largest amount of blog
// return undefined if the blogs is empty
const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return undefined;
  }
  // count number of blogs each author has
  const authors = {};
  blogs.forEach(({ author }) => {
    author in authors
      ? authors[author] += 1
      : authors[author] = 1;
  });

  // find the author that has the largest amount of blog
  let authorName = "";
  let authorBlogs = 0;
  for (let author in authors) {
    if (authors[author] > authorBlogs) {
      authorName = author;
      authorBlogs = authors[author];
    }
  }

  return {
    author: authorName,
    blogs: authorBlogs
  };
};

// get the author whose blogs have the largest amount of like
// return undefined if the blogs is empty
const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return undefined;
  }

  // count number of likes each author has
  const authors = {};
  blogs.forEach(({ author, likes }) => {
    author in authors
      ? authors[author] += likes
      : authors[author] = likes;
  });

  // find the author who has the most amount of likes
  let authorName = "";
  let authorLikes = 0;
  for(let author in authors){
    if(authors[author] > authorLikes) {
      authorName = author;
      authorLikes = authors[author];
    }
  }

  return {
    author: authorName,
    likes: authorLikes
  };
};


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};