const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
  PubSub
} = require("apollo-server");
// const { v1: uuid } = require("uuid");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Author = require("./models/Author");
const Book = require("./models/Book");
const User = require("./models/User");

const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;

// connect to MongoDB
console.log("connecting to", MONGODB_URI);
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch(error => {
    console.log("error connection to MongoDB:", error.message);
  });


// let authors = [
//   {
//     name: "Robert Martin",
//     id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
//     born: 1952,
//   },
//   {
//     name: "Martin Fowler",
//     id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
//     born: 1963
//   },
//   {
//     name: "Fyodor Dostoevsky",
//     id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
//     born: 1821
//   },
//   {
//     name: "Joshua Kerievsky", // birthyear not known
//     id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
//   },
//   {
//     name: "Sandi Metz", // birthyear not known
//     id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
//   }
// ];

// let books = [
//   {
//     title: "Clean Code",
//     published: 2008,
//     author: "Robert Martin",
//     id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
//     genres: ["refactoring"]
//   },
//   {
//     title: "Agile software development",
//     published: 2002,
//     author: "Robert Martin",
//     id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
//     genres: ["agile", "patterns", "design"]
//   },
//   {
//     title: "Refactoring, edition 2",
//     published: 2018,
//     author: "Martin Fowler",
//     id: "afa5de00-344d-11e9-a414-719c6709cf3e",
//     genres: ["refactoring"]
//   },
//   {
//     title: "Refactoring to patterns",
//     published: 2008,
//     author: "Joshua Kerievsky",
//     id: "afa5de01-344d-11e9-a414-719c6709cf3e",
//     genres: ["refactoring", "patterns"]
//   },
//   {
//     title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
//     published: 2012,
//     author: "Sandi Metz",
//     id: "afa5de02-344d-11e9-a414-719c6709cf3e",
//     genres: ["refactoring", "design"]
//   },
//   {
//     title: "Crime and punishment",
//     published: 1866,
//     author: "Fyodor Dostoevsky",
//     id: "afa5de03-344d-11e9-a414-719c6709cf3e",
//     genres: ["classic", "crime"]
//   },
//   {
//     title: "The Demon ",
//     published: 1872,
//     author: "Fyodor Dostoevsky",
//     id: "afa5de04-344d-11e9-a414-719c6709cf3e",
//     genres: ["classic", "revolution"]
//   }
// ];

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`;

const pubsub = new PubSub();

const resolvers = {
  Author: {
    bookCount: async (root) => {
      const author = await Author.findOne({
        name: root.name
      });

      if (!author) {
        throw new UserInputError("not existing author");
      }

      // const myBooks = await Book.find({
      //   author
      // });
      // return myBooks.length;
      
      return author.books.length;
    }
  },
  Query: {
    bookCount: async () => await Book.collection.countDocuments(), // return the number of books in the database
    authorCount: async () => await Author.collection.countDocuments(), // return the number of authors in the database
    allBooks: async (root, args) => { // return an array of book objects, can be filtered by genre or by author
      // let returnedBooks = books;
      // if (args.author) {
      //   const byAuthor = (book) => book.author === args.author;
      //   returnedBooks = returnedBooks.filter(byAuthor);
      // }

      // if (args.genre) {
      //   const byGenre = (book) => book.genres.includes(args.genre);
      //   returnedBooks = returnedBooks.filter(byGenre);
      // }

      // return returnedBooks;

      if (!args.genre) {
        return await Book.find({}).populate("author");
      }

      const books = await Book.find({
        genres: {
          $in: args.genre
        }
      }).populate("author");
      return books;
    },
    allAuthors: async () => await Author.find({}), // return an array of author objects
    me: (root, args, context) => context.currentUser
  },
  Mutation: {
    addBook: async (root, args, context) => {
      // const book = { ...args, id: uuid() };
      // books = books.concat(book);
      // // check if the author is already in the database
      // // if not, add the author to the database
      // if (!authors.includes(args.author)) {
      //   const author = {
      //     name: args.author,
      //     id: uuid()
      //   };
      //   authors = authors.concat(author);
      // }

      // return book;
      // authenticate
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      try {
        // check if the author already exists
        let author = await Author.findOne({
          name: args.author
        });

        if (!author) {
          // add new author to the database
          author = new Author({
            name: args.author
          });
          await author.save();
        }
        // add new book to the database
        const book = new Book({
          ...args,
          author: author._id
        });
        await book.save();
        // add the book to the author's books 
        author.books = author.books.concat(book._id);
        await author.save();

        // prepare the returned data
        const returnedBook = await Book.findById(book._id).populate("author");

        // notify the subscriber
        pubsub.publish("BOOK_ADDED", {
          bookAdded: returnedBook
        });

        return returnedBook;
      }
      catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    editAuthor: async (root, args, context) => {
      // const author = authors.find(a => a.name === args.name);
      // if (!author) {
      //   return null;
      // }
      // const updatedAuthor = { ...author, born: args.setBornTo };
      // authors = authors.map(a => a.name === args.name ? updatedAuthor : a);
      // return updatedAuthor;

      // authenticate
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      try {
        const author = await Author.findOne({
          name: args.name
        });
        author.born = args.setBornTo;
        await author.save();
        return author;
      }
      catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      }
    },
    createUser: async (root, args) => {
      try {
        const user = new User({
          username: args.username,
          favoriteGenre: args.favoriteGenre
        });

        return await user.save();
      }
      catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({
        username: args.username
      });

      if (!user || args.password !== "password") {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id
      };

      return {
        value: jwt.sign(userForToken, JWT_SECRET)
      }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"])
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        JWT_SECRET
      );

      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  }
});

server
  .listen()
  .then(({ url, subscriptionsUrl }) => {
    console.log(`Server ready at ${url}`);
    console.log(`Subscription ready at ${subscriptionsUrl}`);
  });