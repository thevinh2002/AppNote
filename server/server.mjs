import express from "express";
import http from "http";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import mongoose from "mongoose";
import 'dotenv/config'
import { typeDefs } from "./Schema/index.js";
import { resolvers } from "./Resolver/index.js";
import './firebaseConfigs.js'
import { getAuth } from "firebase-admin/auth"
const app = express();
const httpServer = http.createServer(app);




// 1. Cấu hình CORS đầu tiên
app.use(cors({
    origin: '*',
    credentials: true
}));

// 2. Middleware parse JSON
app.use(express.json());



const URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.sendz5k.mongodb.net/`;

const PORT = process.env.PORT || 4000;
const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
//chan

const AuthorizationJWT = async (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    console.log({ authorization: authorizationHeader });

    if (authorizationHeader?.startsWith("Bearer ")) {
        const accessToken = authorizationHeader.split(' ')[1];

        try {
            const decodedToken = await getAuth().verifyIdToken(accessToken);
            res.locals.uid = decodedToken.uid;
            next();
        } catch (error) {
            console.error("❌ Error verifying ID token:", error);
            return res.status(403).json({ message: 'Forbidden', error });
        }
    } else {
        next()
        // return res.status(401).json({ message: "Unauthorized - Missing Bearer token" });
    }
};

// Apply middleware chỉ cho /graphql
app.use('/graphql', AuthorizationJWT);

// Start Apollo server
await server.start();

// Apply Apollo middleware (sau khi đã xác thực xong)
app.use('/graphql', expressMiddleware(server, {
    context: async ({ req, res }) => ({
        uid: res.locals.uid,
    })
}));

// Khởi động HTTP server
mongoose.set("strictQuery", false);
mongoose.connect(URL)
    .then(async () => {
        console.log("Connected to MongoDB");
        await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
        console.log(`🚀 Server ready at http://localhost:4000/graphql`);
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });



