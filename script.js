const shareButton = document.querySelector("#share-button");
const storyButton = document.querySelector("#story-button");
const quickDownloadButton = document.querySelector("#story-quick-download");
const storyDialog = document.querySelector("#story-dialog");
const storyPreview = document.querySelector("#story-preview");
const storyCanvas = document.querySelector("#story-canvas");
const storyShareButton = document.querySelector("#story-share");
const storyDownloadButton = document.querySelector("#story-download");
const storyCloseButton = document.querySelector("#story-close");
const storyVariantButtons = document.querySelectorAll("[data-story-variant]");
const storySecondaryButton = document.querySelector("#story-button-secondary");
const storySecondaryDownload = document.querySelector("#story-download-secondary");
const toast = document.querySelector("#toast");
const revealItems = document.querySelectorAll("[data-reveal]");

const STORY_URL = "https://muhrafi-fsdev.github.io/rafi-links/";
const STORY_LINKS = [
  { index: "01", title: "Portfolio", detail: "Project pilihan dan eksperimen" },
  { index: "02", title: "GitHub", detail: "Code, repository, dan eksperimen teknis" },
  { index: "03", title: "LinkedIn", detail: "Profil profesional dan koneksi" },
  { index: "04", title: "Instagram", detail: "Aktivitas dan pembaruan personal" },
];

let toastTimer;
let storyObjectUrl = "";
let currentStoryVariant = "aesthetic";

function showToast(message) {
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2400);
}

function setupScrollReveal() {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!revealItems.length || reducedMotion || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -40px",
  });

  revealItems.forEach((item) => observer.observe(item));
  document.documentElement.classList.add("reveal-enabled");
}

function legacyCopy(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  textarea.style.pointerEvents = "none";
  document.body.append(textarea);
  textarea.select();

  let copied = false;
  try {
    copied = document.execCommand("copy");
  } finally {
    textarea.remove();
  }

  if (!copied) throw new Error("Clipboard fallback failed");
}

async function copyPageUrl() {
  if (navigator.clipboard?.writeText && window.isSecureContext) {
    await navigator.clipboard.writeText(window.location.href);
    return;
  }

  legacyCopy(window.location.href);
}

async function sharePage() {
  const shareData = {
    title: document.title,
    text: "Kunjungi karya dan project Muhammad Rafi Priyo di bidang web, AI, IoT, dan cybersecurity.",
    url: window.location.href,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return;
    } catch (error) {
      if (error.name === "AbortError") return;
    }
  }

  try {
    await copyPageUrl();
    showToast("Tautan berhasil disalin.");
  } catch {
    showToast("Salin alamat halaman melalui bilah alamat browser.");
  }
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

function roundRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = "";

  words.forEach((word) => {
    const testLine = line ? `${line} ${word}` : word;
    if (ctx.measureText(testLine).width <= maxWidth) {
      line = testLine;
    } else {
      if (line) lines.push(line);
      line = word;
    }
  });

  if (line) lines.push(line);
  lines.forEach((currentLine, index) => ctx.fillText(currentLine, x, y + index * lineHeight));
  return lines.length;
}

