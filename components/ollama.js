import ollama from 'ollama'

export async function ollamaPrompt(prompt){
  console.log(`Generating PROMPT...`)
  const response = await ollama.chat({
    model: 'llama3.2',
    messages: [{ role: 'user', content: prompt }],
  })
  console.log(response.message.content)
  return response.message.content;
}