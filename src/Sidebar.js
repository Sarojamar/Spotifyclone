  import React from "react";
  import "./Sidebar.css";

  function Sidebar() {
    return (
      <div className="sidebar">
        <div className="sidebar-menu">
          <a href="#">Home</a>
          <a href="#">Search</a>
          <a href="#">Your Library</a>
        </div>
        <div className="sidebar-playlists">
          <h4>Your Playlists</h4>
          <ul>
            <li>Playlist 1</li>
            <li>Playlist 2</li>
            <li>Playlist 3</li>
          </ul>
        </div>
      </div>
    );
  }

  export default Sidebar;
