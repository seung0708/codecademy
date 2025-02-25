import React from "react";

export const Tile = ({key, name, description}) => {
  return (
    <div key={key} className="tile-container">
      <p className="tile-title">{name}</p>
      {Object.values(description).map((value, index) => (
        <p key={index} className="tile">{value}</p>
      ))}
    </div>
  );
};
