import { Octokit } from "octokit";
import React, { useEffect, useRef, useState } from "react";
import Card from "./Card";
import "./styles.css";

export default function UserInterface() {
  const inputRef = useRef(null);
  const [repos, setRepos] = useState([]);

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

  async function getRepo(owner, repo) {
    const octokit = new Octokit({
      auth: "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",
    });
    let response = await octokit.request(`GET /repos/${owner}/${repo}`, {
      owner: owner,
      repo: repo,
    });
    response.data.best = false;
    setRepos((repos) => [...repos, response.data]);
  }

  function getBest() {
    let max = -1;
    for (const repo of repos) {
      max = repo.stargazers_count > max ? repo.stargazers_count : max;
    }
    for (const repo of repos) {
      repo.best = repo.stargazers_count === max ? true : false;
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
                best={ele.best}
                repoLink={ele.owner.html_url}
                handleDelete={handleDelete}
              />
            ))}
      </div>
    </div>
  );
}
