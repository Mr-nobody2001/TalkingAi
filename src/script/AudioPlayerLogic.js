export const loadNextAudio = (responseAudio) => {
  let currentAudio = new Audio(responseAudio);
  currentAudio.load();
  return currentAudio;
};

export const playAudio = (audio) => {
  audio.play();
};
