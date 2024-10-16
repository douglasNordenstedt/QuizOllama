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
    Here are the questions and what the student answered:
    First Question: "${answers.questionOne}", Student Answer: "${answers.answerOne}"
    Second Question: "${answers.questionTwo}", Student Answer: "${answers.answerTwo}" 
    Third Question: "${answers.questionThree}", Student Answer: "${answers.answerThree}"
    As a teacher, you will also need to respond whith the correctAnswer to every question. Imagine that you have already come up with the correct answers to the questions before looking at the students answers.
    Also, Score the students answers on a scale from 1-10 according to how close they were to your own answer. 10 being the closest/best and 1 being the farthest away/worst.
    Respond with a JSON object that contains two parameters per question: score, being the score that you give the students answer and the correctAnswer: how you would have answered the question in order to get a full score.
    When scoring the questions, Be forgiving when it comes to spelling.
    Answer in raw JSON ONLY.
    The response must be completely valid JSON. It will be parsed.
    The format of the json will always be exactly [{"correctAnswer":"","score":""},{"correctAnswer":"","score":""},{"correctAnswer":"","score":""}].
    Dont forget the quotes on the parameters.
    Don't forget the commas in between the curly brackets.
  `
  const alternativePrompt = `
    You will act as a peer in school during an exercise.
    First of all. Read these questions below and come up with a short answer. the topic is of the questions is "${answers.topic}":
    First Question: ${answers.questionOne}
    Second Question: ${answers.questionTwo}
    Third Question: ${answers.questionThree}
    Then, score my answers from a scale of one two ten based on how close i was to answering the same that you did. Here are my answers:
    My Answer: "${answers.answerOne}"
    My Answer: "${answers.answerTwo}" 
    My Answer: "${answers.answerThree}"
    Respond with a JSON object that contains two parameters per question, score, being the score that you give the my answer. And correctAnswer, being how you would have answered the question in order to get a full score.
    When scoring the questions, Be forgiving when it comes to spelling exactly right.
    Answer in raw JSON ONLY.
    The response must be completely valid JSON. It will be parsed.
    The format of the json will always be exactly [{"correctAnswer":"","score":""},{"correctAnswer":"","score":""},{"correctAnswer":"","score":""}].
    Dont forget the quotes on the parameters.
    Don't forget the commas in between the curly brackets.
`
  const chatGptPrompt = `
  You are a teacher tasked with grading a student's test. You will be provided with the student's answers and the questions they were asked. Your job is to:
  1. Use your knowledge to determine the correct answer to each question.
  2. Compare the student's answer to your correct answer and evaluate how close it is.
  3. Score the student's answer on a scale from 1-10. A score of:
   - **10** means the student's answer is exactly correct or very close, allowing for minor spelling or grammar mistakes.
   - **7-9** means the student's answer is mostly correct but might be missing some minor details or has some minor errors.
   - **4-6** means the student's answer is partially correct but lacks key information or has significant inaccuracies.
   - **1-3** means the answer is mostly incorrect or irrelevant to the question.
  4. If the student’s answer is close in meaning but has small inaccuracies, provide a higher score (7+), but if the answer misses critical information, reduce the score accordingly.
  5. Be forgiving when it comes to minor spelling or grammar errors. Focus primarily on the meaning of the answer.
  6. Respond with a JSON object containing two parameters per question:
   - 'correctAnswer': This is how you would answer the question correctly.
   - 'score': The score you assign the student based on their answer's accuracy and closeness to your correct answer.

Your response must be a valid JSON object in the following format:
[{"correctAnswer":"","score":""},{"correctAnswer":"","score":""},{"correctAnswer":"","score":""}]

Here are the student's answers:
First Question: "${answers.questionOne}", Student Answer: "${answers.answerOne}"
Second Question: "${answers.questionTwo}", Student Answer: "${answers.answerTwo}"
Third Question: "${answers.questionThree}", Student Answer: "${answers.answerThree}"

Remember to only provide a valid JSON response. Do not include any additional text or explanations.
  `
  return ollamaPrompt(initalPrompt);
}
