import axios from "axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
export const Drive = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPageToken, setNextPageToken] = useState(0);
  // Fetch images from Google Drive API
  const fetchImages = async () => {
    setLoading(true);
    try {
      const folderId = "1_qOJ0z3kI_e2IJq4X6HqF0T1ROBESygS"; // Replace with your Google Drive folder ID
      const apiKey = "AIzaSyCJ0dmUC_S0fBEhtTFO31wFTNISx5SUBNk"; // Replace with your Google API key
      const apiUrl = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${apiKey}`;

      const response = await axios.get(apiUrl);
      const imageData = response.data.files;

      // Filter and store image URLs
      const imageUrls = imageData
        .filter((file) => file.mimeType.includes("image"))
        .map((file) => `https://drive.google.com/uc?export=view&id=${file.id}`);
      setLoading(false);
      setImages([...images, ...imageUrls]);
    } catch (error) {
      setLoading(false);

      console.error("Error fetching images:", error);
    }
  };

  const getMoreImages = () => {
    console.log("getMoreImages");
    setTimeout(() => {
      setNextPageToken(nextPageToken + 1);
    }, 1000);
  };

  useEffect(() => {
    fetchImages();
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
