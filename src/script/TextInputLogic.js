import newSocket from "./WebSocketConnetion.js";

const sendButtonImg = document.querySelector("#send_button > img");
const sendButton = document.querySelector("#send_button");
const textArea = document.querySelector("#text_area");
const chatDisplay = document.querySelector("#chat_display > p");

const switchButtonState = (e) => {
  if (e.target.value) {
    sendButtonImg.className = "send_button_enable_img";
    sendButton.className = "send_button send_button_enable"
  } else {
    sendButtonImg.className = "send_button_disable_img";
    sendButton.className = "send_button send_button_disable"
  }
};

const sendInputTextKey = (e) => {
  if (e.key === "Enter") {
    sendInputTextClick(e);
  }
};

const sendInputTextClick = (e) => {
  e.preventDefault();
  if (textArea.value) {
    const msg = {
      max_tokens: 256,
      text: textArea.value,
    };

    newSocket.emit("send chat", msg);
    sendButtonImg.className = "send_button_disable_img";
    sendButton.className = "send_button send_button_disable"
    chatDisplay.innerHTML = ". . ." 
    textArea.value = "";
  }
};

sendButton.addEventListener("click", sendInputTextClick);

textArea.addEventListener("keydown", sendInputTextKey);

textArea.addEventListener("input", switchButtonState);
