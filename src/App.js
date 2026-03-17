import React, { useState } from "react";
import Sidebar from "./Sidebar";
import "./App.css";
import MusicPlayer from "./MusicPlayer";
import Logo from './spot.png';

function App() {
  const [tracks, setTracks] = useState([]);
  const [playing, setPlaying] = useState(null);
  const [search, setSearch] = useState("");
  const [minimized, setMinimized] = useState(false);
  const [activePlaylist, setActivePlaylist] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

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
      setIsSearching(false);
      setActivePlaylist(null);
    } else {
      setIsSearching(true);
      setActivePlaylist(null);
      getTracks(query);
    }
  };

  // Load playlist on click from Sidebar
  const loadPlaylist = (playlist) => {
    setActivePlaylist(playlist.name);
    setIsSearching(false);
    setSearch("");
    getTracks(playlist.query);
  };

  // Play or pause track
  const togglePlayPause = (track) => {
    if (playing === track.id) {
      setPlaying(null);
    } else {
      setPlaying(track.id);
    }
  };

  // Stop playback
  const stopPlayback = () => {
    setPlaying(null);
    setMinimized(false);
  };

  // Minimize player
  const toggleMinimize = () => {
    setMinimized(!minimized);
  };

  return (
    <div className="app">
      <Sidebar
        onPlaylistClick={loadPlaylist}
        activePlaylist={activePlaylist}
      />

      <div className="content">
        <nav className="navbar">
          <section className="container">
            <img src={Logo} style={{ width: '100px', height: '100px' }} alt="Logo" />
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

        {/* Welcome screen - shown when nothing is selected */}
        {!isSearching && !activePlaylist && (
          <div style={{ color: "white", padding: "40px 20px", textAlign: "center" }}>
            <h2>👋 Welcome to Spotify Clone</h2>
            <p style={{ color: "#b3b3b3", marginTop: "10px" }}>
              Select a playlist from the sidebar or search for your favourite music.
            </p>
          </div>
        )}

        {/* Tracks List */}
        {(isSearching || activePlaylist) && (
          <div>
            {/* Back button when inside a playlist */}
            {activePlaylist && (
              <div style={{ padding: "10px 20px" }}>
                <button
                  onClick={() => { setActivePlaylist(null); setTracks([]); }}
                  style={{
                    background: "none",
                    border: "1px solid white",
                    color: "white",
                    padding: "6px 14px",
                    borderRadius: "20px",
                    cursor: "pointer"
                  }}
                >
                  ← Back
                </button>
                <h2 style={{ color: "white", display: "inline", marginLeft: "15px" }}>
                  {activePlaylist}
                </h2>
              </div>
            )}

            <div className="playlist">
              {tracks.length === 0 ? (
                <p style={{ color: "white", padding: "20px" }}>
                  No tracks found. Please try a search.
                </p>
              ) : (
                tracks.map((track) => (
                  <div
                    key={track.id}
                    className={`track-card ${playing === track.id ? "active" : ""}`}
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
                    {playing === track.id && (
                      <span style={{ color: "#1db954", marginLeft: "auto", fontSize: "20px" }}>
                        ▶
                      </span>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {playing && (
        <div className={`music-player ${minimized ? "minimized" : ""}`}>
          <MusicPlayer
            track={tracks.find((track) => track.id === playing)}
            onStop={stopPlayback}
            onMinimize={toggleMinimize}
          />
        </div>
      )}
    </div>
  );
}

export default App;