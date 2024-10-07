import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Hls from 'hls.js';
import '../App.css'; // Ensure this is imported to use styles defined in App.css

const Player = ({ channels }) => {
  const { channelName } = useParams();
  const navigate = useNavigate();
  const channel = channels.find((ch) => ch.name === channelName);

  useEffect(() => {
    const video = document.getElementById('video');

    if (channel && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(channel.url);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        video.play(); // Play the video once the manifest is parsed
      });
    } else if (channel && video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = channel.url;
      video.play(); // Play the video once the source is set
    }

    return () => {
      if (video && video.hls) {
        video.hls.destroy();
      }
    };
  }, [channel]);

  if (!channel) return <p>Loading...</p>;

  // Function to toggle full screen
  const toggleFullScreen = () => {
    const video = document.getElementById('video');
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.mozRequestFullScreen) { // Firefox
      video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) { // Chrome, Safari and Opera
      video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) { // IE/Edge
      video.msRequestFullscreen();
    }
  };

  return (
    <div className="player-container">
      <video
        id="video"
        autoPlay
        className="video-player"
      />
      <div className="overlay">
        <h2 className="channel-title">
          Now Playing: {channel.name}
        </h2>
        <button onClick={toggleFullScreen} className="back-button">
          Full Screen
        </button>
        <button onClick={() => navigate('/')} className="back-button">
          Back to channels
        </button>
        
      </div>
    </div>
  );
};

export default Player;
