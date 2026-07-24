const links = [
  {
    title: "Portfolio Website",
    description: "Lihat project, pengalaman, dan karya pilihan saya.",
    url: "https://riyooprivateweb.my.id/PORTFOLIO_WEB/",
    icon: "portfolio",
    enabled: true,
  },
  {
    title: "GitHub",
    description: "Source code dan repository project saya.",
    url: "https://github.com/muhrafi-fsdev",
    icon: "github",
    enabled: true,
  },
  {
    title: "LinkedIn",
    description: "Profil profesional, pengalaman, dan koneksi.",
    url: "https://www.linkedin.com/in/rafipriyo",
    icon: "linkedin",
    enabled: true,
  },
  {
    title: "Instagram",
    description: "Aktivitas, karya, dan personal update.",
    url: "https://www.instagram.com/mhmmd_rayfy?igsh=b2RrOXk0NDN5OTNj",
    icon: "instagram",
    enabled: true,
  },
  {
    title: "NusaMind AI",
    description: "Project personal AI assistant yang sedang dikembangkan.",
    url: "https://github.com/muhrafi-fsdev/NUSAMIND-SWIFT",
    icon: "ai",
    enabled: true,
  },
  {
    title: "Private Portfolio",
    description: "Website portfolio pribadi untuk menampilkan karya dan project.",
    url: "https://github.com/muhrafi-fsdev/PrivatePortofolio",
    icon: "portfolio",
    enabled: true,
  },

  // Tambahkan URL asli lalu ubah enabled menjadi true untuk menampilkan marketplace.
  {
    title: "Shopee",
    description: "Kunjungi tautan Shopee saya.",
    url: "",
    icon: "shop",
    enabled: false,
  },
  {
    title: "Tokopedia",
    description: "Kunjungi tautan Tokopedia saya.",
    url: "",
    icon: "store",
    enabled: false,
  },
];

const icons = {
  theme: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a7 7 0 1 0 9 9 9 9 0 0 1-9-9Z"/></svg>`,
  share: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8.2 10.8 7.6-4.6M8.2 13.2l7.6 4.6"/></svg>`,
  github: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.11.79-.25.79-.56v-2.23c-3.23.7-3.91-1.37-3.91-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.72 1.27 3.39.97.1-.75.4-1.27.74-1.56-2.58-.29-5.29-1.29-5.29-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.47.11-3.05 0 0 .97-.31 3.16 1.18A10.9 10.9 0 0 1 12 6.12c.98 0 1.95.13 2.87.39 2.19-1.49 3.16-1.18 3.16-1.18.63 1.58.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.4-2.72 5.38-5.31 5.67.42.36.79 1.08.79 2.18v3.23c0 .31.21.68.8.56A11.5 11.5 0 0 0 12 .7Z"/></svg>`,
  linkedin: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5.35 7.77H1.82V22h3.53V7.77ZM3.59 2A2.05 2.05 0 1 0 3.6 6.1 2.05 2.05 0 0 0 3.59 2ZM22 13.84c0-4.28-2.28-6.27-5.33-6.27-2.45 0-3.55 1.35-4.16 2.3v-2.1H8.98V22h3.53v-7.05c0-1.86.35-3.66 2.66-3.66 2.28 0 2.31 2.13 2.31 3.78V22H22v-8.16Z"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.1"/><circle cx="17.3" cy="6.8" r="1" fill="currentColor" stroke="none"/></svg>`,
  portfolio: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="6" width="18" height="14" rx="2"/><path d="M8 6V4h8v2M3 11h18M10 11v2h4v-2"/></svg>`,
  ai: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="6" width="16" height="13" rx="3"/><path d="M9 11h.01M15 11h.01M9 15h6M12 6V3M9 3h6M4 12H2M22 12h-2"/></svg>`,
  shop: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 8h14l-1 13H6L5 8Z"/><path d="M9 10V6a3 3 0 0 1 6 0v4"/></svg>`,
  store: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 10 5 4h14l2 6"/><path d="M5 10v10h14V10M3 10a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0M9 20v-6h6v6"/></svg>`,
  arrow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`,
};

const renderStaticIcons = () => {
  document.querySelectorAll("[data-icon]").forEach((element) => {
    const iconName = element.dataset.icon;
    element.innerHTML = icons[iconName] || "";
  });
};

const renderLinks = () => {
  const container = document.querySelector("#links-list");
  const activeLinks = links.filter((link) => link.enabled && link.url);

  container.innerHTML = activeLinks.map((link) => `
    <a class="link-card" href="${link.url}" target="_blank" rel="noopener noreferrer" aria-label="Buka ${link.title}">
      <span class="link-icon">${icons[link.icon] || icons.portfolio}</span>
      <span class="link-copy">
        <span class="link-title">${link.title}</span>
        <span class="link-description">${link.description}</span>
      </span>
      <span class="link-arrow">${icons.arrow}</span>
    </a>
  `).join("");

  document.querySelector("#link-count").textContent = `${activeLinks.length} links`;
};

const showToast = (message) => {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toast.classList.remove("show"), 2200);
};

const setupTheme = () => {
  const root = document.documentElement;
  const storedTheme = localStorage.getItem("rafi-link-hub-theme");
  if (storedTheme === "light" || storedTheme === "dark") root.dataset.theme = storedTheme;

  document.querySelector("#theme-toggle").addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = nextTheme;
    localStorage.setItem("rafi-link-hub-theme", nextTheme);
    showToast(nextTheme === "dark" ? "Dark mode aktif" : "Light mode aktif");
  });
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
      } else {
        await navigator.clipboard.writeText(window.location.href);
        showToast("Tautan berhasil disalin");
      }
    } catch (error) {
      if (error.name !== "AbortError") showToast("Tautan belum dapat dibagikan");
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  renderStaticIcons();
  renderLinks();
  setupTheme();
  setupShare();
  document.querySelector("#current-year").textContent = new Date().getFullYear();
});
