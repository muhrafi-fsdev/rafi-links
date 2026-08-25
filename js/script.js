const shareButton = document.querySelector("#share-button");
const toast = document.querySelector("#toast");

let toastTimer;

function showToast(message) {
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2400);
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
    text: "Kunjungi tautan, karya, dan project Muhammad Rafi Priyo.",
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

shareButton?.addEventListener("click", sharePage);
