const conversationIndicator = document.querySelector("#conversation_indicator");

export const insertChatingIndicator = () => {
  conversationIndicator.classList.add("conversation_indicator_chating");
};

export const removeChatingIndicator = () => {
  conversationIndicator.classList.remove("conversation_indicator_chating");
};
