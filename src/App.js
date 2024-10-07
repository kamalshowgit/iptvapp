import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import ChannelList from './components/ChannelList';
import Categories from './Categories'; // Import the new Categories component
import Player from './components/Player';
import Menu from './components/Menu';
import './App.css';

function App() {
  const [channels, setChannels] = useState([]);
  const [filteredChannels, setFilteredChannels] = useState([]);

  useEffect(() => {
    fetch('https://iptv-org.github.io/iptv/index.m3u')
      .then(response => response.text())
      .then(data => {
        const parsedChannels = parseM3U(data);
        setChannels(parsedChannels);
        setFilteredChannels(parsedChannels);
      });
  }, []);

  const parseM3U = (data) => {
    const lines = data.split('\n');
    const parsedChannels = [];
    let currentChannel = {};

    lines.forEach(line => {
      if (line.startsWith('#EXTINF')) {
        currentChannel = { name: line.split(',')[1].trim() };
      } else if (line.startsWith('http')) {
        currentChannel.url = line.trim();
        parsedChannels.push(currentChannel);
      }
    });

    return parsedChannels;
  };



  return (
    <Router>
      <div className="app">
        <Routes>
          {/* <Route path="/" element={<ChannelList channels={filteredChannels} />} /> */}
          <Route path="/" element={<Categories />} />
          <Route path="/player/:channelName" element={<Player channels={channels} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
