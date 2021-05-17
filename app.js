//importing dependencies
const express = require("express");
const apicache = require("apicache");
const express_graphql = require("express-graphql");
const rootValue = require("./graphql/resolvers");
const schema = require("./graphql/schema");
const {errorHandler} = require("./utils/helper");
require("dotenv").config();


//initializing the express server
const app = express();


//setting cache and environment variables
const cache = apicache.middleware;
const cacheSuccess = cache('10 minutes');
const port = 3000 || process.env.PORT;
const hostname = process.env.HOST || 'localhost';

//middlewares setup
app.use(express.json());



// set CORS headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Methods',
    'OPTIONS, GET, POST');
    res.setHeader('Aceess-Control-Allow-Headers',
    'Content-Type');
    next();
});

//graphql endpoints
app.use('/graphql', cacheSuccess, express_graphql.graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,   
    customFormatErrorFn(err) {
        return errorHandler(err);
    }
}));



//start server
app.listen(port, ()=>{
    console.log(`server has started running on ${hostname} at port: ${port}`);
});