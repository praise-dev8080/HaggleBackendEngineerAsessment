const {buildSchema} = require('graphql');

module.exports = buildSchema(`


type metaData {
    title: String!
    description : String!
    largest_image: String!
}


input inputData {
    url : String!
}



type Rootquery {
    getmetaData(inputData): metaData
}


schema : {
    query  : rootQuery
}



`);