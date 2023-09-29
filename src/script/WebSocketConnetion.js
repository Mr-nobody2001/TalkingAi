const newSocket = io("ws://localhost:8080");

newSocket.on("connect", () => {
  console.log("WebSocket connection opened.");
});

newSocket.on("disconnect", () => {
  console.log("WebSocket connection closed.");
});

import { loadNextAudio } from "./AudioPlayerLogic.js";
import { showChatDisplay } from "./ChatDisplayLogic.js";
import { removeChatingIndicator } from "./ConversationIndicatorLogic.js";

const audioList = [];
const textList = [];
let isFirst = true;

const chatDisplayVisible = document.querySelector("#chat_display > p");

newSocket.on("on response", (response) => {
  if (response.status === 2) {
    let currentAudio = loadNextAudio(response.responseAudio);
    currentAudio.addEventListener("ended", handleAudioEnded);

    audioList.push(currentAudio);
    textList.push(response.responseText);

    if (isFirst) {
      const audio = audioList.shift();
      audio.addEventListener("loadedmetadata", showResponse);
      isFirst = false;
    }
  }
});

const handleAudioEnded = () => {
  if (audioList.length > 0) {
    const audio = audioList.shift();
    audio.duration
      ? showResponse(audio)
      : audio.addEventListener("loadedmetadata", showResponse);
  } else {
    setTimeout(() => {
      chatDisplayVisible.innerHTML = "" 
      removeChatingIndicator();
    }, 1000);
    isFirst = true;
  }
};

const showResponse = (e) => {
  const audio = e.target || e;
  const audioDuration = audio.duration;
  showChatDisplay(textList.shift(), audioDuration, audio);
};

export default newSocket;
