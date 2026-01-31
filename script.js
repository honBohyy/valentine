const heartsBox = document.getElementById("hearts");

function spawnHeart(){
  if(!heartsBox) return;

  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = "💗";

  const x = Math.random() * window.innerWidth;
  const duration = 3 + Math.random() * 4;
  const size = 14 + Math.random() * 18;

  heart.style.left = x + "px";
  heart.style.animationDuration = duration + "s";
  heart.style.fontSize = size + "px";

  heartsBox.appendChild(heart);
  setTimeout(() => heart.remove(), duration * 1000);
}
setInterval(spawnHeart, 200);

const yesBtn = document.getElementById("yesBtn");
const noBtn  = document.getElementById("noBtn");
const loveBtn = document.getElementById("loveBtn");
const msg = document.getElementById("message");

function isInBottomRightQuarter(xCenter, yCenter){
  const w = window.innerWidth;
  const h = window.innerHeight;
  return (xCenter > w * 0.5) && (yCenter > h * 0.5);
}

function isNearLoveButton(xCenter, yCenter){
  if(!loveBtn) return false;
  const r = loveBtn.getBoundingClientRect();
  const pad = 140;
  const left = r.left - pad;
  const top = r.top - pad;
  const right = r.right + pad;
  const bottom = r.bottom + pad;
  return (xCenter >= left && xCenter <= right && yCenter >= top && yCenter <= bottom);
}

function moveYesRandom(){
  if(!yesBtn) return;

  const w = window.innerWidth;
  const h = window.innerHeight;

  const btnRect = yesBtn.getBoundingClientRect();
  const bw = btnRect.width;
  const bh = btnRect.height;

  const margin = 20;

  const curRect = yesBtn.getBoundingClientRect();
  const curX = curRect.left;
  const curY = curRect.top;

  for(let i = 0; i < 200; i++){
    const x = margin + Math.random() * (w - bw - margin*2);
    const y = margin + Math.random() * (h - bh - margin*2);

    const xCenter = x + bw/2;
    const yCenter = y + bh/2;

    if(isInBottomRightQuarter(xCenter, yCenter)) continue;
    if(isNearLoveButton(xCenter, yCenter)) continue;

    const dx = x - curX;
    const dy = y - curY;
    const dist = Math.sqrt(dx*dx + dy*dy);
    if(dist < 160) continue;

    yesBtn.style.left = x + "px";
    yesBtn.style.top  = y + "px";
    return;
  }

  yesBtn.style.left = "80px";
  yesBtn.style.top  = "120px";
}

// hudba se spustí po prvním kliknutí kdekoliv
const music = document.getElementById("music");
if(music){
   document.addEventListener("click", () => {
    music.play();
  }, { once: true });
}

// YES: nejdřív je normálně ve flexu vedle NE.
// Po kliknutí se přepne na floating + teleport.
if(yesBtn){
  yesBtn.addEventListener("click", () => {
    if(!yesBtn.classList.contains("floating")){
      const r = yesBtn.getBoundingClientRect();
      yesBtn.classList.add("floating");
      yesBtn.style.left = r.left + "px";
      yesBtn.style.top  = r.top + "px";
    }
    moveYesRandom();
  });
}

// NO: hláška
if(noBtn){
  noBtn.addEventListener("click", () => {
    if(msg){
      msg.textContent = "Ou… tak nic 💔😔";
      msg.style.color = "#b91c1c";
    }
  });
}

// Tady bby -> druhá stránka
if(loveBtn){
  loveBtn.addEventListener("click", () => {
    window.location.href = "bby.html";
  });
}


const confettiCanvas = document.getElementById("confetti");

if(confettiCanvas){
  const ctx = confettiCanvas.getContext("2d");

  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;

  let pieces = [];

  // vytvoříme konfety částice
  for(let i = 0; i < 120; i++){
    pieces.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * confettiCanvas.height,
      size: 6 + Math.random() * 25,
      speed: 2 + Math.random() * 2,
      emoji: Math.random() > 0.5 ? "🎉" : "💖"
    });
  }

  function draw(){
    ctx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);

    pieces.forEach(p => {
      ctx.font = p.size + "px Arial";
      ctx.fillText(p.emoji, p.x, p.y);

      p.y += p.speed;

      // když spadne dolů, vrátí se nahoru
      if(p.y > confettiCanvas.height){
        p.y = -20;
        p.x = Math.random() * confettiCanvas.width;
      }
    });

    requestAnimationFrame(draw);
  }

  draw();

  window.addEventListener("resize", () => {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  });
}