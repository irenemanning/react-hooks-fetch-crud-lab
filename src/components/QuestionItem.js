import React from "react";

function QuestionItem({ question, deleteHandler }) {
  let { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));
    function handleDeleteQuestion() {
      fetch(`http://localhost:4000/questions/${id}`, {
        method: "DELETE"})
      .then((r)=>r.json())
      .then((data)=>{
        console.log(data)
        deleteHandler(id)
      })
    }

    function handleCorrectAnswer(e) {
      correctIndex = e.target.value
      console.log(e.target.value)
      fetch(`http://localhost:4000/questions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          'correctIndex': correctIndex 
        })
      })
      .then((r) => r.json())
      .then((data) => {
        console.log(data)
      })
    }
  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={handleCorrectAnswer} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleDeleteQuestion}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
