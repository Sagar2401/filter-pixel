import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
const {
  S3Client,
  ListObjectsCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
// Set the AWS Region.
const REGION = "ap-south-1";
// Create an Amazon S3 service client object.
const s3Client = new S3Client({
  region: REGION,
  signer: {
    sign: async (request) => request,
  },
});

export const S3Component = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPageToken, setNextPageToken] = useState(0);
  const run = async () => {
    setLoading(true);
    try {
      const data = await s3Client.send(
        new ListObjectsCommand({
          Bucket: "testbucketfp",
        })
      );
      setLoading(false);
      setImages(
        data.Contents.map(
          (file) =>
            `https://testbucketfp.s3.ap-south-1.amazonaws.com/${file.Key}`
        )
      );
      return data; // For unit tests.
    } catch (err) {
      setLoading(false);

      console.log("Error", err);
    }
  };
  // main();
  const getMoreImages = () => {
    console.log("getMoreImages");
    setTimeout(() => {
      setNextPageToken(nextPageToken + 1);
    }, 1000);
  };

  useEffect(() => {
    run();
  }, [nextPageToken]);

  return (
    <div className="image-wrapper">
      <InfiniteScroll
        dataLength={images?.length || 0}
        next={getMoreImages}
        hasMore={true}
        loader={loading && <h4 style={{ color: "red" }}>Loading...</h4>}
        height={430}
        className="img-wrap"
      >
        {images?.map((image) => {
          return <img className="hello" src={image} alt="" />;
        })}
      </InfiniteScroll>
    </div>
  );
};
