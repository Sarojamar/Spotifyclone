import React from "react";
import "./Sidebar.css";

const DEFAULT_PLAYLISTS = [
  {
    name: "Top Hits 2024",
    query: "top hits 2024",
    cover: "https://picsum.photos/seed/tophits/150"
  },
  {
    name: "Bollywood Hits",
    query: "bollywood hits",
    cover: "https://picsum.photos/seed/bollywood/150"
  },
  {
    name: "Chill Vibes",
    query: "chill vibes",
    cover: "https://picsum.photos/seed/chillvibes/150"
  },
  {
    name: "Hip Hop Hits",
    query: "hip hop hits",
    cover: "https://picsum.photos/seed/hiphop/150"
  },
  {
    name: "Party Anthems",
    query: "party anthems",
    cover: "https://picsum.photos/seed/party/150"
  },
  {
    name: "Romantic Songs",
    query: "romantic songs",
    cover: "https://picsum.photos/seed/romantic/150"
  },
];

function Sidebar({ onPlaylistClick, activePlaylist }) {
  return (
    <div className="sidebar">
      <div className="sidebar-menu">
        <a href="/">Home</a>
      </div>

      <div className="sidebar-playlists">
        <h3 className="playlist-heading">Featured Playlists</h3>
        {DEFAULT_PLAYLISTS.map((playlist) => (
          <div
            key={playlist.name}
            className={`sidebar-playlist-item ${activePlaylist === playlist.name ? "active" : ""}`}
            onClick={() => onPlaylistClick(playlist)}
          >
            <img
              src={playlist.cover}
              alt={playlist.name}
              className="sidebar-playlist-cover"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/40x40?text=🎵";
              }}
            />
            <p className="sidebar-playlist-name">{playlist.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;