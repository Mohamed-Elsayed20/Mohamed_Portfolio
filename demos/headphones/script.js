const canvas = document.getElementById('hero-canvas');
const context = canvas.getContext('2d');
const scrollContainer = document.querySelector('.scroll-container');

const frameCount = 96;
const images = [];

function frameSrc(index) {
  return `frames/frame_${index.toString().padStart(4, '0')}.jpg`;
}


for (let i = 1; i <= frameCount; i++) {
  const img = new Image();
  img.src = frameSrc(i);
  images.push(img);
}

function drawFrame(index) {
  const img = images[index - 1];
  if (img.complete) {
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0);
  }
}

function updateFrameOnScroll() {
  const scrollTop = window.scrollY;
  const maxScroll = scrollContainer.offsetHeight - window.innerHeight;
  const scrollFraction = Math.min(Math.max(scrollTop / maxScroll, 0), 1);

  const frameIndex = Math.floor(scrollFraction * (frameCount - 1)) + 1;
  drawFrame(frameIndex);
}

images[0].onload = () => drawFrame(1);

window.addEventListener('scroll', updateFrameOnScroll, { passive: true });