const aws = require("aws-sdk");
require('aws-sdk/lib/maintenance_mode_message').suppress = true;

const endpoint = new aws.Endpoint(process.env.ENDPOINT_S3);

const s3 = new aws.S3({
    endpoint,
    credentials: {
        accessKeyId: process.env.KEY_ID,
        secretAccessKey: process.env.APP_KEY
    }
});

const uploadImages = async (path, buffer, mimetype) => {

    const file = await s3.upload({
        Bucket: process.env.BLACKBLAZE_BUCKET,
        Key: path,
        Body: buffer,
        ContentType: mimetype

    }).promise()

    return {
        url: file.Location,
        path: file.Key
    };


};

const deleteFile = async (path) => {
    await s3.deleteObject({
        Bucket: process.env.BLACKBLAZE_BUCKET,
        Key: path
    }).promise();
};

module.exports = {
    uploadImages,
    deleteFile
}