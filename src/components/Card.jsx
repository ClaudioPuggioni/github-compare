import React from "react";

export default function Card({ idx, src, title, body, rating, forks, repoLink, best, handleDelete }) {
  return (
    <div className="cardContainer" style={{ backgroundColor: best ? "#303030" : "#ffffff" }}>
      <img className="cardLogo" src={src} alt="repoLogo"></img>
      <div className="cardTitle" style={{ color: best ? "#ffffff" : "#000000" }}>
        {title}
      </div>
      <div className="cardBody" style={{ color: best ? "#ffffff" : "#000000" }}>
        {body}
      </div>
      <div className="ratingDiv" style={{ color: best ? "#ffffff" : "#000000" }}>
        <div>Stars ⭐:</div>
        <div className="rating">{rating}</div>
      </div>
      <div className="forksDiv" style={{ color: best ? "#ffffff" : "#000000" }}>
        <div>Forks ⛓️:</div>
        <div className="forks">{forks}</div>
      </div>
      <div className="btnDiv">
        <div onClick={() => handleDelete(idx)} className="btnRemove">
          Remove
        </div>
        <a href={repoLink} target="_blank" rel="noreferrer">
          <div className="btnVisit">Visit Repo</div>
        </a>
      </div>
    </div>
  );
}