function setStoryVariant(variant) {
  currentStoryVariant = variant;
  storyVariantButtons.forEach((button) => {
    const isActive = button.dataset.storyVariant === variant;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function storyFileName(variant = currentStoryVariant) {
  return variant === "minimal" ? "rafi-links-story-minimal.png" : "rafi-links-story-estetik.png";
}

function drawStoryGrid(ctx, width, height, step = 64, opacity = 0.07) {
  ctx.save();
  ctx.strokeStyle = `rgba(255,255,255,${opacity})`;
  ctx.lineWidth = 1;
  for (let x = 0; x <= width; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y <= height; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  ctx.restore();
}

function drawProfileCrop(ctx, image, x, y, width, height, grayscale = true) {
  const imageRatio = image.width / image.height;
  const boxRatio = width / height;
  let sourceWidth = image.width;
  let sourceHeight = image.height;
  let sourceX = 0;
  let sourceY = 0;

  if (imageRatio > boxRatio) {
    sourceWidth = image.height * boxRatio;
    sourceX = (image.width - sourceWidth) / 2;
  } else {
    sourceHeight = image.width / boxRatio;
    sourceY = Math.max(0, (image.height - sourceHeight) * 0.34);
  }

  ctx.save();
  if (grayscale) ctx.filter = "grayscale(1) contrast(1.14) brightness(1.04)";
  ctx.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height);
  ctx.restore();
}

function drawAestheticStory(ctx, width, height, assets) {
  const blue = "#174fd6";
  const ink = "#111111";
  const paper = "#f4f3ef";
  const white = "#fffefa";
  const pad = 70;

  ctx.fillStyle = ink;
  ctx.fillRect(0, 0, width, height);
  drawStoryGrid(ctx, width, height, 72, 0.065);

  ctx.fillStyle = blue;
  ctx.fillRect(width - 220, 0, 220, height);

  ctx.strokeStyle = "rgba(255,255,255,.8)";
  ctx.lineWidth = 2;
  ctx.strokeRect(pad, pad, width - pad * 2, height - pad * 2);

  ctx.fillStyle = white;
  ctx.font = '600 24px "SFMono-Regular", Consolas, monospace';
  ctx.fillText("MRP / PERSONAL DIRECTORY / 2026", pad + 28, pad + 54);

  ctx.fillStyle = "rgba(255,255,255,.58)";
  ctx.font = '500 22px "SFMono-Regular", Consolas, monospace';
  ctx.fillText("WEB  AI  IOT  NETWORK  SECURITY", pad + 28, pad + 94);

  ctx.save();
  ctx.translate(width - 76, 330);
  ctx.rotate(Math.PI / 2);
  ctx.fillStyle = white;
  ctx.font = '600 22px "SFMono-Regular", Consolas, monospace';
  ctx.fillText("RAFI LINKS / INSTAGRAM STORY", 0, 0);
  ctx.restore();

  ctx.fillStyle = white;
  ctx.font = '900 162px "Arial Narrow", "Helvetica Neue", Arial, sans-serif';
  ctx.fillText("RAFI", pad + 28, 350);
  ctx.strokeStyle = white;
  ctx.lineWidth = 4;
  ctx.strokeText("LINKS", pad + 112, 495);

  ctx.fillStyle = blue;
  ctx.fillRect(pad + 30, 548, 315, 58);
  ctx.fillStyle = white;
  ctx.font = '700 26px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText("BUILD / TEST / LEARN", pad + 50, 586);

  ctx.fillStyle = "rgba(255,255,255,.72)";
  ctx.font = '400 31px "Helvetica Neue", Arial, sans-serif';
  drawWrappedText(ctx, "Portfolio, source code, professional profile, dan personal updates dalam satu halaman.", pad + 30, 680, 640, 46);

  ctx.strokeStyle = "rgba(255,255,255,.34)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(pad + 30, 820);
  ctx.lineTo(width - pad - 250, 820);
  ctx.stroke();

  STORY_LINKS.forEach((item, index) => {
    const y = 900 + index * 126;
    ctx.fillStyle = "#7fa4ff";
    ctx.font = '600 22px "SFMono-Regular", Consolas, monospace';
    ctx.fillText(item.index, pad + 30, y);

    ctx.fillStyle = white;
    ctx.font = '900 54px "Arial Narrow", "Helvetica Neue", Arial, sans-serif';
    ctx.fillText(item.title.toUpperCase(), pad + 108, y + 8);

    ctx.fillStyle = "rgba(255,255,255,.52)";
    ctx.font = '400 22px "Helvetica Neue", Arial, sans-serif';
    ctx.fillText(item.detail, pad + 110, y + 42);

    ctx.strokeStyle = "rgba(255,255,255,.16)";
    ctx.beginPath();
    ctx.moveTo(pad + 30, y + 72);
    ctx.lineTo(width - pad - 250, y + 72);
    ctx.stroke();
  });

  const photoX = 570;
  const photoY = 855;
  const photoW = 390;
  const photoH = 680;
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(photoX + 44, photoY);
  ctx.lineTo(photoX + photoW, photoY);
  ctx.lineTo(photoX + photoW, photoY + photoH);
  ctx.lineTo(photoX, photoY + photoH);
  ctx.lineTo(photoX, photoY + 96);
  ctx.closePath();
  ctx.clip();
  drawProfileCrop(ctx, assets.profileImage, photoX, photoY, photoW, photoH, true);
  ctx.restore();
  ctx.strokeStyle = "rgba(255,255,255,.8)";
  ctx.lineWidth = 2;
  ctx.strokeRect(photoX, photoY, photoW, photoH);

  ctx.strokeStyle = blue;
  ctx.lineWidth = 9;
  ctx.beginPath();
  ctx.arc(742, 1188, 238, Math.PI * .18, Math.PI * 1.48);
  ctx.stroke();

  ctx.fillStyle = paper;
  ctx.fillRect(pad + 28, height - 316, 250, 250);
  ctx.drawImage(assets.qrImage, pad + 48, height - 296, 210, 210);

  ctx.fillStyle = white;
  ctx.font = '600 24px "SFMono-Regular", Consolas, monospace';
  ctx.fillText("SCAN / OPEN", pad + 316, height - 220);
  ctx.font = '900 66px "Arial Narrow", "Helvetica Neue", Arial, sans-serif';
  ctx.fillText("RAFI LINKS", pad + 316, height - 142);
  ctx.fillStyle = "rgba(255,255,255,.58)";
  ctx.font = '400 25px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText(STORY_URL.replace(/^https?:\/\//, ""), pad + 316, height - 96);

  ctx.fillStyle = white;
  for (let i = 0; i < 5; i += 1) {
    for (let j = 0; j < 5; j += 1) {
      if ((i + j) % 2 === 0) ctx.fillRect(width - 170 + i * 16, height - 178 + j * 16, 16, 16);
    }
  }
}

function drawMinimalStory(ctx, width, height, assets) {
  const blue = "#174fd6";
  const ink = "#111111";
  const paper = "#f4f3ef";
  const muted = "#6b6b66";
  const pad = 78;

  ctx.fillStyle = paper;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "rgba(17,17,17,.09)";
  ctx.lineWidth = 1;
  for (let x = 0; x <= width; x += 72) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y <= height; y += 72) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  ctx.strokeStyle = ink;
  ctx.lineWidth = 2;
  ctx.strokeRect(pad, pad, width - pad * 2, height - pad * 2);

  ctx.fillStyle = blue;
  ctx.fillRect(pad, pad, 86, 86);
  ctx.fillStyle = "#fffefa";
  ctx.font = '900 48px "Arial Narrow", "Helvetica Neue", Arial, sans-serif';
  ctx.fillText("R", pad + 27, pad + 58);

  ctx.fillStyle = ink;
  ctx.font = '600 24px "SFMono-Regular", Consolas, monospace';
  ctx.fillText("MUHAMMAD RAFI PRIYO", pad + 118, pad + 38);
  ctx.fillStyle = muted;
  ctx.font = '500 21px "SFMono-Regular", Consolas, monospace';
  ctx.fillText("PERSONAL INDEX / 2026", pad + 118, pad + 74);

  ctx.fillStyle = ink;
  ctx.font = '900 152px "Arial Narrow", "Helvetica Neue", Arial, sans-serif';
  ctx.fillText("RAFI", pad + 24, 340);
  ctx.strokeStyle = ink;
  ctx.lineWidth = 4;
  ctx.strokeText("LINKS", pad + 108, 474);

  ctx.fillStyle = blue;
  ctx.fillRect(width - pad - 148, 248, 148, 148);
  ctx.fillStyle = white;
  ctx.font = '900 74px "Arial Narrow", "Helvetica Neue", Arial, sans-serif';
  ctx.fillText("↘", width - pad - 114, 350);

  ctx.fillStyle = muted;
  ctx.font = '400 31px "Helvetica Neue", Arial, sans-serif';
  drawWrappedText(ctx, "Four links. One place. No unnecessary noise.", pad + 28, 590, 610, 46);

  ctx.strokeStyle = ink;
  ctx.beginPath();
  ctx.moveTo(pad, 710);
  ctx.lineTo(width - pad, 710);
  ctx.stroke();

  STORY_LINKS.forEach((item, index) => {
    const y = 820 + index * 130;
    ctx.fillStyle = blue;
    ctx.font = '600 22px "SFMono-Regular", Consolas, monospace';
    ctx.fillText(item.index, pad + 24, y);
    ctx.fillStyle = ink;
    ctx.font = '900 58px "Arial Narrow", "Helvetica Neue", Arial, sans-serif';
    ctx.fillText(item.title.toUpperCase(), pad + 106, y + 8);
    ctx.fillStyle = muted;
    ctx.font = '400 22px "Helvetica Neue", Arial, sans-serif';
    ctx.fillText(item.detail, pad + 110, y + 42);
    ctx.strokeStyle = "rgba(17,17,17,.18)";
    ctx.beginPath();
    ctx.moveTo(pad + 24, y + 76);
    ctx.lineTo(width - pad - 24, y + 76);
    ctx.stroke();
  });

  const photoX = width - pad - 302;
  const photoY = 740;
  const photoW = 260;
  const photoH = 520;
  ctx.save();
  ctx.globalAlpha = .96;
  drawProfileCrop(ctx, assets.profileImage, photoX, photoY, photoW, photoH, true);
  ctx.restore();
  ctx.strokeStyle = ink;
  ctx.lineWidth = 2;
  ctx.strokeRect(photoX, photoY, photoW, photoH);

  ctx.fillStyle = paper;
  ctx.fillRect(pad + 24, height - 320, 226, 226);
  ctx.strokeStyle = ink;
  ctx.strokeRect(pad + 24, height - 320, 226, 226);
  ctx.drawImage(assets.qrImage, pad + 40, height - 304, 194, 194);

  ctx.fillStyle = blue;
  ctx.font = '600 23px "SFMono-Regular", Consolas, monospace';
  ctx.fillText("DIRECT ACCESS", pad + 292, height - 232);
  ctx.fillStyle = ink;
  ctx.font = '900 68px "Arial Narrow", "Helvetica Neue", Arial, sans-serif';
  ctx.fillText("SCAN TO OPEN", pad + 292, height - 150);
  ctx.fillStyle = muted;
  ctx.font = '400 25px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText(STORY_URL.replace(/^https?:\/\//, ""), pad + 292, height - 104);
}

async function renderStoryCard(variant = currentStoryVariant) {
  if (!storyCanvas) return null;
  if (document.fonts?.ready) {
    try { await document.fonts.ready; } catch {}
  }

  const ctx = storyCanvas.getContext("2d");
  if (!ctx) return null;

  const width = storyCanvas.width;
  const height = storyCanvas.height;
  ctx.clearRect(0, 0, width, height);

  const [badgeImage, qrImage, profileImage] = await Promise.all([
    loadImage("assets/favicon-r.png"),
    loadImage("assets/qr-rafilinks.png"),
    loadImage("assets/rafi-profile.jpg"),
  ]);

  const assets = { badgeImage, qrImage, profileImage };

  if (variant === "minimal") {
    drawMinimalStory(ctx, width, height, assets);
  } else {
    drawAestheticStory(ctx, width, height, assets);
  }

  return new Promise((resolve, reject) => {
    storyCanvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("Story image could not be generated"));
        return;
      }

      if (storyObjectUrl) URL.revokeObjectURL(storyObjectUrl);
      storyObjectUrl = URL.createObjectURL(blob);
      if (storyPreview) storyPreview.src = storyObjectUrl;
      resolve(new File([blob], storyFileName(variant), { type: "image/png" }));
    }, "image/png");
  });
}

