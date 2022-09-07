import React, { useEffect, useRef, useState } from "react";
import Card from "./Card";
import "./styles.css";

export default function UserInterface() {
  const inputRef = useRef(null);
  const [repos, setRepos] = useState([]);
  const [best, setBest] = useState(null);

  useEffect(() => {
    getBest();
    // eslint-disable-next-line
  }, [repos]);

  const handleClick = (input) => {
    let splitArr = input.split("/");
    if (splitArr.length !== 2) return;
    getRepo(splitArr[0], splitArr[1]);
  };
  const handleDelete = (idx) => {
    let copyRepos = [...repos];
    copyRepos.splice(idx, 1);
    setRepos(copyRepos);
  };

  async function getRepo(owner, repo, page = 1) {
    const URL = `https://api.github.com/users/${owner}/repos?per_page=30&page=${page}`;
    let response = await fetch(URL);
    let data = await response.json();
    for (let index = 0; index < data.length; index++) {
      if (data[index].name === repo) {
        data[index].best = false;
        setRepos((repos) => [...repos, data[index]]);
        break;
      }
      if (index === data.length - 1 && data[index].name !== repo) getRepo(owner, repo, page + 1);
    }
  }

  function getBest() {
    let max = -1;
    for (const repo of repos) {
      max = repo.stargazers_count > max ? repo.stargazers_count : max;
    }
    for (let index = 0; index < repos.length; index++) {
      if (repos[index].stargazers_count === max) setBest(index);
    }
  }

  return (
    <div id="container">
      <div id="header">
        <div id="appTitle">Compare Wars</div>
        <input onKeyDown={(e) => (e.key === "Enter" ? handleClick(e.target.value) : null)} ref={inputRef} type="text" />
        <button id="btnSubmit" onClick={() => handleClick(inputRef.current.value)}>
          Add for Comparison
        </button>
      </div>
      <div id="cards">
        {repos.length === 0
          ? null
          : repos.map((ele, idx) => (
              <Card
                key={`Repo${idx}`}
                idx={idx}
                src={ele.owner.avatar_url}
                title={ele.full_name}
                body={ele.description}
                rating={ele.stargazers_count}
                forks={ele.forks_count}
                best={best}
                repoLink={ele.owner.html_url}
                handleDelete={handleDelete}
              />
            ))}
      </div>
    </div>
  );
}
