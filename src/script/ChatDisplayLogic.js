import { playAudio } from "./AudioPlayerLogic.js";
import { insertChatingIndicator } from "./ConversationIndicatorLogic.js";

const chatDisplay = document.querySelector("#chat_display > p");

export const showChatDisplay = (text, audioDuration, audio) => {
  chatDisplay.innerHTML = "";

  const textLenght = textSpanTokenizer(text);

  const intervalDuration = (((audioDuration - 1) / textLenght) * 1000).toFixed(
    0
  );

  let currentIndex = 0;
  const spans = chatDisplay.querySelectorAll("span");

  // Makes spans visible
  const removeGrayClass = () => {
    if (currentIndex < textLenght) {
      spans[currentIndex].classList.remove("gray");
      currentIndex++;
    } else {
      clearInterval(interval);
    }
  };

  insertChatingIndicator();
  playAudio(audio);

  const interval = setInterval(removeGrayClass, intervalDuration);
};

// Divide the sentence into tokens and insert it into the spans
const textSpanTokenizer = (text) => {
  const splitText = text.split(" ");
  let isFirst = true;

  for (const word of splitText) {
    const span = document.createElement("span");
    span.textContent = ` ${word}`;

    !isFirst ? span.classList.add("gray") : (isFirst = false);

    chatDisplay.appendChild(span);
  }

  return splitText.length;
};

