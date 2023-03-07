import GPT3TokenizerImport from "gpt3-tokenizer";
import { j as json } from "../../../../chunks/index.js";
import { Configuration, OpenAIApi } from "openai";
import * as fs from "fs";
const OPENAI_KEY = "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";
const GPT3Tokenizer = typeof GPT3TokenizerImport === "function" ? GPT3TokenizerImport : GPT3TokenizerImport.default;
const tokenizer = new GPT3Tokenizer({ type: "gpt3" });
function getTokens(input) {
  const tokens = tokenizer.encode(input);
  return tokens.text.length;
}
const configuration$1 = new Configuration({
  apiKey: process.env.OPENAI_KEY
});
new OpenAIApi(configuration$1);
function similarity(v1, v2) {
  const dotProduct = v1.reduce((acc, curr, i) => acc + curr * v2[i], 0);
  const normV1 = Math.sqrt(v1.reduce((acc, curr) => acc + curr ** 2, 0));
  const normV2 = Math.sqrt(v2.reduce((acc, curr) => acc + curr ** 2, 0));
  return dotProduct / (normV1 * normV2);
}
async function fetch_research(input, count) {
  const tokenized_input = await gpt3_embedding(input);
  let research_files;
  try {
    research_files = fs.readdirSync("./src/lib/dan_info");
  } catch (err) {
    console.log(err);
  }
  const research_logs = [];
  for (const file of research_files) {
    debugger;
    const content = fs.readFileSync(`${"./src/lib/dan_info"}/${file}`, "utf8");
    const research_embedding = await gpt3_embedding(content);
    const score = similarity(tokenized_input, research_embedding);
    research_logs.push({ file, vector: research_embedding, score });
  }
  const ordered_research_logs = research_logs.sort((a, b) => b.score - a.score);
  const top_research_logs = ordered_research_logs.slice(0, count);
  const combined_content = top_research_logs.map((log) => fs.readFileSync(`${"./src/lib/dan_info"}/${log.file}`, "utf8")).join("\n");
  const notes_prompt = 'Write detailed notes of the following in a hyphenated list format like "- ". Include any relevant dates.\n\n<<INPUT>>\n\nNOTES:';
  const notes = notes_prompt.replace("<<INPUT>>", combined_content);
  return notes;
}
async function gpt3_embedding(text) {
  const response = await fetch("https://api.openai.com/v1/embeddings", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_KEY}`
    },
    method: "POST",
    body: JSON.stringify({
      input: text,
      model: "text-embedding-ada-002"
    })
  });
  const embedding = await response.json();
  return embedding.data[0].embedding;
}
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
new OpenAIApi(configuration);
const POST = async ({ request }) => {
  try {
    if (!OPENAI_KEY)
      ;
    const requestData = await request.json();
    if (!requestData) {
      throw new Error("No request data");
    }
    const reqMessages = requestData.messages;
    if (!reqMessages) {
      throw new Error("no messages provided");
    }
    let tokenCount = 0;
    reqMessages.forEach((msg) => {
      const tokens = getTokens(msg.content);
      tokenCount += tokens;
    });
    const moderationRes = await fetch("https://api.openai.com/v1/moderations", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_KEY}`
      },
      method: "POST",
      body: JSON.stringify({
        input: reqMessages[reqMessages.length - 1].content
      })
    });
    const moderationData = await moderationRes.json();
    const [results] = moderationData.results;
    if (results.flagged) {
      throw new Error("Query flagged by openai");
    }
    const research = await fetch_research(reqMessages[reqMessages.length - 1].content);
    const summarized_research = await fetch("https://api.openai.com/v1/completions", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_KEY}`
      },
      method: "POST",
      body: JSON.stringify({
        prompt: research,
        temperature: 0.2,
        max_tokens: 400,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: ["\n"]
      })
    });
    const prompt = "You are a virtual assistant for Daniel Han. Your name is Pepper. Your purpose is to answer questions about Daniel Han from notes below. Please try to keep the conversation about him. <<NOTES>>";
    tokenCount += getTokens(prompt);
    if (tokenCount >= 4e3) {
      throw new Error("Query too large");
    }
    const messages = [
      { role: "system", content: prompt.replace("<<NOTES>>", research) },
      ...reqMessages
    ];
    const chatRequestOpts = {
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0.9,
      stream: true
    };
    const chatResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      headers: {
        Authorization: `Bearer ${OPENAI_KEY}`,
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(chatRequestOpts)
    });
    if (!chatResponse.ok) {
      const err = await chatResponse.json();
      throw new Error(err);
    }
    return new Response(chatResponse.body, {
      headers: {
        "Content-Type": "text/event-stream"
      }
    });
  } catch (err) {
    console.error(err);
    return json({ error: "There was an error processing your request" }, { status: 500 });
  }
};
export {
  POST
};
