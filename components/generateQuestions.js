import { ollamaPrompt } from "./ollama";
export const generateQuestions = (topic) => {
    return ollamaPrompt(`Generate 3 short questions regarding the topic "${topic}". The questions should always have an answer.Answer in raw JSON ONLY. The format of the json will always be exactly: [{"question":"","answer":""},{"question":"","answer":""},{"question":"","answer":""}]. Dont forget the commas in between the curly brackets`);
  };