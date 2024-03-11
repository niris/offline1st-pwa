import React, { useState, useEffect } from "react";
import "./VideoPlayer.css"; // Import CSS file

const VideoPlayer: React.FC = () => {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVideo() {
      try {
        const response = await fetch(
          "/media/videos/big_buck_bunny_720p_surround.mp4",
          { headers: { Accept: "video/mp4" } }
        );
        console.log("Video response", response);
        setVideoSrc(URL.createObjectURL(await response.blob()));
      } catch (error) {
        console.error("Error fetching and storing video:", error);
      }
    }

    fetchVideo();
  }, []);

  console.log("Fetching video...From server", videoSrc);

  return (
    <div style={{ textAlign: "center" }}>
      {videoSrc && (
        <video controls>
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default VideoPlayer;
