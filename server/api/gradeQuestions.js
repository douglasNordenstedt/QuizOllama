//[{"question":"","answer":""},{"question":"","answer":""},{"question":"","answer":""}]

import { ollamaPrompt } from '~/components/ollama.js';

export default defineEventHandler(async (event) => {
  const answers = getQuery(event);
  console.log("first answer:" + answers.answerOne);
  
  const questions = await gradeQuestions(answers);

  return JSON.parse(questions);
});

export const gradeQuestions = (answers) => {
  return ollamaPrompt(`
    You will grade the answers to these questions from 1-10 according to how well you think they have been answered. Here are the questions and the answers:
    firstQuestion: "${answers.questionOne}", firstAnswer: "${answers.answerOne}"
    secondQuestion: "${answers.questionTwo}", secondAnswer: "${answers.answerTwo}"
    thirdQuestion: "${answers.questionThree}", thirdAnswer: "${answers.answerThree}"
    Respond with a JSON object that contains two parameters per question: the score that you give the answered question and how you would have answered the question.
    The "answer" parameter is how you would have answered and the "grade" parameter the score that you give the answer to that question. 
    Answer in raw JSON ONLY.
    The format of the json will always be exactly [{"answer":"","grade":""},{"answer":"","grade":""},{"answer":"","grade":""}].
    The name of the parameters should always have double quotes.
    Don't forget the commas in between the curly brackets.
    `);
};