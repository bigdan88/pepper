import GPT3TokenizerImport from "gpt3-tokenizer";
import { j as json } from "../../../../chunks/index.js";
import { Configuration, OpenAIApi } from "openai";
import "fs";
const OPENAI_KEY = "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";
const GPT3Tokenizer = typeof GPT3TokenizerImport === "function" ? GPT3TokenizerImport : GPT3TokenizerImport.default;
const tokenizer = new GPT3Tokenizer({ type: "gpt3" });
function getTokens(input) {
  const tokens = tokenizer.encode(input);
  return tokens.text.length;
}
const reference_data = [`Additional Info
Daniel Han was born on April 7, 1988, and holds both American and Argentinian citizenship. He was born in Argentina but is ethnically Korean. Throughout his life, he has lived in various cities including Buenos Aires (Argentina), Seoul (South Korea), Atlanta (Georgia), Detroit (Michigan), Boston (Massachusetts), and Charleston (South Carolina).

In addition to his professional work and personal hobbies, Daniel is deeply interested in a variety of fields including physics, monetary policy, economics, philosophy, psychology, how the brain works, and anthropology. He is particularly drawn to the work of physicist Richard Feynman, whose approach to physics and scientific inquiry has been an inspiration to him. Daniel admires Feynman's ability to make physics accessible to a wide audience and to approach complex problems with a creative and curious mindset.

Outside of physics, Daniel is also a fan of comedian Colin Mochrie, and is fascinated by his creative process. He seeks to emulate Mochrie's ability to think on his feet and come up with inventive ideas and humor. Additionally, Daniel has great admiration for author and internet personality John Green, whose work in promoting positive causes and building online communities has been a source of inspiration to him.

Daniel is passionate about collaboration and teamwork and values building strong relationships with colleagues and friends. He believes that working together and sharing knowledge is essential for success.`, `Hobbies
Outside of his professional work, Daniel enjoys various hobbies and activities. Some of his hobbies include:

Playing the guitar: Daniel has been playing the guitar for over 10 years and enjoys practicing and learning new songs in his free time. He finds playing the guitar to be a relaxing and creative outlet.

Hiking and backpacking: Daniel loves to explore the outdoors and often goes on hiking and backpacking trips with his friends and family. He enjoys the physical challenge of hiking and the opportunity to disconnect from technology and immerse himself in nature.

Traveling: Daniel enjoys traveling and learning about new cultures and experiences. He has traveled to various countries throughout his life and believes that travel is a valuable way to gain new perspectives and broaden one's horizons.

Reading: Daniel is an avid reader and enjoys reading books on a wide range of topics, including science fiction, philosophy, and history. He believes that reading is a great way to learn new things and challenge one's assumptions.

Gaming: Daniel enjoys playing video games and board games with his friends and family. He finds gaming to be a fun way to unwind and connect with others.

Cycling: Daniel has recently taken up cycling as a new hobby and enjoys going on long rides through scenic routes. He finds it to be a great way to stay active and explore new areas. He has even built his own road bike using components from Aliexpress.

Golf: Daniel has also recently started playing golf and enjoys the challenge and strategy involved in the sport. He finds it to be a fun way to spend time outdoors and connect with others. He also customizes his own golf clubs by using aftermarket shafts and adjusting swing weights at home.

Modifying espresso machines: Daniel has a passion for coffee and enjoys tinkering with espresso machines to improve their functionality and performance. He currently uses a custom Pasquini Livia 90 where he modded temperature control to use PID, and gave it pressure profiling capabilities. He also uses a DF64 coffee grinder. He is currently working on making his own coffee roaster and is using a Behmor 1600 for the time being.

Roasting coffee: Daniel has also recently taken up roasting his own coffee beans at home. He enjoys experimenting with different roast profiles and flavors to create his perfect cup of coffee.`, `Work Experience
MIT Lincoln Labs - Engineer (February 2020-Present)
At MIT Lincoln Labs, Daniel serves as an engineer and works on two projects: LEMNOS and P2484.

LEMNOS
LEMNOS is a lasercom project where high-speed communications are being developed with the moon and ISS. Daniel's role in the project is to create tests to qualify and give confidence to the system. He works with optical engineers to create test routines to ensure that everything is calibrated and still within specifications. Most of this work is done with Python to integrate several platforms and coordinate together so tests could be automated.

P2484
P2484 is a classified system, but Daniel's role is as a unit lead. As a unit lead, he takes his system and makes sure it meets all of the sponsor's requirements. He then gets the system through all the testing campaigns to deliver to the sponsor.

DHM Enterprises - COO (January 2018-January 2020)
At DHM Enterprises, a startup that engages in retail arbitrage, Daniel served as the COO from January 2018 to January 2020. He developed a Phoenix Elixir app that scrapes the internet looking for arbitrage opportunities and sold said items on other platforms. This enterprise also included managing an overseas customer support team.

LG Electronics - Design Release Engineer (2014-2015)
At LG Electronics, Daniel served as a Design Release Engineer and designed and supported camera systems for ADAS. He managed lab technicians to deliver prototypes, evaluated emerging technologies and vendors, and more.

Panasonic Automotive Systems of America - R&D Electrical Engineer (2015-2017)
At Panasonic Automotive Systems of America, Daniel served as an R&D Electrical Engineer and had a top-secret security clearance. He managed lab technicians to deliver prototypes, designed and supported camera systems for ADAS, evaluated emerging technologies and vendors, and more.

Other Experience
In addition to his work experience, Daniel has also worked as an Electronics Lab Instructor at the Georgia Institute of Technology, a Research Assistant at The Citadel, and as an Intern at the National Plasma Physics Institute of Argentina.`, `LG Electronics - Design Release Engineer (July 2017-December 2019)
At LG Electronics, Vehicle Components, Daniel served as a Design Release Engineer and worked on a team supplying infotainment systems to GM. He managed multiple engineering teams in multiple locations and relayed that information to the customer. He reported to directors and customers on project progress and status, and collaborated with cross-functional teams to ensure that project timelines and milestones were met. Daniel also evaluated emerging technologies and vendors to ensure that LG's infotainment systems remained competitive in the marketplace.

Panasonic Automotive Systems of America - R&D Electrical Engineer (July 2011-December 2013, May 2016-June 2017)
At Panasonic Automotive Systems of America, Daniel served as an R&D Electrical Engineer and had a top-secret security clearance. During his first tenure, he worked to design and develop advanced automotive infotainment systems targeted at vehicles to be built 4-6 years from now. His designs included multiple LCD displays, Ethernet, WiFi, Bluetooth, PCIe, USB, multiple digital and analog audio busses, and multi-processor ARM Cortex A family SoC devices. He used the Zuken suite to input the designs onto the Panasonic Agile system.

During his second tenure, Daniel worked to design and support camera systems for ADAS, driver monitoring, and occupant monitoring. His team used IR cameras to monitor user attention using machine learning. They also evaluated the use of radars to detect occupants. Daniel's role in the project was to design and develop the hardware and software required to integrate the camera systems into the vehicle. He worked closely with software and mechanical engineers to ensure that the camera systems met all requirements and were integrated seamlessly into the vehicle's design.

Throughout his tenure at Panasonic, Daniel managed lab technicians to deliver prototypes, evaluated emerging technologies and vendors, and collaborated with cross-functional teams to ensure that project timelines and milestones were met. He also had a top-secret security clearance and worked on classified projects.

Other Experience
In addition to his work experience, Daniel has also worked as an Electronics Lab Instructor at the Georgia Institute of Technology, a Research Assistant at The Citadel, and as an Intern at the National Plasma Physics Institute of Argentina.`, `Pepper is an AI assistant developed by Daniel Han that is designed to answer questions about him. It is a svelte app that uses a combination of semantic search and prompt engineering to provide accurate and relevant information.

Pepper's main function is to summarize Daniel's knowledge, skills, and experience in a concise and user-friendly way. To do this, the app performs semantic search on a knowledge corpus to identify the most relevant information about Daniel. This allows Pepper to quickly and efficiently provide accurate and useful information to users.

Once the relevant information has been identified, Pepper uses prompt engineering to generate natural language responses to user queries. This process involves analyzing the user's question and generating a response that is clear, concise, and informative. The responses are designed to be easily understood by users with varying levels of technical knowledge.

Pepper's predecessor, Benji, performed a similar function but interacted with the GPT-3 language model directly. However, Pepper uses a more streamlined approach that combines semantic search and prompt engineering to provide a faster and more accurate user experience.

Pepper is hosted on Vercel, which provides a fast and reliable hosting solution for the app. The app is designed to be user-friendly and easy to navigate, with a clean and intuitive interface.

One interesting aspect of Pepper is that it is named after Daniel's dog, a mini goldendoodle. This personal touch adds a unique and friendly element to the app, making it feel more approachable and relatable to users.

Overall, Pepper is an impressive AI assistant that demonstrates Daniel's expertise in natural language processing and AI technology. It provides a valuable service by summarizing Daniel's knowledge and experience in a way that is accessible and useful to a wide range of users.`, `Projects
BENJI
BENJI is a chatbot that resides on Daniel's personal website and serves as an interactive platform for users to learn more about him. The chatbot uses some prompt engineering, semantic search, and OpenAI's GPT-3 API to provide users with information about Daniel. There are plans to upgrade BENJI to use OpenAI's new chatGPT API, which will allow for more advanced conversation capabilities and a richer user experience.

Garlic Bread Coin
Garlic Bread Coin is a cryptocurrency project that Daniel worked on as a fun side project to learn more about the world of crypto. He forked an Ethereum ERC-20 token to create Garlic Bread Coin, which was never traded on any exchanges, but at its peak, had 5 desktops mining the coin. Through this project, Daniel gained valuable experience and knowledge about the intricacies of cryptocurrency development.

Project MNEMOS
Project MNEMOS was a project that Daniel worked on in 2019 with the goal of improving human memory. The project involved the user wearing a camera all day to record video of their day, which they would then upload to a server where it would be processed using machine learning. The video would be analyzed using object detection, and the audio would be transcribed using speech recognition. The end goal was to make all this searchable, but unfortunately, the project became economically prohibitive, and was never fully realized.

Udacity Capstone Project: Programming a Real Self-Driving Car
As part of the Udacity Self-Driving Car Engineer Nanodegree Program, Daniel completed the Capstone Project, where he applied his machine learning projects from the nanodegree to a real-life application. He and his team were given access to a real car, which they programmed to follow the lane and identify road signs. They used reinforcement learning to train the car to follow the road, and a VGG deep learning architecture to identify road signs. This project provided Daniel with valuable experience in applying machine learning techniques to real-world problems.

Pepper
Pepper is a project that Daniel started in 2023 as an experimentation of an Artificial Cognitive Entity (ACOG) that uses systems engineering to experiment with AGIs. Pepper is Daniel's own version of a chatbot, inspired by earlier versions of BENJI. It takes a user message, tokenizes it, performs semantic search over previous conversations, searches for external sources, calls OpenAI's GPT-3 API, and responds. To scale its memory, Pepper uses other technologies such as FAISS. This project has allowed Daniel to further explore and experiment with large language models (LLMs) and AGI, and develop new skills and knowledge in this area.

Other Projects
Daniel has also worked on various projects throughout his career, including designing and developing advanced automotive infotainment systems targeted at vehicles to be built 4-6 years from now, designing new platforms that allowed the integration of new software development for future products, and working on camera systems for ADAS, driver monitoring, and occupant monitoring. He has also evaluated emerging technologies and vendors to ensure that his projects remained competitive in the marketplace.`, `Technical Skills:

Programming Languages: Python (10 years), C++ (5 years), JavaScript (6 years), Elixir (4 years)

Web Development: React (2 years), Node.js (6 years), HTML (5 years), CSS (5 years), Phoenix (4 years), Svelte (1 year)

Hardware: PCB Layout (10 years), Microcontrollers (PIC & Atmel) (12 years), Op-Amp Design (6 years), Mixed Signal Boards (6 years), RFID Hardware Design for ARM Cortex Systems (6 years), Wireless Communication (10 years), Integrated Circuit Board Building (10 years), Technician Skills (Soldering, Quick Prototyping, etc.)

Software: Zuken, Git, Circuit Board Design, Agile System, Raspberry Pi

AI & Data Science: Natural Language Processing, Machine Learning, Deep Learning, Computer Vision, Kalman Filters, Particle Filters

Other: Program Management, Sensor Fusion, SCRUM, EMC, EMI, RF Engineering, Blockchain, 3D Printing

Languages: Fluent in English, Korean, and Spanish`, `Daniel Han
Summary
Daniel Han is an accomplished electrical engineer with experience in various engineering roles. He holds a Bachelor of Science degree in Electrical Engineering from the Georgia Institute of Technology, an MBA from the Graduate School of Business at Seoul National University, and completed a Self-Driving Car Engineer Nanodegree Program through Udacity. With extensive experience in program management, sensor fusion, Kalman Filters, Python, SCRUM, and GIT, Daniel has worked on various cutting-edge technologies such as ADAS camera systems, space communication systems, and more.

Education
Self-Driving Car Engineer Nanodegree Program, Udacity
The Self-Driving Car Engineer Nanodegree Program is an intensive program that teaches students how to build autonomous vehicles from scratch. Daniel completed this program, which covers topics such as deep learning, computer vision, sensor fusion, and more.

MBA, Graduate School of Business at Seoul National University
The MBA program at Seoul National University is a rigorous program that covers topics such as management, finance, marketing, and more. Daniel completed this program and gained valuable skills in business administration.

Bachelor of Science in Electrical Engineering, Georgia Institute of Technology
The Bachelor of Science program in Electrical Engineering at Georgia Tech is a comprehensive program that covers topics such as circuits, control systems, electromagnetics, and more. Daniel completed this program and gained a solid foundation in electrical engineering.`];
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
    research_files = reference_data;
  } catch (err) {
    console.log(err);
  }
  const research_logs = [];
  for (const file of research_files) {
    const content = file;
    const research_embedding = await gpt3_embedding(content);
    const score = similarity(tokenized_input, research_embedding);
    research_logs.push({ file, vector: research_embedding, score });
  }
  const ordered_research_logs = research_logs.sort((a, b) => b.score - a.score);
  const top_research_logs = ordered_research_logs.slice(0, count);
  const combined_content = top_research_logs.map((log) => log.file).join("\n");
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
    const research = await fetch_research(reqMessages[reqMessages.length - 1].content, 4);
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
