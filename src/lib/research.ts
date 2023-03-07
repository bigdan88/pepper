import { Configuration, OpenAIApi } from 'openai';
import * as fs from 'fs'
import { dot, norm } from 'mathjs'
import reference_data from './dan_info/reference_data';



export const config: Config = {
	runtime: 'edge'
}


const configuration = new Configuration({
    apiKey: process.env.OPENAI_KEY,
    });

    const openai = new OpenAIApi(configuration);

export async function get({ params }) {
    const { input } = params;
    const notes = fetch_research(input);
    return {
        body: notes
    }
}

interface ResearchLog {
    file: string
    vector: string
    score: number
  }

// function similarity(v1: number[], v2: number[]): number {
// 	return dot(v1, v2) / (norm(v1) * norm(v2))
// }

function similarity(v1: number[], v2: number[]): number {
	const dotProduct = v1.reduce((acc, curr, i) => acc + curr * v2[i], 0)
	const normV1 = Math.sqrt(v1.reduce((acc, curr) => acc + curr ** 2, 0))
	const normV2 = Math.sqrt(v2.reduce((acc, curr) => acc + curr ** 2, 0))
	return dotProduct / (normV1 * normV2)
}

export async function fetch_research(input: string, count: number): string {
    // tokenize the input with GPT-3
    const tokenized_input = await gpt3_embedding(input)
  
    //consol.log the current folders in this directory
    // get the research folder
    let research_files 
    try{
        // research_files = fs.readdirSync('./src/lib/dan_info')
        research_files = reference_data;
    } catch (err) {
        console.log(err)
    }

  
    // get the embeddings for each file
    const research_logs: ResearchLog[] = []
    for (const file of research_files) {
      // open file, get embedding, and then get similarity score in score variable
      debugger;
      // const content = fs.readFileSync(`${'./src/lib/dan_info'}/${file}`, 'utf8')
      const content = file
      const research_embedding = await gpt3_embedding(content)
      const score = similarity(tokenized_input, research_embedding)
  
      research_logs.push({ file, vector: research_embedding, score })
    }
  
    // sort the research logs by similarity score and select the top count
    const ordered_research_logs = research_logs.sort((a, b) => b.score - a.score)
    const top_research_logs = ordered_research_logs.slice(0, count)
  
    // concatenate the content of the top research logs into a single string
    const combined_content = top_research_logs.map(log => log.file).join('\n')
    // const combined_content = top_research_logs.map(log => fs.readFileSync(`${'./src/lib/dan_info'}/${log.file}`, 'utf8')).join('\n')
  
    // combine the concatenated content with the NOTES prompt
    const notes_prompt = 'Write detailed notes of the following in a hyphenated list format like "- ". Include any relevant dates.\n\n<<INPUT>>\n\nNOTES:'
    const notes = notes_prompt.replace('<<INPUT>>', combined_content)
  
    return notes
}
/* 
curl https://api.openai.com/v1/embeddings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{"input": "Your text string goes here",
       "model":"text-embedding-ada-002"}'
       */
async function gpt3_embedding(text: string): Promise<number[]> {
    const response = await fetch('https://api.openai.com/v1/embeddings', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_KEY}`
        },
        method: 'POST',
        body: JSON.stringify({
            input: text,
            model: 'text-embedding-ada-002'
        })
    })
    const embedding = await response.json()
    return embedding.data[0].embedding
}

	

// async function gpt3_embedding(text: string): Promise<string> {
// 	const response = await openai.embed(text, { model: 'text-davinci-003' })
// 	const embedding = response.data.embeddings[0]
// 	return embedding.join(',')
// }

// const moderationRes = await fetch('https://api.openai.com/v1/moderations', {
//     headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${OPENAI_KEY}`
//     },
//     method: 'POST',
//     body: JSON.stringify({
//         input: reqMessages[reqMessages.length - 1].content
//     })
// })

interface GPT3CompletionParams {
prompt: string
engine?: string
temp?: number
top_p?: number
tokens?: number
freq_pen?: number
pres_pen?: number
stop?: string[]
}

async function gpt3_completion({
	prompt,
	engine = 'text-davinci-003',
	temp = 0.0,
	top_p = 1.0,
	tokens = 400,
	freq_pen = 0.0,
	pres_pen = 0.0,
	stop = ['USER:', 'PEPPER:'],
  }: GPT3CompletionParams): Promise<string> {
	const max_retry = 5;
	let retry = 0;
	prompt = prompt.replace(/[^\x00-\x7F]/g, ''); // Remove non-ASCII characters
	while (true) {
	  try {
		const configuration = new Configuration({
		  apiKey: process.env.OPENAI_API_KEY,
		});
		const openai = new OpenAIApi(configuration);
		const response = await openai.createCompletion(engine, {
		  prompt,
		  temperature: temp,
		  maxTokens: tokens,
		  topP: top_p,
		  frequencyPenalty: freq_pen,
		  presencePenalty: pres_pen,
		  stop,
		});
		let text = response.choices[0].text.trim();
		text = text.replace(/\r\n/g, '\n');
		text = text.replace(/\t+/g, ' ');
		return text;
	  } catch (err) {
		if (err instanceof OpenAIError) {
		  retry += 1;
		  if (retry >= max_retry) {
			return `GPT3 error: ${err.message}`;
		  }
		  console.error(`Error communicating with OpenAI: ${err.message}`);
		  await new Promise((resolve) => setTimeout(resolve, 1000)); // wait 1 second before retrying
		} else {
		  throw err;
		}
	  }
	}
  }