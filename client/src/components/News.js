import React, { useEffect, useState } from "react";
import TopNavigations from "./TopNavigations";

function News() {
  let [score, setScore] = useState(0);
  let [show, setShow] = useState(true);
  let [wickets,setWickets] = useState(0);

  useEffect(() => {
    console.log("on score component loaded");

    return () => {
      console.log("on score component unload");
    };
  }, []);

  useEffect(()=>{
    console.log("score changes")
  },[score])

  useEffect(()=>{
    console.log("wickets changes")
  },[wickets])

  const emojis = ["😀", "😁", "😂", "😎", "😍", "🥳", "🤩", "😇", "🤗", "🤔"];

  return (
    <div>
      <TopNavigations />
      <button
        onClick={() => {
          if (show == true) {
            setShow(false);
          } else {
            setShow(true);
          }
        }}
      >
        load/unload Components
      </button>
      {show == true ? (
        <h2>
          {score}/{wickets}
          {emojis[Math.abs(score) % emojis.length]}
        </h2>
      ) : null}

      <button
        type="button"
        onClick={() => {
          setScore(score + 1);
        }}
      >
        Score+
      </button>

      <button
        onClick={() => {
          setScore(score - 1);
        }}
      >
        score-
      </button>
      <hr></hr>

      <button
        type="button"
        onClick={() => {
          setWickets(wickets + 1);
        }}
      >
        wickets+
      </button>

      <button
        onClick={() => {
          setWickets(wickets - 1);
        }}
      >
        wickets-
      </button>
    </div>
  );
}

export default News;
