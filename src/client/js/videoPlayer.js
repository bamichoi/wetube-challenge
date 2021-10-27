import regeneratorRuntime from "regenerator-runtime";

const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const playIco = playBtn.querySelector("i")
const muteBtn = document.getElementById("mute");
const muteIco = muteBtn.querySelector("i")
const volumeRange = document.getElementById("volume");
const currenTime = document.getElementById("currenTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const fullscreenIco = fullScreenBtn.querySelector("i")
const videoPlayer = document.getElementById("videoPlayer");
const videoController = document.getElementById("videoController");

let controllerTimeout = null;
let controllerMovementTimeout = null;
let volumeValue = 0.5;
video.volume = volumeValue;

const handleEnded = async () => {
  const videoId = videoPlayer.dataset.id
  await fetch(`/api/videos/${videoId}/view`, {
    method : "POST"
  });
}

const hideController = () => videoController.classList.remove("showing");

const handleMouseMove = () => {
  if (controllerTimeout) {
    clearTimeout(controllerTimeout);
    controllerTimeout = null;
  }
  if (controllerMovementTimeout) {
    clearTimeout(controllerMovementTimeout);
    controllerMovementTimeout = null;
  }
  videoController.classList.add("showing");
  controllerMovementTimeout = setTimeout(hideController, 3000);
};

const handleMouseLeave = () => {
  controllerTimeout = setTimeout(hideController, 3000);
};

const handleFullscreen = () => {
    const fullscreen = document.fullscreenElement;
    if (fullscreen) {
      document.exitFullscreen();
      fullscreenIco.className = "fas fa-expand";
      videoController.classList.remove("full")
    } else {
      videoPlayer.requestFullscreen();
      fullscreenIco.className = "fas fa-compress";
      videoController.classList.add("full")
    }
  };

  
const formatTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substr(11, 8);

const handleLoadedMetadata = () => {
  console.log(video.duration)
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};

const handleTimeUpdate = () => {
  currenTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};

const handleTimelineChange = (e) => {
  const {
    target: { value },
  } = e;
  video.currentTime = value;
};

const handleVolumeChange = (e) => {
    const {
      target: { value },
    } = e;
    if (video.muted) {
      video.muted = false;
      muteBtn.innerText = "Mute";
    }
    volumeValue = value;
    video.volume = value;
  };

const handleMuteClick = () => {
    if (video.muted) {
      video.muted = false;
    } else {
      video.muted = true;
    }
    muteIco.className = video.muted ? "fas fa-volume-up" : "fas fa-volume-mute";
    volumeRange.value = video.muted ? 0 : volumeValue;
  };

const handlePlayClick = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playIco.className = video.paused ? "fas fa-play" : "fas fa-pause";
};



playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMuteClick);
volumeRange.addEventListener("input", handleVolumeChange);
timeline.addEventListener("input", handleTimelineChange);
fullScreenBtn.addEventListener("click", handleFullscreen);
video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
video.addEventListener("mousemove", handleMouseMove);
video.addEventListener("mouseleave", handleMouseLeave);
video.addEventListener("ended", handleEnded);