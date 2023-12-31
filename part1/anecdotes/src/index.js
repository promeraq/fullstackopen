import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [voted, setVoted] = useState({});
  const [mostVoted, setMostVoted] = useState();

  const randomAnecdote = () => {
    const num = Math.floor(Math.random() * anecdotes.length);
    setSelected(num);
  };

  const voteAnecdote = () => {
    const newVotes = { ...voted };
    console.log(newVotes);
    newVotes[selected] = (newVotes[selected] || 0) + 1;
    setVoted(newVotes);

    const maxKey = Object.keys(newVotes).reduce((a, b) =>
      newVotes[a] > newVotes[b] ? a : b
    );
    setMostVoted(maxKey);
  };

  return (
    <>
      <h2>Anecdote of the day</h2>
      <div>{props.anecdotes[selected]}</div>
      <div>
        <button onClick={voteAnecdote}>vote</button>
        <button onClick={randomAnecdote}>next anecdote</button>
      </div>
      <h2>Anecdote with more votes</h2>
      <p>{props.anecdotes[mostVoted]}</p>
    </>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
