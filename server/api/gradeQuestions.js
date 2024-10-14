//[{"question":"","answer":""},{"question":"","answer":""},{"question":"","answer":""}]

import { ollamaPrompt } from '~/components/ollama.js';

export default defineEventHandler(async (event) => {
  const answers = getQuery(event);  
  const questions = await gradeQuestions(answers);

  return JSON.parse(questions);
});

export const gradeQuestions = (answers) => {
  const initalPrompt = `
    You will act as a teacher grading a students test.
    Score the answers to these questions on a scale from 1-10 according to how factually correct they have been answered. 10 being the best and 1 being the worst.
    Here are the questions and what the student answered:
    First Question: "${answers.questionOne}", Student Answer: "${answers.answerOne}"
    Second Question: "${answers.questionTwo}", Student Answer: "${answers.answerTwo}" 
    Third Question: "${answers.questionThree}", Student Answer: "${answers.answerThree}"
    As a teacher, you will also need to respond whith the correctAnswer to every question. Imagine that you have already come up with the correct answers to the questions before looking at the students answers.
    Respond with a JSON object that contains two parameters per question: score, being the score that you give the students answer and the correctAnswer: how you would have answered the question in order to get a full score.
    Answer in raw JSON ONLY.
    The response must be completely valid JSON. It will be parsed.
    The format of the json will always be exactly [{"correctAnswer":"","score":""},{"correctAnswer":"","score":""},{"correctAnswer":"","score":""}].
    Dont forget the quotes on the parameters.
    Don't forget the commas in between the curly brackets.
  `
  const alternativePrompt = `
    You will act as a my personal teacher grading my test.
    First of all. Generate an answer to these questions:
    First Question: ${answers.questionOne}
    Second Question: ${answers.questionTwo}
    Third Question: ${answers.questionThree}
    Then, score my answers from a scale of one two ten based on how close i was to answering the same that you did. Here are my answers:
    Student Answer: "${answers.answerOne}"
    Student Answer: "${answers.answerTwo}" 
    Student Answer: "${answers.answerThree}"
    Respond with a JSON object that contains two parameters per question, score, being the score that you give the my answer. And correctAnswer, being how you would have answered the question in order to get a full score.
    Answer in raw JSON ONLY.
    The response must be completely valid JSON. It will be parsed.
    The format of the json will always be exactly [{"correctAnswer":"","score":""},{"correctAnswer":"","score":""},{"correctAnswer":"","score":""}].
    Dont forget the quotes on the parameters.
    Don't forget the commas in between the curly brackets.
`
  return ollamaPrompt(alternativePrompt);
}
