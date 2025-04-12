
let audio = document.getElementById('audio');
let visualizer = document.getElementById('visualizer');
let playBtn = document.getElementById('play-btn');
let pauseBtn = document.getElementById('pause-btn');
let volumeControl = document.getElementById('volume-control');
let audioContext = new AudioContext();
let analyser = audioContext.createAnalyser();
let source = audioContext.createMediaElementSource(audio);
source.connect(analyser);
analyser.connect(audioContext.destination);
let canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 200;
visualizer.appendChild(canvas);
let ctx = canvas.getContext('2d');
function drawVisualizer() {
  requestAnimationFrame(drawVisualizer);
  let freqData = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(freqData);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < freqData.length; i++) {
    let barHeight = freqData[i] / 2;
    let x = i * (canvas.width / freqData.length);
    let y = canvas.height - barHeight;
    ctx.fillStyle = `rgb(${barHeight}, 0, 0)`;
    ctx.fillRect(x, y, 2, barHeight);
  }
}
playBtn.addEventListener('click', () => {
  audio.play();
  drawVisualizer();
});
pauseBtn.addEventListener('click', () => {
  audio.pause();
});
volumeControl.addEventListener('input', () => {
  audio.volume = volumeControl.value;
});
audio.addEventListener('play', () => {
  drawVisualizer();
});
audio.addEventListener('pause', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});