async function ensureStoryFile(variant = currentStoryVariant) {
  return renderStoryCard(variant);
}

async function openStoryDialog() {
  if (!storyDialog) return;

  try {
    await ensureStoryFile(currentStoryVariant);
    if (typeof storyDialog.showModal === "function") {
      storyDialog.showModal();
    } else {
      storyDialog.setAttribute("open", "open");
    }
  } catch {
    showToast("Preview story belum bisa dibuat.");
  }
}

function closeStoryDialog() {
  if (!storyDialog) return;
  if (typeof storyDialog.close === "function") {
    storyDialog.close();
  } else {
    storyDialog.removeAttribute("open");
  }
}

async function downloadStory(variant = currentStoryVariant) {
  try {
    await ensureStoryFile(variant);
    const link = document.createElement("a");
    link.href = storyObjectUrl;
    link.download = storyFileName(variant);
    document.body.append(link);
    link.click();
    link.remove();
    showToast(variant === "minimal" ? "Story minimalis berhasil diunduh." : "Story estetik berhasil diunduh.");
  } catch {
    showToast("File story belum bisa diunduh.");
  }
}

async function shareStoryFile() {
  try {
    const storyFile = await ensureStoryFile(currentStoryVariant);
    const shareData = {
      files: [storyFile],
      title: currentStoryVariant === "minimal" ? "Rafi Links Story Minimal" : "Rafi Links Story Estetik",
      text: "Rafi Links — portfolio, code, dan profil Muhammad Rafi Priyo.",
    };

    if (navigator.canShare?.(shareData) && navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (error) {
        if (error.name === "AbortError") return;
      }
    }

    await downloadStory(currentStoryVariant);
  } catch {
    showToast("Bagikan story belum tersedia di perangkat ini.");
  }
}

