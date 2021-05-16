const {validateUrl} = require("../utils/helper")

module.exports = {
    //resolver for the getMetaData query
    getMetaData: async (args, req) => {
        const{url} = args.inputData;


        //check if url is valid
        if(!validateUrl(url)){
            const err = new Error("Invalid URL");
            err.code = 422;
            err.data = ["check that url matches http:// or https:// "]
            throw(err);
        };

        

    }



}