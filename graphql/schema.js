const {buildSchema} = require('graphql');

module.exports = buildSchema(`

type metaData {
    title: String!
    description : String
    image: String
}


type Query {
    getData(url: String!): metaData
}


`)