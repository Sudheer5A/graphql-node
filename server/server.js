const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");

const mongoClient = require("mongodb").MongoClient;
const mongoConnectURI = require("./config/key").mongoConnectURI;
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const db = mongoClient.connect(mongoConnectURI).then((res) => res.db("store"));

let books = db.then((res) => res.collection("books").find().toArray());
let authors = db.then((res) => res.collection("authors").find().toArray());

const BookType = new GraphQLObjectType({
  name: "Book",
  description: "This represent a book",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    authorId: { type: GraphQLNonNull(GraphQLInt) },
    imgUrl: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve: (book) =>
        authors.then((data) =>
          data.find((author) => author.id === book.authorId)
        ),
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  description: "This represent a author",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    imgUrl: { type: GraphQLString },
    books: {
      type: new GraphQLList(BookType),
      resolve: (author) =>
        books.then((data) =>
          data.filter((book) => book.authorId === author.id)
        ),
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    book: {
      type: BookType,
      description: "Single book",
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (parent, args) =>
        books.then((data) => data.find((book) => book.id === args.id)),
    },

    books: {
      type: new GraphQLList(BookType),
      description: "List of Books",
      resolve: () => books,
    },

    authors: {
      type: new GraphQLList(AuthorType),
      description: "List of Authors",
      resolve: () => authors,
    },

    author: {
      type: AuthorType,
      description: "Single Author",
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (parent, args) =>
        authors.then((data) => data.find((author) => author.id === args.id)),
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQuery,
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(5000, () => console.log("listening"));
