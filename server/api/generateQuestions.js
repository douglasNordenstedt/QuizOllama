import { ollamaPrompt } from '~/components/ollama.js';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { topic } = query;

  if (!topic) {
    return { error: 'Topic is required' };
  }

  const questions = await generateQuestions(topic);

  return JSON.parse(questions);
});

export const generateQuestions = (topic) => {
  return ollamaPrompt(`Generate 3 short questions regarding the topic "${topic}". The questions should always have an answer. Answer in raw JSON ONLY. The format of the json will always be exactly: [{"question":"","answer":""},{"question":"","answer":""},{"question":"","answer":""}]. Don't forget the commas in between the curly brackets. A question should always end with a question mark`);
};
