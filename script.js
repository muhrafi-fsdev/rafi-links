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

function drawAestheticBackground(ctx, width, height) {
  const baseGradient = ctx.createLinearGradient(0, 0, width, height);
  baseGradient.addColorStop(0, "#f5f2ea");
  baseGradient.addColorStop(0.46, "#e9e5db");
  baseGradient.addColorStop(1, "#f7f5ef");
  ctx.fillStyle = baseGradient;
  ctx.fillRect(0, 0, width, height);

  const glowOne = ctx.createRadialGradient(width * 0.18, height * 0.14, 30, width * 0.18, height * 0.14, 360);
  glowOne.addColorStop(0, "rgba(22,75,184,0.24)");
  glowOne.addColorStop(1, "rgba(22,75,184,0)");
  ctx.fillStyle = glowOne;
  ctx.fillRect(0, 0, width, height);

  const glowTwo = ctx.createRadialGradient(width * 0.82, height * 0.85, 20, width * 0.82, height * 0.85, 320);
  glowTwo.addColorStop(0, "rgba(74,96,147,0.18)");
  glowTwo.addColorStop(1, "rgba(74,96,147,0)");
  ctx.fillStyle = glowTwo;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "rgba(21,21,21,0.06)";
  ctx.lineWidth = 1;
  for (let x = 0; x < width; x += 72) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += 72) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
}

function drawPhotoCard(ctx, image, x, y, size, colors) {
  ctx.save();
  roundRect(ctx, x, y, size, size, 34);
  ctx.clip();
  ctx.drawImage(image, x, y, size, size);
  ctx.restore();

  ctx.strokeStyle = colors.lineStrong;
  ctx.lineWidth = 2;
  roundRect(ctx, x, y, size, size, 34);
  ctx.stroke();
}

function drawBadge(ctx, image, x, y, size, colors) {
  ctx.save();
  roundRect(ctx, x, y, size, size, 18);
  ctx.clip();
  ctx.fillStyle = colors.white;
  ctx.fillRect(x, y, size, size);
  ctx.drawImage(image, x, y, size, size);
  ctx.restore();
  ctx.strokeStyle = colors.lineStrong;
  ctx.lineWidth = 2;
  roundRect(ctx, x, y, size, size, 18);
  ctx.stroke();
}

