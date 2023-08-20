const { S3Client } = require("@aws-sdk/client-s3");
const { Upload } = require("@aws-sdk/lib-storage");

class CustomMulterS3Storage {
  constructor(options) {
    this.options = options;
    this.s3Client = new S3Client(options.s3Config);
  }

  async _handleFile(req, file, cb) {
    const fileName =
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname;

    const upload = new Upload({
      client: this.s3Client,
      params: {
        Bucket: this.options.bucket,
        Key: fileName,
        Body: file.stream,
        ContentType: file.mimetype,
      },
    });

    try {
      const { Location } = await upload.done();
      cb(null, {
        location: Location,
        bucket: this.options.bucket,
        key: fileName,
        acl: this.options.acl,
        contentType: file.mimetype,
      });
    } catch (error) {
      cb(error);
    }
  }

  _removeFile(req, file, cb) {
    // Implement remove file logic if needed
  }
}

module.exports = (options) => new CustomMulterS3Storage(options);
