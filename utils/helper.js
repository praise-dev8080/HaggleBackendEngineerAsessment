exports.errorHandler = (err) => {
    if (!err.originalError) {
        return err;
    }
    const data = err.originalError.data;
    const message = err.message || "An Error Occurred Please contact Support: opraiz6@yahoo.com";
    const code = err.originalError.code || 500;
    return {
        message,
        status: code,
        data
    };

};

exports.validateUrl = (url) => {
    const regex = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);
    return regex.test(url);
}

exports.largestImage = (images) => {
    let largestimage;
    let largestSize = Number.NEGATIVE_INFINITY;

    for (let image of images){
        let curr = parseFloat(image.width) * parseFloat(image.height);
        if (curr > largestSize){
            largestSize = curr;
            largestimage = image.url;
        }
    }
    return [largestSize, largestimage];
}