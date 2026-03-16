import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "./App.css";
import MusicPlayer from "./MusicPlayer";
import Logo from './spot.png'

function App() {
  const [tracks, setTracks] = useState([]);
  const [playing, setPlaying] = useState(null); // Currently playing track ID
  const [search, setSearch] = useState("");
  const [minimized, setMinimized] = useState(false);

  // Fetch tracks from API
  const getTracks = async (query) => {
    try {
      const response = await fetch(
        `https://v1.nocodeapi.com/sarojamaresh/spotify/XsSxXIqJeccNUtUc/search?q=${query}&type=track`
      );
      const data = await response.json();
      setTracks(data.tracks.items);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Search tracks
  const searchTracks = (query) => {
    if (query === "") {
      setTracks([]);
    } else {
      getTracks(query);
    }
  };

  // Play or pause track
  const togglePlayPause = (track) => {
    if (playing === track.id) {
      setPlaying(null); // Pause the same track
    } else {
      setPlaying(track.id); // Play a new track
    }
  };

  // Stop playback
  const stopPlayback = () => {
    setPlaying(null); // Reset playing state
    setMinimized(false); // Reset minimization
  };

  // Minimize player
  const toggleMinimize = () => {
    setMinimized(!minimized);
  };

  return (
    <div className="app">
      <Sidebar />
     
      <div className="content">
      <nav className="navbar">
      <div className="logo">
     
    </div>
  <section className="container">
  <img src={Logo}
        style={{ width: '100px', height: '100px' }} 
        
        />
  <input
            type="text"
            className="search-input"
            placeholder="Search for music"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyUp={() => searchTracks(search)}
          />
  </section>
</nav>

        <div className="playlist">
          {tracks.length === 0 ? (
            <p>No tracks found. Please try a search.</p>
          ) : (
            tracks.map((track) => (
              <div
                key={track.id}
                className="track-card"
                onClick={() => togglePlayPause(track)}
              >
                <img
                  src={track.album.images[0]?.url}
                  alt={track.name}
                  className="track-image"
                />
                <div className="track-details">
                  <h3>{track.name}</h3>
                  <p>{track.artists[0]?.name}</p>
                  <p>{track.album.name}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {playing && (
        <div
          className={`music-player ${minimized ? "minimized" : ""}`}
        >
          <MusicPlayer
            track={tracks.find((track) => track.id === playing)}
            onStop={stopPlayback} // Pass stopPlayback to MusicPlayer
            onMinimize={toggleMinimize} // Pass toggleMinimize to MusicPlayer
          />
        </div>
      )}
    </div>
  );
}

export default App;
