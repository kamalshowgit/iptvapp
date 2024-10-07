import React, { useEffect, useState } from 'react';
import ChannelList from './components/ChannelList';
import Menu from './components/Menu'; // Import the Menu component

const Categories = () => {
  const [categories, setCategories] = useState({});
  const [searchTerm, setSearchTerm] = useState(''); // Ensure this is initialized as a string

  useEffect(() => {
    const categoryPlaylists = [
      { category: 'Animation', url: 'https://iptv-org.github.io/iptv/categories/animation.m3u' },
      { category: 'Auto', url: 'https://iptv-org.github.io/iptv/categories/auto.m3u' },
      { category: 'Business', url: 'https://iptv-org.github.io/iptv/categories/business.m3u' },
      { category: 'Classic', url: 'https://iptv-org.github.io/iptv/categories/classic.m3u' },
      { category: 'Comedy', url: 'https://iptv-org.github.io/iptv/categories/comedy.m3u' },
      { category: 'Cooking', url: 'https://iptv-org.github.io/iptv/categories/cooking.m3u' },
      { category: 'Culture', url: 'https://iptv-org.github.io/iptv/categories/culture.m3u' },
      { category: 'Documentary', url: 'https://iptv-org.github.io/iptv/categories/documentary.m3u' },
      { category: 'Education', url: 'https://iptv-org.github.io/iptv/categories/education.m3u' },
      { category: 'Entertainment', url: 'https://iptv-org.github.io/iptv/categories/entertainment.m3u' },
      { category: 'Family', url: 'https://iptv-org.github.io/iptv/categories/family.m3u' },
      { category: 'General', url: 'https://iptv-org.github.io/iptv/categories/general.m3u' },
      { category: 'Kids', url: 'https://iptv-org.github.io/iptv/categories/kids.m3u' },
      { category: 'Legislative', url: 'https://iptv-org.github.io/iptv/categories/legislative.m3u' },
      { category: 'Lifestyle', url: 'https://iptv-org.github.io/iptv/categories/lifestyle.m3u' },
      { category: 'Movies', url: 'https://iptv-org.github.io/iptv/categories/movies.m3u' },
      { category: 'Music', url: 'https://iptv-org.github.io/iptv/categories/music.m3u' },
      { category: 'News', url: 'https://iptv-org.github.io/iptv/categories/news.m3u' },
      { category: 'Outdoor', url: 'https://iptv-org.github.io/iptv/categories/outdoor.m3u' },
      { category: 'Relax', url: 'https://iptv-org.github.io/iptv/categories/relax.m3u' },
      { category: 'Religious', url: 'https://iptv-org.github.io/iptv/categories/religious.m3u' },
      { category: 'Science', url: 'https://iptv-org.github.io/iptv/categories/science.m3u' },
      { category: 'Series', url: 'https://iptv-org.github.io/iptv/categories/series.m3u' },
      { category: 'Shop', url: 'https://iptv-org.github.io/iptv/categories/shop.m3u' },
      { category: 'Sports', url: 'https://iptv-org.github.io/iptv/categories/sports.m3u' },
      { category: 'Travel', url: 'https://iptv-org.github.io/iptv/categories/travel.m3u' },
      { category: 'Weather', url: 'https://iptv-org.github.io/iptv/categories/weather.m3u' },
      { category: 'XXX', url: 'https://iptv-org.github.io/iptv/categories/xxx.m3u' },
      { category: 'Undefined', url: 'https://iptv-org.github.io/iptv/categories/undefined.m3u' },
    ];

    const fetchCategories = async () => {
      const categoryData = {};
      for (const { category, url } of categoryPlaylists) {
        const response = await fetch(url);
        const data = await response.text();
        categoryData[category] = parseM3U(data);
      }
      setCategories(categoryData);
    };

    fetchCategories();
  }, []);

  const parseM3U = (data) => {
    const lines = data.split('\n');
    const parsedChannels = [];
    let currentChannel = {};

    lines.forEach(line => {
      if (line.startsWith('#EXTINF')) {
        currentChannel = { name: line.split(',')[1].trim() }; // Trim whitespace
      } else if (line.startsWith('http')) {
        currentChannel.url = line.trim(); // Trim whitespace
        // Set icon URL if available, or you can set a default icon
        currentChannel.iconUrl = `https://example.com/icons/${currentChannel.name.replace(/\s+/g, '-')}.png`; // Example icon URL
        parsedChannels.push(currentChannel);
      }
    });

    return parsedChannels;
  };

  // Filtering channels by search term
  const filteredChannels = Object.entries(categories).map(([category, channels]) => {
    const filtered = channels.filter(channel =>
      channel.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return { category, channels: filtered };
  }).filter(category => category.channels.length > 0); // Only include categories with matching channels

  return (
    <div className="categories">
      <Menu onSearch={setSearchTerm} /> {/* Pass setSearchTerm to Menu */}
      {/* <h1>Channels Grouped by Category</h1> */}
      {filteredChannels.length > 0 ? (
        filteredChannels.map(({ category, channels }) => (
          <div key={category} className="category">
            <h2>{category}</h2>
            <ChannelList channels={channels} />
          </div>
        ))
      ) : (
        <p>No channels found.</p>
      )}
    </div>
  );
};

export default Categories;
