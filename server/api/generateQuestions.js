import { ollamaPrompt } from '~/components/ollama.js';

export default defineEventHandler(async (event) => {

  function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

  const query = getQuery(event);
  const { topic } = query;


  let questions = await generateQuestions(topic);

  if(isJsonString(questions)){
    return JSON.parse(questions);
  }else {
    console.log('Failed to parse questions. Trying one more time.');
    questions = await generateQuestions(topic);
    return JSON.parse(questions);
  }
});

export const generateQuestions = (topic) => {

  const initialPrompt =  `Generate 3 short and simple questions regarding the topic "${topic}".
  Only generate questions that you are confident you have the answer to.
  Answer in raw JSON ONLY.
  The response must be completely valid JSON. It will be parsed.
  The format of the json will always be exactly [{"question":""},{"question":""},{"question":""}].
  Don't forget the commas in between the curly brackets.
  A question should always end with a question mark.`;

  const chatGptPrompt = `
  Generate 3 short, clear, and objective questions related to the topic "${topic}".
- Only generate questions that are fact-based, unambiguous, and have clear, correct answers. Avoid subjective or open-ended questions.
- Ensure that each question has an easily identifiable, verifiable answer. If you are unsure about the answer, do not generate the question.
- Questions should be simple and concise, appropriate for a quiz format, and easily gradable.
- Avoid tricky wording or ambiguous phrasing. The questions should require factual or straightforward answers.
- Do not generate multiple choice questions.

The response must be in valid JSON format as follows:
[{"question":""},{"question":""},{"question":""}]

Make sure every question ends with a question mark and is suitable for AI-assisted grading. Only respond with valid JSON, and do not add any extra text.`

  return ollamaPrompt(chatGptPrompt);
};
