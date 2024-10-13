//[{"question":"","answer":""},{"question":"","answer":""},{"question":"","answer":""}]

import { ollamaPrompt } from '~/components/ollama.js';

export default defineEventHandler(async (event) => {
  const answers = getQuery(event);  
  const questions = await gradeQuestions(answers);

  return JSON.parse(questions);
});

export const gradeQuestions = (answers) => {
  return ollamaPrompt(`
    You will act as a teacher grading a students test.
    Score the answers to these questions from 1-10 according to how well you think they have been answered. 10 being the best and 1 being the worst.
    Here are the questions and what the student answered:
    First Question: "${answers.questionOne}", First Answer: "${answers.answerOne}"
    Second Question: "${answers.questionTwo}", Second Answer: "${answers.answerTwo}" 
    Third Question: "${answers.questionThree}", Third Answer: "${answers.answerThree}"
    As a teacher, you will also need to confess the right answer to every question.
    Respond with a JSON object that contains two parameters per question: score, being the score that you give the students answer and the correctAnswer: how you would have answered the question.
    Answer in raw JSON ONLY.
    The response must be completely valid JSON. It will be parsed.
    The format of the json will always be exactly [{"correctAnswer":"","score":""},{"correctAnswer":"","score":""},{"correctAnswer":"","score":""}].
    Dont forget the quotes on the parameters.
    Don't forget the commas in between the curly brackets.
    `);
}