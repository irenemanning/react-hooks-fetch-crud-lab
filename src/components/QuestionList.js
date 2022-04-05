import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([])

  useEffect(()=>{
    fetch("http://localhost:4000/questions")
    .then((r)=>r.json())
    .then((questionData)=>{
      setQuestions(questionData)
      
    })
  }, [])
  function deleteHandler(id){
    setQuestions(questions.filter((question)=>question.id !== id))
  }
  const questionItems = questions.map((question)=> (
    <QuestionItem
    question={question}
    deleteHandler={deleteHandler}
    key={question.id}
    />
  ))
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;