function drawAestheticStory(ctx, width, height, assets) {
  const colors = {
    ink: "#151515",
    muted: "#66645e",
    blue: "#164bb8",
    blueSoft: "rgba(22,75,184,0.1)",
    line: "rgba(21,21,21,0.12)",
    lineStrong: "rgba(21,21,21,0.72)",
    white: "#fffdf8",
  };

  drawAestheticBackground(ctx, width, height);

  const pad = 74;
  ctx.strokeStyle = colors.lineStrong;
  ctx.lineWidth = 3;
  ctx.strokeRect(pad, pad, width - pad * 2, height - pad * 2);

  ctx.strokeStyle = colors.line;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(pad, 238);
  ctx.lineTo(width - pad, 238);
  ctx.moveTo(pad, height - 292);
  ctx.lineTo(width - pad, height - 292);
  ctx.stroke();

  drawBadge(ctx, assets.badgeImage, pad + 30, 110, 100, colors);

  ctx.fillStyle = colors.muted;
  ctx.font = '500 28px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText("Muhammad Rafi Priyo / Personal Directory", pad + 156, 152);

  ctx.fillStyle = colors.blue;
  ctx.font = '600 24px "SFMono-Regular", Consolas, monospace';
  ctx.fillText("Instagram Story / 9:16", pad + 156, 198);

  drawPhotoCard(ctx, assets.profileImage, width - pad - 270, 110, 196, colors);

  ctx.fillStyle = colors.ink;
  ctx.font = '500 128px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText("Rafi", pad + 24, 398);
  ctx.fillText("Links", pad + 24, 512);

  ctx.fillStyle = colors.blue;
  ctx.font = '700 34px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText("Portfolio · Code · Professional · Personal", pad + 28, 596);

  ctx.fillStyle = colors.muted;
  ctx.font = '400 35px "Helvetica Neue", Arial, sans-serif';
  drawWrappedText(ctx, "Versi ringkas untuk melihat karya, source code, profil profesional, dan aktivitas personal saya dalam satu tempat.", pad + 28, 664, width - pad * 2 - 56, 50);

  const boxX = pad + 24;
  const boxY = 808;
  const boxW = width - pad * 2 - 48;
  const boxH = 562;
  ctx.fillStyle = "rgba(255,253,248,0.74)";
  roundRect(ctx, boxX, boxY, boxW, boxH, 28);
  ctx.fill();
  ctx.strokeStyle = colors.line;
  ctx.lineWidth = 2;
  roundRect(ctx, boxX, boxY, boxW, boxH, 28);
  ctx.stroke();

  const cardGap = 24;
  const cardW = (boxW - 28 * 2 - cardGap) / 2;
  const cardH = 200;
  STORY_LINKS.forEach((item, index) => {
    const row = Math.floor(index / 2);
    const col = index % 2;
    const x = boxX + 28 + col * (cardW + cardGap);
    const y = boxY + 28 + row * (cardH + cardGap);

    ctx.fillStyle = colors.white;
    roundRect(ctx, x, y, cardW, cardH, 24);
    ctx.fill();
    ctx.strokeStyle = colors.line;
    roundRect(ctx, x, y, cardW, cardH, 24);
    ctx.stroke();

    ctx.fillStyle = colors.blue;
    ctx.font = '600 20px "SFMono-Regular", Consolas, monospace';
    ctx.fillText(item.index, x + 26, y + 36);

    ctx.fillStyle = colors.ink;
    ctx.font = '500 54px "Helvetica Neue", Arial, sans-serif';
    ctx.fillText(item.title, x + 26, y + 96);

    ctx.fillStyle = colors.muted;
    ctx.font = '400 24px "Helvetica Neue", Arial, sans-serif';
    drawWrappedText(ctx, item.detail, x + 26, y + 136, cardW - 52, 32);
  });

  ctx.fillStyle = colors.white;
  roundRect(ctx, pad + 26, height - 250, 250, 250, 22);
  ctx.fill();
  ctx.strokeStyle = colors.line;
  roundRect(ctx, pad + 26, height - 250, 250, 250, 22);
  ctx.stroke();
  ctx.drawImage(assets.qrImage, pad + 45, height - 231, 212, 212);

  ctx.fillStyle = colors.blue;
  ctx.font = '600 24px "SFMono-Regular", Consolas, monospace';
  ctx.fillText("Scan or visit", pad + 316, height - 176);

  ctx.fillStyle = colors.ink;
  ctx.font = '500 68px "Helvetica Neue", Arial, sans-serif';
  drawWrappedText(ctx, "Buka Rafi Links", pad + 316, height - 98, width - (pad + 316) - 36, 74);

  ctx.fillStyle = colors.muted;
  ctx.font = '400 28px "Helvetica Neue", Arial, sans-serif';
  drawWrappedText(ctx, STORY_URL.replace(/^https?:\/\//, ""), pad + 316, height - 32, width - (pad + 316) - 36, 36);
}

function drawMinimalStory(ctx, width, height, assets) {
  const colors = {
    paper: "#f3f0e8",
    white: "#fffdf8",
    ink: "#151515",
    muted: "#66645e",
    blue: "#164bb8",
    line: "rgba(21,21,21,0.12)",
    lineStrong: "rgba(21,21,21,0.72)",
  };

  ctx.fillStyle = colors.paper;
  ctx.fillRect(0, 0, width, height);

  const pad = 88;
  ctx.strokeStyle = colors.lineStrong;
  ctx.lineWidth = 3;
  ctx.strokeRect(pad, pad, width - pad * 2, height - pad * 2);

  drawBadge(ctx, assets.badgeImage, pad + 26, pad + 26, 78, colors);

  drawPhotoCard(ctx, assets.profileImage, width - pad - 222, pad + 26, 136, colors);

  ctx.fillStyle = colors.blue;
  ctx.font = '600 22px "SFMono-Regular", Consolas, monospace';
  ctx.fillText("Minimal version", pad + 128, pad + 66);
  ctx.fillText("Muhammad Rafi Priyo", pad + 128, pad + 100);

  ctx.fillStyle = colors.ink;
  ctx.font = '500 112px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText("Rafi", pad + 20, 360);
  ctx.fillText("Links", pad + 20, 462);

  ctx.fillStyle = colors.muted;
  ctx.font = '400 34px "Helvetica Neue", Arial, sans-serif';
  drawWrappedText(ctx, "Ringkas, informatif, dan langsung menuju karya, kode, serta profil saya.", pad + 24, 560, width - pad * 2 - 48, 48);

  const lineY = 698;
  ctx.strokeStyle = colors.lineStrong;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(pad, lineY);
  ctx.lineTo(width - pad, lineY);
  ctx.stroke();

  STORY_LINKS.forEach((item, index) => {
    const y = 784 + index * 126;
    ctx.fillStyle = colors.blue;
    ctx.font = '600 22px "SFMono-Regular", Consolas, monospace';
    ctx.fillText(item.index, pad + 20, y);

    ctx.fillStyle = colors.ink;
    ctx.font = '500 56px "Helvetica Neue", Arial, sans-serif';
    ctx.fillText(item.title, pad + 98, y + 6);

    ctx.fillStyle = colors.muted;
    ctx.font = '400 24px "Helvetica Neue", Arial, sans-serif';
    ctx.fillText(item.detail, pad + 102, y + 44);

    ctx.strokeStyle = colors.line;
    ctx.beginPath();
    ctx.moveTo(pad + 20, y + 76);
    ctx.lineTo(width - pad - 20, y + 76);
    ctx.stroke();
  });

  ctx.fillStyle = colors.white;
  roundRect(ctx, pad + 26, height - 302, 232, 232, 20);
  ctx.fill();
  ctx.strokeStyle = colors.line;
  roundRect(ctx, pad + 26, height - 302, 232, 232, 20);
  ctx.stroke();
  ctx.drawImage(assets.qrImage, pad + 44, height - 284, 196, 196);

  ctx.fillStyle = colors.blue;
  ctx.font = '600 24px "SFMono-Regular", Consolas, monospace';
  ctx.fillText("Direct access", pad + 300, height - 208);

  ctx.fillStyle = colors.ink;
  ctx.font = '500 74px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText("Scan to open", pad + 300, height - 126);

  ctx.fillStyle = colors.muted;
  ctx.font = '400 28px "Helvetica Neue", Arial, sans-serif';
  drawWrappedText(ctx, STORY_URL.replace(/^https?:\/\//, ""), pad + 300, height - 74, width - (pad + 300) - 24, 38);
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
