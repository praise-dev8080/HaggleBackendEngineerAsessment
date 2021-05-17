const {validateUrl, largestImage} = require("../utils/helper")
const domino = require("domino");
const meta = require("html-metadata-parser");
const fetch = require("node-fetch");
const e = require("express");

module.exports = {
    //resolver for the getMetaData query
    getData: async function(args, req) {
      
        const{url} = args;

        //check cache first

        //check if url is valid
        if(!validateUrl(url)){
            const err = new Error("Invalid URL");
            err.code = 422;
            err.data = "check that url matches http:// or https:// ";
            throw err;
        };
        try{
            const metadata = await meta.parser(url);
            if(metadata){
                console.log(metadata.images);
                const image1 = largestImage(metadata.og.images);
                const image2 = largestImage(metadata.images);
                let image;
                if (image1[0] > image2[0]){
                    image = image1[1];
                }
                else{
                    image = image2[1];
                }

            //check if image is valid
              if (image == undefined){
                  image = metadata.og.image
              };
                //return metaData
                    return {
                        title: metadata.meta.title,
                        description: metadata.meta.description,
                        image
                    };
        
    
                
            }else{
                //if no data
                const err = new Error("Internal server error");
                err.code = 500;
                throw err;
            };
           
        }catch(err){
            throw(err);
        };

    }



};