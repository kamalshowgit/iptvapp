import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

const ChannelList = ({ channels }) => {
  const navigate = useNavigate();
  const channelContainerRef = useRef(null);

  const handleChannelClick = (channel) => {
    navigate(`/player/${channel.name}`); // Navigate to the player page with channel name
  };

  const scrollRight = () => {
    if (channelContainerRef.current) {
      channelContainerRef.current.scrollBy({
        top: 0,
        left: 500, // Scroll right by 500 pixels
        behavior: 'smooth',
      });
    }
  };

  const scrollLeft = () => {
    if (channelContainerRef.current) {
      channelContainerRef.current.scrollBy({
        top: 0,
        left: -500, // Scroll left by 500 pixels
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="channel-list">
      <div className="channel-grid-wrapper">
        <button onClick={scrollLeft} className="scroll-button-left" aria-label="Scroll Left">
          <FaChevronLeft size={30} />
        </button>

        <div className="channel-grid" ref={channelContainerRef}>
          {channels.length > 0 ? (
            channels.slice(0, 10000000).map((channel, index) => (
              <div
                key={index}
                className="channel-item"
                onClick={() => handleChannelClick(channel)}
                role="button" // Accessibility improvement
                tabIndex={0} // Makes the item focusable for keyboard users
                onKeyPress={(e) => {
                  if (e.key === 'Enter') handleChannelClick(channel); // Keyboard navigation support
                }}
              >
                <div className="inside-channel-grid-font">{channel.name}</div>
              </div>
            ))
          ) : (
            <p>No channels available</p> // Message when no channels are available
          )}
        </div>

        <button onClick={scrollRight} className="scroll-button-right" aria-label="Scroll Right">
          <FaChevronRight size={30} />
        </button>
      </div>
    </div>
  );
};

export default ChannelList;
