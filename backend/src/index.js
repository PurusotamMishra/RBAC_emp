const { ApolloServer, AuthenticationError } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

MONGODB_URI = 'mongodb+srv://purusotammishrasm:Cluster0@cluster0.dmfuytd.mongodb.net/Emp_rbac?retryWrites=true&w=majority&appName=Cluster0'

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB Connected");

    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
    })

    console.log(`Server running at ${url}`);
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
  }
}

startServer();
