import axios from "axios";
import React, { useEffect, useState } from "react";

export const Drive = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch images from Google Drive API
    const fetchImages = async () => {
      try {
        const folderId = "1_qOJ0z3kI_e2IJq4X6HqF0T1ROBESygS"; // Replace with your Google Drive folder ID
        const apiKey = "AIzaSyCJ0dmUC_S0fBEhtTFO31wFTNISx5SUBNk"; // Replace with your Google API key
        const apiUrl = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${apiKey}`;

        const response = await axios.get(apiUrl);
        const imageData = response.data.files;

        // Filter and store image URLs
        const imageUrls = imageData
          .filter((file) => file.mimeType.includes("image"))
          .map(
            (file) => `https://drive.google.com/uc?export=view&id=${file.id}`
          );

        setImages(imageUrls);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);
  console.log(images);

  return (
    <div className="image-wrapper">
      {images?.map((image) => {
        return <img src={image} alt="" />;
      })}
    </div>
  );
};
