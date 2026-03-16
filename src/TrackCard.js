import React from "react";
import "./TrackCard.css";

function TrackCard({ track, setPlaying }) {
  const { title, artist, album, imageUrl, previewUrl } = track;

  return (
    <div className="track-card" onClick={() => setPlaying(track.id)}>
      <img src={imageUrl} alt={title} className="track-image" />
      <div className="track-details">
        <h3>{title}</h3>
        <p>{artist}</p>
        <p>{album}</p>
        <audio controls src={previewUrl}></audio>
      </div>
    </div>
  );
}

export default TrackCard;
  