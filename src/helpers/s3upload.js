const S3Upload = async (base64) => {
  const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
  const { Upload } = require("@aws-sdk/lib-storage");
  //   const s3Client = new S3Client({ region: "us-east-1" });

  const s3Config = {
    // accessKeyId: process.env.ACCESS_KEY_ID,
    // secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
  };

  const s3Client = new S3Client(s3Config);

  var base64Data = new Buffer.from(
    base64.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );
  var type = base64.split(";")[0].split("/")[1];

  // const file = req.files.file;
  // const fileName = req.files.file.name;

  const userId = Date.now();

  const bucketParams = {
    Bucket: "bisabucket",
    Key: `${userId}.${type}`,
    Body: base64Data,
    ACL: "public-read",
    ContentEncoding: "base64", // required
    ContentType: `image/${type}`, // required. Notice the back ticks
  };
  try {
    //   const data = await s3Client.Upload(new PutObjectCommand(bucketParams));
    //   console.log(data);

    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: "bisabucket",
        Key: `${userId}.${type}`,
        Body: base64Data,
        // ACL: 'public-read',
        ContentEncoding: "base64", // required
        ContentType: `image/${type}`, // required. Notice the back ticks
      },
    });
    //   console.log(upload.location);
    return upload.done().then((res, error) => {
      console.log(res);
      return res.Location;
    });
  } catch (err) {
    console.log("Error", err);
  }
};

module.exports = S3Upload;
