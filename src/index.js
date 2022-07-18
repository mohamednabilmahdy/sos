import { ApolloServer, gql } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";
import { makeExecutableSchema } from '@graphql-tools/schema';
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { User } from "./models/User";
import { Post } from "./models/Post";
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env" });

// import expressjwt from "express-jwt";
// import jwt from "jsonwebtoken";


const startServer = async() => {
    const app = express();

    const getUser = async token => {
        if (token) {
            try {
                return jwt.verify(token, process.env.SECRET);
            } catch (err) {
                throw new AuthenticationError(
                    "Your session has ended. Please sign in again."
                );

            }
        }
    };
    const schema = makeExecutableSchema({ typeDefs, resolvers });



    const server = new ApolloServer({
        schema,
        introspection: true,
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
        cors: {
            origin: ["http://localhost:4001/graphql",
                "https://web.me.restaurant-partners.com"
            ],
        },
        context: async({ req }) => {
            const tokens = req.headers["token"];
            // const token = req.headers.token;
            console.log(tokens);
            console.log("=============");




            return { User, Post, currentUser: await getUser(tokens) };
        }

    });







    await server.start();

    server.applyMiddleware({ app });

    await mongoose.connect("mongodb://localhost:27017/test66", {
        useNewUrlParser: true
    });

    app.listen({ port: 4001 }, () =>
        console.log(`🚀 Server ready at http://localhost:4001${server.graphqlPath}`)
    );
};

startServer();