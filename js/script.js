const links = [
  {
    title: "Portfolio",
    description: "Kumpulan project, pengalaman, dan karya digital pilihan saya.",
    url: "https://riyooprivateweb.my.id/PORTFOLIO_WEB/",
    icon: "portfolio",
    color: "card-blue",
  },
  {
    title: "GitHub",
    description: "Source code, eksperimen, dan repository project.",
    url: "https://github.com/muhrafi-fsdev",
    icon: "github",
    color: "card-yellow",
  },
  {
    title: "LinkedIn",
    description: "Profil profesional, pengalaman, dan koneksi.",
    url: "https://www.linkedin.com/in/rafipriyo",
    icon: "linkedin",
    color: "card-white",
  },
  {
    title: "Instagram",
    description: "Aktivitas, karya, dan personal update.",
    url: "https://www.instagram.com/mhmmd_rayfy?igsh=b2RrOXk0NDN5OTNj",
    icon: "instagram",
    color: "card-red",
  },
  {
    title: "NusaMind AI",
    description: "Personal AI assistant yang sedang saya kembangkan.",
    url: "https://github.com/muhrafi-fsdev/NUSAMIND-SWIFT",
    icon: "ai",
    color: "card-dark",
  },
  {
    title: "Private Portfolio",
    description: "Repository website personal untuk menampilkan identitas dan project saya.",
    url: "https://github.com/muhrafi-fsdev/PrivatePortofolio",
    icon: "portfolio",
    color: "card-pale",
  },
];

const icons = {
  portfolio: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="6" width="18" height="14" rx="1"/><path d="M8 6V4h8v2M3 11h18M10 11v2h4v-2"/></svg>`,
  github: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.9c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.55 9.55 0 0 1 12 6.77a9.5 9.5 0 0 1 2.5.34c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.69-4.57 4.94.36.31.68.93.68 1.9v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/></svg>`,
  linkedin: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.2 8H2v14h3.2V8ZM3.6 2a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8ZM22 14c0-4.2-2.2-6.2-5.2-6.2-2.4 0-3.5 1.3-4.1 2.3V8H9.5v14h3.2v-7c0-1.8.3-3.6 2.6-3.6 2.2 0 2.3 2.1 2.3 3.7V22H22v-8Z"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.7" r="1"/></svg>`,
  ai: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="6" width="16" height="13" rx="3"/><path d="M9 11h.01M15 11h.01M9 15h6M12 6V3M9 3h6M4 12H2M22 12h-2"/></svg>`,
  arrow: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>`,
};

const escapeHTML = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

const renderLinks = () => {
  const grid = document.querySelector("#links-grid");
  grid.innerHTML = links.map((link, index) => `
    <a class="link-card ${escapeHTML(link.color)} reveal" href="${escapeHTML(link.url)}" target="_blank" rel="noopener noreferrer" aria-label="Buka ${escapeHTML(link.title)}">
      <span class="link-number">[ ${String(index + 1).padStart(2, "0")} ]</span>
      <span class="link-icon-bg">${icons[link.icon] || icons.portfolio}</span>
      <span class="link-main">
        <span>
          <span class="link-title">${escapeHTML(link.title)}</span>
          <span class="link-description">${escapeHTML(link.description)}</span>
        </span>
        <span class="link-arrow">${icons.arrow}</span>
      </span>
    </a>
  `).join("");
};

const showToast = (message) => {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2200);
};

const setupShare = () => {
  document.querySelector("#share-button").addEventListener("click", async () => {
    const shareData = {
      title: document.title,
      text: "Kunjungi personal link hub Muhammad Rafi Priyo.",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        showToast("Tautan berhasil disalin");
      } else {
        showToast("Salin alamat halaman dari browser");
      }
    } catch (error) {
      if (error.name !== "AbortError") showToast("Tautan belum dapat dibagikan");
    }
  });
};

const setupReveal = () => {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach((item) => observer.observe(item));
};

document.addEventListener("DOMContentLoaded", () => {
  renderLinks();
  setupShare();
  setupReveal();
  document.querySelector("#current-year").textContent = new Date().getFullYear();
});
