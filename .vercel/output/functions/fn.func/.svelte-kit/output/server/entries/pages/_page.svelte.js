import { c as create_ssr_component, e as escape, v as validate_component, d as each, f as add_attribute } from "../../chunks/index2.js";
import "sse.js";
const ChatMessage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { type } = $$props;
  let { message } = $$props;
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.message === void 0 && $$bindings.message && message !== void 0)
    $$bindings.message(message);
  return `<div class="${"chat " + escape(type === "user" ? "chat-end" : "chat-start", true) + " justify-end"}"><div class="${"chat-image avatar"}"><div class="${"w-10 rounded-full"}"><img src="${"https://ui-avatars.com/api/?name=" + escape(type === "user" ? "Me" : "B", true)}" alt="${escape(type, true) + " avatar"}"></div></div>
	<div class="${"chat-header"}">${escape(type === "user" ? "Me" : "Pepper")}</div>
	<div class="${"chat-bubble " + escape(
    type === "user" ? "chat-bubble-primary" : "chat-bubble-secondary",
    true
  )}">${escape(message)}</div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let query = "";
  let chatMessages = [];
  let scrollToDiv;
  return `<div class="${"flex flex-col pt-4 w-full px-8 items-center gap-2"}"><div><h1 class="${"text-2xl font-bold w-full text-center"}">Pepper</h1>
		<p class="${"text-sm italic"}">Powered by gpt-3.5-turbo</p></div>
	<div class="${"h-[500px] w-full bg-gray-900 rounded-md p-4 overflow-y-auto flex flex-col gap-4"}"><div class="${"flex flex-col gap-2"}">${validate_component(ChatMessage, "ChatMessage").$$render(
    $$result,
    {
      type: "assistant",
      message: "Hello, ask me anything you want!"
    },
    {},
    {}
  )}
			${each(chatMessages, (message) => {
    return `${validate_component(ChatMessage, "ChatMessage").$$render(
      $$result,
      {
        type: message.role,
        message: message.content
      },
      {},
      {}
    )}`;
  })}
			${``}
			${``}</div>
		<div class="${""}"${add_attribute("this", scrollToDiv, 0)}></div></div>
	<form class="${"flex w-full rounded-md gap-4 bg-gray-900 p-4"}"><input type="${"text"}" class="${"input input-bordered w-full"}" style="${"color: black;"}"${add_attribute("value", query, 0)}>
	<button type="${"submit"}" class="${"btn btn-accent"}">Send </button></form></div>`;
});
export {
  Page as default
};