async function handleVariantChange(variant) {
  setStoryVariant(variant);
  if (storyDialog?.open) {
    try {
      await ensureStoryFile(variant);
    } catch {
      showToast("Versi story belum bisa dimuat.");
    }
  }
}

shareButton?.addEventListener("click", sharePage);
storyButton?.addEventListener("click", openStoryDialog);
storySecondaryButton?.addEventListener("click", openStoryDialog);
storySecondaryDownload?.addEventListener("click", () => downloadStory("aesthetic"));
quickDownloadButton?.addEventListener("click", () => downloadStory("aesthetic"));
storyShareButton?.addEventListener("click", shareStoryFile);
storyDownloadButton?.addEventListener("click", () => downloadStory(currentStoryVariant));
storyCloseButton?.addEventListener("click", closeStoryDialog);
storyVariantButtons.forEach((button) => {
  button.addEventListener("click", () => handleVariantChange(button.dataset.storyVariant));
});

storyDialog?.addEventListener("click", (event) => {
  const bounds = storyDialog.getBoundingClientRect();
  const isOutside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
  if (isOutside) closeStoryDialog();
});

storyDialog?.addEventListener("close", () => {
  storyCloseButton?.blur();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && storyDialog?.open) closeStoryDialog();
});

setupScrollReveal();
