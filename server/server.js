import https from 'https';
import express from 'express';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { graphqlHTTP } = require('express-graphql');
import cors from 'cors';
import mongoose from 'mongoose';
import fs from 'fs';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 8080
const httpsconfig = {
    cert: fs.readFileSync('./cert.pem'),
    key: fs.readFileSync('./key.pem')
}
const server = https.createServer(httpsconfig, app);

// middleware 
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}));
app.use(express.json({limit: '50mb'}));
app.use(cookieParser());

// graphql
app.use('/graphql', (req, res) => {
    const cookies = req.cookies;
    return graphqlHTTP({
        schema: '',
        graphiql: true,
        context: { cookies }
    })
})

// REST-Api
app.use('/login', LoginRoute);
app.use('/signup', SignupRoute);
app.use('/checkAuth', checkAuthenticationRoute);

// mongoDB;
mongoose.connect(process.env.URI).then(() => {
    console.log('connected to mongoDB');
}).catch(() => {
    console.log('did not connect to mongoDB');
})

server.listen(PORT, () => {
    console.log(`connected to PORT:${PORT}`)    
});