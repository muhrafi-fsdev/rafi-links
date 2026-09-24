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
const shareFormatButtons = document.querySelectorAll("[data-share-format]");
const storyFrame = document.querySelector(".story-frame");
const dialogIndex = document.querySelector(".dialog-index");
const languageSelect = document.querySelector("#language-select");
const toast = document.querySelector("#toast");
const revealItems = document.querySelectorAll("[data-reveal]");

const STORY_URL = "https://muhrafi-fsdev.github.io/rafi-links/";
const LANGUAGE_STORAGE_KEY = "rafiLinksLanguage";

const TRANSLATIONS = {
  id: {
    locale: "id_ID",
    metaDescription: "Rafi Links — halaman ringkas Muhammad Rafi Priyo untuk portfolio, GitHub, LinkedIn, Instagram, dan project teknologi.",
    ogDescription: "Portfolio, kode, project, dan profil Muhammad Rafi Priyo di bidang web, AI, IoT, jaringan, dan keamanan siber.",
    skip: "Lewati ke konten utama",
    brandHomeAria: "Rafi Links, kembali ke atas",
    mainNavAria: "Navigasi utama",
    navDirectory: "Direktori",
    navAbout: "Tentang",
    navShare: "Bagikan",
    navStory: "Story IG",
    navDownload: "Unduh",
    downloadStoryAria: "Unduh Story Instagram langsung",
    languageLabel: "Bahasa",
    languageSelectAria: "Pilih bahasa",
    country: "Indonesia",
    roleDeveloper: "Pengembang Full-Stack",
    roleCybersecurity: "Peminat Keamanan Siber",
    profileDomains: "Web · AI · IoT · Keamanan",
    storyDialogCode: "STORY / 9:16",
    shareFormatLabel: "Format",
    shareFormatAria: "Pilih format bagikan",
    shareFormatStory: "Story 9:16",
    shareFormatSquare: "Persegi 1:1",
    squareDialogCode: "POST / 1:1",
    heroLabel: "Tentang halaman ini",
    heroCopy: "Satu tempat untuk melihat project, source code, profil profesional, dan aktivitas yang saya bagikan.",
    heroDirectoryCta: "Lihat tautan",
    heroGithubCta: "Buka GitHub",
    profileAlt: "Muhammad Rafi Priyo sedang menggunakan laptop",
    visualCurrent: "PROJECT TERKINI",
    visualIndex: "HALAMAN PERSONAL",
    fieldsAria: "Bidang yang dikerjakan",
    fieldWeb: "Web Engineering",
    fieldAI: "AI Tools",
    fieldIoT: "IoT Systems",
    fieldNetwork: "Jaringan",
    fieldSecurity: "Keamanan Siber",
    directoryCode: "02 / DIREKTORI",
    directoryTitle: "Semua tautan utama, di satu tempat.",
    directoryCopy: "Portfolio untuk melihat project, GitHub untuk kode, LinkedIn untuk profil profesional, dan Instagram untuk aktivitas personal.",
    directoryAria: "Tautan personal Muhammad Rafi Priyo",
    portfolioNote: "Project pilihan, eksperimen, dan catatan pengembangan.",
    githubNote: "Repository, source code, dan eksperimen teknis.",
    linkedinNote: "Profil profesional, pengalaman, dan koneksi.",
    instagramNote: "Aktivitas, karya, dan pembaruan personal.",
    aboutRail: "TENTANG / FOKUS SAAT INI",
    aboutCode: "TENTANG SAYA",
    aboutTitle: "Saya paling banyak belajar lewat project yang benar-benar saya kerjakan.",
    aboutCopy: "Saya mahasiswa yang mendalami pengembangan web, AI, IoT, jaringan, dan keamanan siber. Saya suka memahami bagaimana sebuah sistem bekerja dari sisi tampilan, alur data, sampai keputusan teknis di belakangnya.",
    focusAria: "Fokus saat ini",
    focusTitle: "Fokus saat ini",
    focusCount: "5 bidang",
    focusWeb: "Interface, API, dan arsitektur aplikasi",
    focusAI: "Asisten dan workflow berbasis AI",
    focusIoT: "IoT, sensor, dan integrasi data",
    focusSecurity: "Analisis risiko dan pengamanan sistem",
    focusNetwork: "Jaringan dan sistem komunikasi",
    toolkitCode: "04 / TEKNOLOGI",
    toolkitTitle: "Teknologi yang sering saya pakai.",
    toolkitCopy: "Daftar ini bukan semua yang pernah saya gunakan, tetapi yang paling sering muncul di project, eksperimen, dan prototype saya.",
    toolkitAria: "Daftar teknologi yang sering digunakan",
    socialAria: "Tautan sosial",
    storyDialogTitle: "Pilih tampilan yang ingin dibagikan.",
    storyDialogCopy: "Pilih format 9:16 untuk Story atau 1:1 untuk unggahan persegi, lalu pilih gaya visualnya.",
    storyVariantAria: "Pilih versi story",
    storyEditorial: "Editorial",
    storyMinimal: "Minimal",
    storyShare: "Bagikan",
    storyDownload: "Unduh PNG",
    storyClose: "Tutup",
    storyTip: "Jika Instagram tidak muncul di menu berbagi, unduh PNG lalu unggah manual ke Story. Tambahkan Link Sticker yang mengarah ke Rafi Links agar bisa dibuka langsung.",
    storyPreviewAlt: "Preview Story Instagram Rafi Links",
    shareText: "Lihat project, kode, dan profil Muhammad Rafi Priyo di Rafi Links.",
    copied: "Tautan berhasil disalin.",
    copyFallback: "Salin alamat halaman melalui bilah alamat browser.",
    storyPreviewError: "Preview story belum bisa dibuat.",
    storyMinimalDownloaded: "Story minimalis berhasil diunduh.",
    storyEditorialDownloaded: "Story editorial berhasil diunduh.",
    storyDownloadError: "File story belum bisa diunduh.",
    storyShareError: "Bagikan story belum tersedia di perangkat ini.",
    storyVariantError: "Versi story belum bisa dimuat.",
    story: {
      areas: "WEB · AI · IOT · JARINGAN · KEAMANAN",
      side: "RAFI LINKS / STORY INSTAGRAM",
      badge: "BUAT / UJI / PELAJARI",
      intro: "Portfolio, source code, profil profesional, dan aktivitas personal dalam satu halaman.",
      personalIndex: "HALAMAN PERSONAL / 2026",
      minimalIntro: "Empat tautan utama dalam satu halaman yang ringkas.",
      scanOpen: "SCAN / BUKA",
      directAccess: "AKSES LANGSUNG",
      scanToOpen: "SCAN UNTUK BUKA",
      links: [
        "Project pilihan dan eksperimen",
        "Kode, repository, dan eksperimen teknis",
        "Profil profesional dan koneksi",
        "Aktivitas dan pembaruan personal"
      ]
    }
  },
  en: {
    locale: "en_US",
    metaDescription: "Rafi Links — Muhammad Rafi Priyo's compact page for portfolio, GitHub, LinkedIn, Instagram, and technology projects.",
    ogDescription: "Portfolio, code, projects, and profile of Muhammad Rafi Priyo across web, AI, IoT, networking, and cybersecurity.",
    skip: "Skip to main content",
    brandHomeAria: "Rafi Links, back to top",
    mainNavAria: "Main navigation",
    navDirectory: "Directory",
    navAbout: "About",
    navShare: "Share",
    navStory: "IG Story",
    navDownload: "Download",
    downloadStoryAria: "Download Instagram Story directly",
    languageLabel: "Language",
    languageSelectAria: "Choose language",
    country: "Indonesia",
    roleDeveloper: "Full-Stack Developer",
    roleCybersecurity: "Cybersecurity Enthusiast",
    profileDomains: "Web · AI · IoT · Security",
    storyDialogCode: "STORY / 9:16",
    shareFormatLabel: "Format",
    shareFormatAria: "Choose share format",
    shareFormatStory: "Story 9:16",
    shareFormatSquare: "Square 1:1",
    squareDialogCode: "POST / 1:1",
    heroLabel: "About this page",
    heroCopy: "One place to view my projects, source code, professional profile, and personal updates.",
    heroDirectoryCta: "View links",
    heroGithubCta: "Open GitHub",
    profileAlt: "Muhammad Rafi Priyo using a laptop",
    visualCurrent: "CURRENT PROJECTS",
    visualIndex: "PERSONAL PAGE",
    fieldsAria: "Areas of work",
    fieldWeb: "Web Engineering",
    fieldAI: "AI Tools",
    fieldIoT: "IoT Systems",
    fieldNetwork: "Networking",
    fieldSecurity: "Cybersecurity",
    directoryCode: "02 / DIRECTORY",
    directoryTitle: "All the main links, in one place.",
    directoryCopy: "Portfolio for selected work, GitHub for code, LinkedIn for professional context, and Instagram for personal updates.",
    directoryAria: "Muhammad Rafi Priyo personal links",
    portfolioNote: "Selected projects, experiments, and development notes.",
    githubNote: "Repositories, source code, and technical experiments.",
    linkedinNote: "Professional profile, experience, and connections.",
    instagramNote: "Personal activity, work, and updates.",
    aboutRail: "ABOUT / CURRENT FOCUS",
    aboutCode: "ABOUT ME",
    aboutTitle: "I learn the most from projects I actually build.",
    aboutCopy: "I am a university student focused on web development, AI, IoT, networking, and cybersecurity. I like understanding how systems work—from interface and data flow to the technical decisions behind them.",
    focusAria: "Current focus",
    focusTitle: "Current focus",
    focusCount: "5 areas",
    focusWeb: "Interfaces, APIs, and application architecture",
    focusAI: "AI assistants and practical workflows",
    focusIoT: "IoT, sensors, and data integration",
    focusSecurity: "Risk analysis and system hardening",
    focusNetwork: "Networks and communication systems",
    toolkitCode: "04 / TOOLKIT",
    toolkitTitle: "Technology I use often.",
    toolkitCopy: "This is not everything I have used, but these are the tools that appear most often in my projects, experiments, and prototypes.",
    toolkitAria: "Frequently used technologies",
    socialAria: "Social links",
    storyDialogTitle: "Choose the layout you want to share.",
    storyDialogCopy: "Choose 9:16 for Story or 1:1 for a square post, then choose the visual style.",
    storyVariantAria: "Choose story version",
    storyEditorial: "Editorial",
    storyMinimal: "Minimal",
    storyShare: "Share",
    storyDownload: "Download PNG",
    storyClose: "Close",
    storyTip: "If Instagram does not appear in the share menu, download the PNG and upload it manually to Story. Add a Link Sticker to Rafi Links so people can open it directly.",
    storyPreviewAlt: "Rafi Links Instagram Story preview",
    shareText: "View Muhammad Rafi Priyo's projects, code, and profile on Rafi Links.",
    copied: "Link copied.",
    copyFallback: "Copy the page address from your browser's address bar.",
    storyPreviewError: "The story preview could not be generated.",
    storyMinimalDownloaded: "Minimal story downloaded.",
    storyEditorialDownloaded: "Editorial story downloaded.",
    storyDownloadError: "The story file could not be downloaded.",
    storyShareError: "Story sharing is not available on this device.",
    storyVariantError: "This story version could not be loaded.",
    story: {
      areas: "WEB · AI · IOT · NETWORK · SECURITY",
      side: "RAFI LINKS / INSTAGRAM STORY",
      badge: "BUILD / TEST / LEARN",
      intro: "Portfolio, source code, professional profile, and personal updates in one page.",
      personalIndex: "PERSONAL PAGE / 2026",
      minimalIntro: "Four main links in one compact page.",
      scanOpen: "SCAN / OPEN",
      directAccess: "DIRECT ACCESS",
      scanToOpen: "SCAN TO OPEN",
      links: [
        "Selected projects and experiments",
        "Code, repositories, and technical experiments",
        "Professional profile and connections",
        "Personal activity and updates"
      ]
    }
  },
  ms: {
    locale: "ms_MY",
    metaDescription: "Rafi Links — halaman ringkas Muhammad Rafi Priyo untuk portfolio, GitHub, LinkedIn, Instagram dan projek teknologi.",
    ogDescription: "Portfolio, kod, projek dan profil Muhammad Rafi Priyo dalam web, AI, IoT, rangkaian dan keselamatan siber.",
    skip: "Langkau ke kandungan utama",
    brandHomeAria: "Rafi Links, kembali ke atas",
    mainNavAria: "Navigasi utama",
    navDirectory: "Direktori",
    navAbout: "Tentang",
    navShare: "Kongsi",
    navStory: "Story IG",
    navDownload: "Muat turun",
    downloadStoryAria: "Muat turun Story Instagram secara terus",
    languageLabel: "Bahasa",
    languageSelectAria: "Pilih bahasa",
    country: "Indonesia",
    roleDeveloper: "Pembangun Full-Stack",
    roleCybersecurity: "Peminat Keselamatan Siber",
    profileDomains: "Web · AI · IoT · Keselamatan",
    storyDialogCode: "STORY / 9:16",
    shareFormatLabel: "Format",
    shareFormatAria: "Pilih format perkongsian",
    shareFormatStory: "Story 9:16",
    shareFormatSquare: "Petak 1:1",
    squareDialogCode: "HANTARAN / 1:1",
    heroLabel: "Tentang halaman ini",
    heroCopy: "Satu tempat untuk melihat projek, kod sumber, profil profesional dan aktiviti yang saya kongsikan.",
    heroDirectoryCta: "Lihat pautan",
    heroGithubCta: "Buka GitHub",
    profileAlt: "Muhammad Rafi Priyo sedang menggunakan komputer riba",
    visualCurrent: "PROJEK TERKINI",
    visualIndex: "HALAMAN PERIBADI",
    fieldsAria: "Bidang yang dikerjakan",
    fieldWeb: "Kejuruteraan Web",
    fieldAI: "Alat AI",
    fieldIoT: "Sistem IoT",
    fieldNetwork: "Rangkaian",
    fieldSecurity: "Keselamatan Siber",
    directoryCode: "02 / DIREKTORI",
    directoryTitle: "Semua pautan utama, di satu tempat.",
    directoryCopy: "Portfolio untuk melihat projek, GitHub untuk kod, LinkedIn untuk profil profesional dan Instagram untuk aktiviti peribadi.",
    directoryAria: "Pautan peribadi Muhammad Rafi Priyo",
    portfolioNote: "Projek pilihan, eksperimen dan catatan pembangunan.",
    githubNote: "Repositori, kod sumber dan eksperimen teknikal.",
    linkedinNote: "Profil profesional, pengalaman dan hubungan.",
    instagramNote: "Aktiviti, karya dan kemas kini peribadi.",
    aboutRail: "TENTANG / FOKUS SEMASA",
    aboutCode: "TENTANG SAYA",
    aboutTitle: "Saya paling banyak belajar melalui projek yang benar-benar saya bina.",
    aboutCopy: "Saya seorang pelajar universiti yang mendalami pembangunan web, AI, IoT, rangkaian dan keselamatan siber. Saya suka memahami cara sistem berfungsi daripada antaramuka dan aliran data hingga keputusan teknikal di belakangnya.",
    focusAria: "Fokus semasa",
    focusTitle: "Fokus semasa",
    focusCount: "5 bidang",
    focusWeb: "Antaramuka, API dan seni bina aplikasi",
    focusAI: "Pembantu dan aliran kerja berasaskan AI",
    focusIoT: "IoT, sensor dan integrasi data",
    focusSecurity: "Analisis risiko dan pengukuhan sistem",
    focusNetwork: "Rangkaian dan sistem komunikasi",
    toolkitCode: "04 / TEKNOLOGI",
    toolkitTitle: "Teknologi yang kerap saya gunakan.",
    toolkitCopy: "Ini bukan semua teknologi yang pernah saya gunakan, tetapi inilah yang paling kerap muncul dalam projek, eksperimen dan prototaip saya.",
    toolkitAria: "Senarai teknologi yang kerap digunakan",
    socialAria: "Pautan sosial",
    storyDialogTitle: "Pilih paparan yang ingin dikongsi.",
    storyDialogCopy: "Pilih 9:16 untuk Story atau 1:1 untuk hantaran petak, kemudian pilih gaya visual.",
    storyVariantAria: "Pilih versi story",
    storyEditorial: "Editorial",
    storyMinimal: "Minimal",
    storyShare: "Kongsi",
    storyDownload: "Muat turun PNG",
    storyClose: "Tutup",
    storyTip: "Jika Instagram tidak muncul dalam menu perkongsian, muat turun PNG dan muat naik secara manual ke Story. Tambahkan Link Sticker ke Rafi Links supaya ia boleh dibuka terus.",
    storyPreviewAlt: "Pratonton Story Instagram Rafi Links",
    shareText: "Lihat projek, kod dan profil Muhammad Rafi Priyo di Rafi Links.",
    copied: "Pautan berjaya disalin.",
    copyFallback: "Salin alamat halaman daripada bar alamat pelayar.",
    storyPreviewError: "Pratonton story belum dapat dijana.",
    storyMinimalDownloaded: "Story minimal berjaya dimuat turun.",
    storyEditorialDownloaded: "Story editorial berjaya dimuat turun.",
    storyDownloadError: "Fail story belum dapat dimuat turun.",
    storyShareError: "Perkongsian story tidak tersedia pada peranti ini.",
    storyVariantError: "Versi story ini belum dapat dimuatkan.",
    story: {
      areas: "WEB · AI · IOT · RANGKAIAN · KESELAMATAN",
      side: "RAFI LINKS / STORY INSTAGRAM",
      badge: "BINA / UJI / PELAJARI",
      intro: "Portfolio, kod sumber, profil profesional dan aktiviti peribadi dalam satu halaman.",
      personalIndex: "HALAMAN PERIBADI / 2026",
      minimalIntro: "Empat pautan utama dalam satu halaman ringkas.",
      scanOpen: "IMBAS / BUKA",
      directAccess: "AKSES TERUS",
      scanToOpen: "IMBAS UNTUK BUKA",
      links: ["Projek pilihan dan eksperimen", "Kod, repositori dan eksperimen teknikal", "Profil profesional dan hubungan", "Aktiviti dan kemas kini peribadi"]
    }
  },
  th: {
    locale: "th_TH",
    metaDescription: "Rafi Links — หน้ารวมลิงก์ของ Muhammad Rafi Priyo สำหรับพอร์ตโฟลิโอ GitHub LinkedIn Instagram และโปรเจกต์เทคโนโลยี",
    ogDescription: "พอร์ตโฟลิโอ โค้ด โปรเจกต์ และโปรไฟล์ของ Muhammad Rafi Priyo ด้านเว็บ AI IoT เครือข่าย และความปลอดภัยไซเบอร์",
    skip: "ข้ามไปยังเนื้อหาหลัก",
    brandHomeAria: "Rafi Links กลับไปด้านบน",
    mainNavAria: "เมนูหลัก",
    navDirectory: "ลิงก์",
    navAbout: "เกี่ยวกับ",
    navShare: "แชร์",
    navStory: "IG Story",
    navDownload: "ดาวน์โหลด",
    downloadStoryAria: "ดาวน์โหลด Instagram Story โดยตรง",
    languageLabel: "ภาษา",
    languageSelectAria: "เลือกภาษา",
    country: "อินโดนีเซีย",
    roleDeveloper: "นักพัฒนา Full-Stack",
    roleCybersecurity: "ผู้สนใจความปลอดภัยไซเบอร์",
    profileDomains: "เว็บ · AI · IoT · ความปลอดภัย",
    storyDialogCode: "สตอรี่ / 9:16",
    shareFormatLabel: "รูปแบบ",
    shareFormatAria: "เลือกรูปแบบการแชร์",
    shareFormatStory: "Story 9:16",
    shareFormatSquare: "สี่เหลี่ยม 1:1",
    squareDialogCode: "โพสต์ / 1:1",
    heroLabel: "เกี่ยวกับหน้านี้",
    heroCopy: "รวมโปรเจกต์ ซอร์สโค้ด โปรไฟล์วิชาชีพ และอัปเดตส่วนตัวของผมไว้ในที่เดียว",
    heroDirectoryCta: "ดูลิงก์",
    heroGithubCta: "เปิด GitHub",
    profileAlt: "Muhammad Rafi Priyo กำลังใช้แล็ปท็อป",
    visualCurrent: "โปรเจกต์ปัจจุบัน",
    visualIndex: "หน้าส่วนตัว",
    fieldsAria: "สาขาที่ทำงาน",
    fieldWeb: "วิศวกรรมเว็บ",
    fieldAI: "เครื่องมือ AI",
    fieldIoT: "ระบบ IoT",
    fieldNetwork: "เครือข่าย",
    fieldSecurity: "ความปลอดภัยไซเบอร์",
    directoryCode: "02 / ลิงก์หลัก",
    directoryTitle: "ลิงก์สำคัญทั้งหมด อยู่ในที่เดียว",
    directoryCopy: "Portfolio สำหรับผลงาน, GitHub สำหรับโค้ด, LinkedIn สำหรับโปรไฟล์วิชาชีพ และ Instagram สำหรับกิจกรรมส่วนตัว",
    directoryAria: "ลิงก์ส่วนตัวของ Muhammad Rafi Priyo",
    portfolioNote: "โปรเจกต์ที่เลือก การทดลอง และบันทึกการพัฒนา",
    githubNote: "รีโพซิทอรี ซอร์สโค้ด และการทดลองทางเทคนิค",
    linkedinNote: "โปรไฟล์วิชาชีพ ประสบการณ์ และเครือข่าย",
    instagramNote: "กิจกรรม ผลงาน และอัปเดตส่วนตัว",
    aboutRail: "เกี่ยวกับ / สิ่งที่กำลังโฟกัส",
    aboutCode: "เกี่ยวกับผม",
    aboutTitle: "ผมเรียนรู้ได้มากที่สุดจากโปรเจกต์ที่ลงมือทำจริง",
    aboutCopy: "ผมเป็นนักศึกษาที่สนใจการพัฒนาเว็บ AI IoT เครือข่าย และความปลอดภัยไซเบอร์ ผมชอบทำความเข้าใจระบบตั้งแต่หน้าตา การไหลของข้อมูล ไปจนถึงเหตุผลทางเทคนิคเบื้องหลัง",
    focusAria: "สิ่งที่กำลังโฟกัส",
    focusTitle: "โฟกัสปัจจุบัน",
    focusCount: "5 ด้าน",
    focusWeb: "อินเทอร์เฟซ API และสถาปัตยกรรมแอป",
    focusAI: "ผู้ช่วย AI และเวิร์กโฟลว์ที่ใช้งานจริง",
    focusIoT: "IoT เซนเซอร์ และการเชื่อมข้อมูล",
    focusSecurity: "การวิเคราะห์ความเสี่ยงและการป้องกันระบบ",
    focusNetwork: "เครือข่ายและระบบสื่อสาร",
    toolkitCode: "04 / เครื่องมือ",
    toolkitTitle: "เทคโนโลยีที่ผมใช้บ่อย",
    toolkitCopy: "รายการนี้ไม่ใช่ทุกอย่างที่ผมเคยใช้ แต่เป็นเทคโนโลยีที่ปรากฏบ่อยที่สุดในโปรเจกต์ การทดลอง และต้นแบบของผม",
    toolkitAria: "เทคโนโลยีที่ใช้บ่อย",
    socialAria: "ลิงก์โซเชียล",
    storyDialogTitle: "เลือกรูปแบบที่ต้องการแชร์",
    storyDialogCopy: "เลือก 9:16 สำหรับ Story หรือ 1:1 สำหรับโพสต์สี่เหลี่ยม แล้วเลือกสไตล์ภาพ",
    storyVariantAria: "เลือกรูปแบบ Story",
    storyEditorial: "Editorial",
    storyMinimal: "Minimal",
    storyShare: "แชร์",
    storyDownload: "ดาวน์โหลด PNG",
    storyClose: "ปิด",
    storyTip: "หาก Instagram ไม่ปรากฏในเมนูแชร์ ให้ดาวน์โหลด PNG แล้วอัปโหลดไปยัง Story เอง จากนั้นเพิ่ม Link Sticker ไปยัง Rafi Links",
    storyPreviewAlt: "ตัวอย่าง Instagram Story ของ Rafi Links",
    shareText: "ดูโปรเจกต์ โค้ด และโปรไฟล์ของ Muhammad Rafi Priyo ได้ที่ Rafi Links",
    copied: "คัดลอกลิงก์แล้ว",
    copyFallback: "คัดลอกที่อยู่หน้าเว็บจากแถบที่อยู่ของเบราว์เซอร์",
    storyPreviewError: "ยังไม่สามารถสร้างตัวอย่าง Story ได้",
    storyMinimalDownloaded: "ดาวน์โหลด Story แบบ Minimal แล้ว",
    storyEditorialDownloaded: "ดาวน์โหลด Story แบบ Editorial แล้ว",
    storyDownloadError: "ยังไม่สามารถดาวน์โหลดไฟล์ Story ได้",
    storyShareError: "อุปกรณ์นี้ยังไม่รองรับการแชร์ Story",
    storyVariantError: "ยังไม่สามารถโหลดรูปแบบ Story นี้ได้",
    story: {
      areas: "WEB · AI · IOT · เครือข่าย · ความปลอดภัย",
      side: "RAFI LINKS / INSTAGRAM STORY",
      badge: "สร้าง / ทดสอบ / เรียนรู้",
      intro: "พอร์ตโฟลิโอ ซอร์สโค้ด โปรไฟล์วิชาชีพ และอัปเดตส่วนตัวในหน้าเดียว",
      personalIndex: "หน้าส่วนตัว / 2026",
      minimalIntro: "สี่ลิงก์หลักในหน้าเดียวที่กระชับ",
      scanOpen: "สแกน / เปิด",
      directAccess: "เข้าถึงโดยตรง",
      scanToOpen: "สแกนเพื่อเปิด",
      links: ["โปรเจกต์ที่เลือกและการทดลอง", "โค้ด รีโพซิทอรี และการทดลองทางเทคนิค", "โปรไฟล์วิชาชีพและเครือข่าย", "กิจกรรมและอัปเดตส่วนตัว"]
    }
  },
  vi: {
    locale: "vi_VN",
    metaDescription: "Rafi Links — trang tổng hợp của Muhammad Rafi Priyo dành cho portfolio, GitHub, LinkedIn, Instagram và các dự án công nghệ.",
    ogDescription: "Portfolio, mã nguồn, dự án và hồ sơ của Muhammad Rafi Priyo về web, AI, IoT, mạng và an ninh mạng.",
    skip: "Chuyển đến nội dung chính",
    brandHomeAria: "Rafi Links, quay lại đầu trang",
    mainNavAria: "Điều hướng chính",
    navDirectory: "Liên kết",
    navAbout: "Giới thiệu",
    navShare: "Chia sẻ",
    navStory: "IG Story",
    navDownload: "Tải xuống",
    downloadStoryAria: "Tải Instagram Story trực tiếp",
    languageLabel: "Ngôn ngữ",
    languageSelectAria: "Chọn ngôn ngữ",
    country: "Indonesia",
    roleDeveloper: "Lập trình viên Full-Stack",
    roleCybersecurity: "Quan tâm an ninh mạng",
    profileDomains: "Web · AI · IoT · An ninh",
    storyDialogCode: "STORY / 9:16",
    shareFormatLabel: "Định dạng",
    shareFormatAria: "Chọn định dạng chia sẻ",
    shareFormatStory: "Story 9:16",
    shareFormatSquare: "Vuông 1:1",
    squareDialogCode: "BÀI ĐĂNG / 1:1",
    heroLabel: "Về trang này",
    heroCopy: "Một nơi để xem dự án, mã nguồn, hồ sơ nghề nghiệp và các cập nhật cá nhân của tôi.",
    heroDirectoryCta: "Xem liên kết",
    heroGithubCta: "Mở GitHub",
    profileAlt: "Muhammad Rafi Priyo đang sử dụng máy tính xách tay",
    visualCurrent: "DỰ ÁN HIỆN TẠI",
    visualIndex: "TRANG CÁ NHÂN",
    fieldsAria: "Lĩnh vực đang thực hiện",
    fieldWeb: "Kỹ thuật Web",
    fieldAI: "Công cụ AI",
    fieldIoT: "Hệ thống IoT",
    fieldNetwork: "Mạng",
    fieldSecurity: "An ninh mạng",
    directoryCode: "02 / LIÊN KẾT",
    directoryTitle: "Tất cả liên kết chính, ở cùng một nơi.",
    directoryCopy: "Portfolio cho dự án, GitHub cho mã nguồn, LinkedIn cho hồ sơ nghề nghiệp và Instagram cho hoạt động cá nhân.",
    directoryAria: "Liên kết cá nhân của Muhammad Rafi Priyo",
    portfolioNote: "Dự án chọn lọc, thử nghiệm và ghi chú phát triển.",
    githubNote: "Kho mã, mã nguồn và thử nghiệm kỹ thuật.",
    linkedinNote: "Hồ sơ nghề nghiệp, kinh nghiệm và kết nối.",
    instagramNote: "Hoạt động, sản phẩm và cập nhật cá nhân.",
    aboutRail: "GIỚI THIỆU / TRỌNG TÂM HIỆN TẠI",
    aboutCode: "VỀ TÔI",
    aboutTitle: "Tôi học được nhiều nhất từ những dự án mình thực sự xây dựng.",
    aboutCopy: "Tôi là sinh viên đang tìm hiểu phát triển web, AI, IoT, mạng và an ninh mạng. Tôi thích hiểu cách hệ thống hoạt động từ giao diện, luồng dữ liệu đến các quyết định kỹ thuật phía sau.",
    focusAria: "Trọng tâm hiện tại",
    focusTitle: "Trọng tâm hiện tại",
    focusCount: "5 lĩnh vực",
    focusWeb: "Giao diện, API và kiến trúc ứng dụng",
    focusAI: "Trợ lý AI và quy trình làm việc thực tế",
    focusIoT: "IoT, cảm biến và tích hợp dữ liệu",
    focusSecurity: "Phân tích rủi ro và bảo vệ hệ thống",
    focusNetwork: "Mạng và hệ thống truyền thông",
    toolkitCode: "04 / CÔNG CỤ",
    toolkitTitle: "Công nghệ tôi thường sử dụng.",
    toolkitCopy: "Đây không phải toàn bộ công nghệ tôi từng dùng, mà là những công cụ xuất hiện thường xuyên nhất trong dự án, thử nghiệm và prototype của tôi.",
    toolkitAria: "Danh sách công nghệ thường dùng",
    socialAria: "Liên kết mạng xã hội",
    storyDialogTitle: "Chọn bố cục bạn muốn chia sẻ.",
    storyDialogCopy: "Chọn 9:16 cho Story hoặc 1:1 cho bài đăng vuông, sau đó chọn phong cách hiển thị.",
    storyVariantAria: "Chọn phiên bản Story",
    storyEditorial: "Editorial",
    storyMinimal: "Minimal",
    storyShare: "Chia sẻ",
    storyDownload: "Tải PNG",
    storyClose: "Đóng",
    storyTip: "Nếu Instagram không xuất hiện trong menu chia sẻ, hãy tải PNG rồi đăng thủ công lên Story. Thêm Link Sticker dẫn đến Rafi Links để người xem có thể mở trực tiếp.",
    storyPreviewAlt: "Xem trước Instagram Story Rafi Links",
    shareText: "Xem dự án, mã nguồn và hồ sơ của Muhammad Rafi Priyo trên Rafi Links.",
    copied: "Đã sao chép liên kết.",
    copyFallback: "Sao chép địa chỉ trang từ thanh địa chỉ của trình duyệt.",
    storyPreviewError: "Chưa thể tạo bản xem trước Story.",
    storyMinimalDownloaded: "Đã tải Story Minimal.",
    storyEditorialDownloaded: "Đã tải Story Editorial.",
    storyDownloadError: "Chưa thể tải tệp Story.",
    storyShareError: "Thiết bị này chưa hỗ trợ chia sẻ Story.",
    storyVariantError: "Chưa thể tải phiên bản Story này.",
    story: {
      areas: "WEB · AI · IOT · MẠNG · AN NINH",
      side: "RAFI LINKS / INSTAGRAM STORY",
      badge: "XÂY DỰNG / THỬ / HỌC",
      intro: "Portfolio, mã nguồn, hồ sơ nghề nghiệp và cập nhật cá nhân trong một trang.",
      personalIndex: "TRANG CÁ NHÂN / 2026",
      minimalIntro: "Bốn liên kết chính trong một trang gọn gàng.",
      scanOpen: "QUÉT / MỞ",
      directAccess: "TRUY CẬP TRỰC TIẾP",
      scanToOpen: "QUÉT ĐỂ MỞ",
      links: ["Dự án chọn lọc và thử nghiệm", "Mã nguồn, kho mã và thử nghiệm kỹ thuật", "Hồ sơ nghề nghiệp và kết nối", "Hoạt động và cập nhật cá nhân"]
    }
  },
  "zh-CN": {
    locale: "zh_CN",
    metaDescription: "Rafi Links — Muhammad Rafi Priyo 的个人链接页，汇集作品集、GitHub、LinkedIn、Instagram 与技术项目。",
    ogDescription: "Muhammad Rafi Priyo 的作品、代码、项目与个人资料，涵盖 Web、AI、IoT、网络与网络安全。",
    skip: "跳到主要内容",
    brandHomeAria: "Rafi Links，返回顶部",
    mainNavAria: "主导航",
    navDirectory: "链接",
    navAbout: "关于",
    navShare: "分享",
    navStory: "IG Story",
    navDownload: "下载",
    downloadStoryAria: "直接下载 Instagram Story",
    languageLabel: "语言",
    languageSelectAria: "选择语言",
    country: "印度尼西亚",
    roleDeveloper: "全栈开发者",
    roleCybersecurity: "网络安全爱好者",
    profileDomains: "Web · AI · IoT · 网络安全",
    storyDialogCode: "Story / 9:16",
    shareFormatLabel: "格式",
    shareFormatAria: "选择分享格式",
    shareFormatStory: "Story 9:16",
    shareFormatSquare: "方形 1:1",
    squareDialogCode: "帖子 / 1:1",
    heroLabel: "关于此页面",
    heroCopy: "在一个页面查看我的项目、源代码、职业资料和个人动态。",
    heroDirectoryCta: "查看链接",
    heroGithubCta: "打开 GitHub",
    profileAlt: "Muhammad Rafi Priyo 正在使用笔记本电脑",
    visualCurrent: "当前项目",
    visualIndex: "个人主页",
    fieldsAria: "工作领域",
    fieldWeb: "Web 开发",
    fieldAI: "AI 工具",
    fieldIoT: "IoT 系统",
    fieldNetwork: "网络",
    fieldSecurity: "网络安全",
    directoryCode: "02 / 链接",
    directoryTitle: "主要链接，都在这里。",
    directoryCopy: "Portfolio 查看项目，GitHub 查看代码，LinkedIn 查看职业资料，Instagram 查看个人动态。",
    directoryAria: "Muhammad Rafi Priyo 的个人链接",
    portfolioNote: "精选项目、实验与开发记录。",
    githubNote: "代码仓库、源代码与技术实验。",
    linkedinNote: "职业资料、经历与人脉。",
    instagramNote: "个人活动、作品与动态。",
    aboutRail: "关于 / 当前方向",
    aboutCode: "关于我",
    aboutTitle: "我从真正动手完成的项目中学到最多。",
    aboutCopy: "我是一名大学生，专注于 Web 开发、AI、IoT、网络与网络安全。我喜欢从界面、数据流到背后的技术决策，理解一个系统为什么这样工作。",
    focusAria: "当前方向",
    focusTitle: "当前方向",
    focusCount: "5 个领域",
    focusWeb: "界面、API 与应用架构",
    focusAI: "AI 助手与实用工作流",
    focusIoT: "IoT、传感器与数据集成",
    focusSecurity: "风险分析与系统防护",
    focusNetwork: "网络与通信系统",
    toolkitCode: "04 / 工具",
    toolkitTitle: "我经常使用的技术。",
    toolkitCopy: "这并不是我用过的全部技术，而是最常出现在我的项目、实验和原型中的工具。",
    toolkitAria: "常用技术列表",
    socialAria: "社交链接",
    storyDialogTitle: "选择要分享的样式。",
    storyDialogCopy: "选择 9:16 用于 Story，或 1:1 用于方形帖子，然后选择视觉风格。",
    storyVariantAria: "选择 Story 版本",
    storyEditorial: "Editorial",
    storyMinimal: "Minimal",
    storyShare: "分享",
    storyDownload: "下载 PNG",
    storyClose: "关闭",
    storyTip: "如果分享菜单中没有 Instagram，请先下载 PNG，再手动上传到 Story，并添加指向 Rafi Links 的链接贴纸。",
    storyPreviewAlt: "Rafi Links Instagram Story 预览",
    shareText: "在 Rafi Links 查看 Muhammad Rafi Priyo 的项目、代码与资料。",
    copied: "链接已复制。",
    copyFallback: "请从浏览器地址栏复制页面地址。",
    storyPreviewError: "暂时无法生成 Story 预览。",
    storyMinimalDownloaded: "Minimal Story 已下载。",
    storyEditorialDownloaded: "Editorial Story 已下载。",
    storyDownloadError: "暂时无法下载 Story 文件。",
    storyShareError: "此设备暂不支持分享 Story。",
    storyVariantError: "暂时无法加载此 Story 版本。",
    story: {
      areas: "WEB · AI · IOT · 网络 · 安全",
      side: "RAFI LINKS / INSTAGRAM STORY",
      badge: "构建 / 测试 / 学习",
      intro: "作品集、源代码、职业资料和个人动态集中在一个页面。",
      personalIndex: "个人主页 / 2026",
      minimalIntro: "四个主要链接，集中在一个简洁页面。",
      scanOpen: "扫码 / 打开",
      directAccess: "直接访问",
      scanToOpen: "扫码打开",
      links: ["精选项目与实验", "代码、仓库与技术实验", "职业资料与人脉", "个人活动与动态"]
    }
  },
  ja: {
    locale: "ja_JP",
    metaDescription: "Rafi Links — Muhammad Rafi Priyo のポートフォリオ、GitHub、LinkedIn、Instagram、技術プロジェクトをまとめたページです。",
    ogDescription: "Muhammad Rafi Priyo の作品、コード、プロジェクト、プロフィール。Web、AI、IoT、ネットワーク、サイバーセキュリティを扱います。",
    skip: "メインコンテンツへ移動",
    brandHomeAria: "Rafi Links、ページ上部へ戻る",
    mainNavAria: "メインナビゲーション",
    navDirectory: "リンク",
    navAbout: "概要",
    navShare: "共有",
    navStory: "IG Story",
    navDownload: "保存",
    downloadStoryAria: "Instagram Story を直接ダウンロード",
    languageLabel: "言語",
    languageSelectAria: "言語を選択",
    country: "インドネシア",
    roleDeveloper: "フルスタック開発者",
    roleCybersecurity: "サイバーセキュリティ",
    profileDomains: "Web · AI · IoT · セキュリティ",
    storyDialogCode: "ストーリー / 9:16",
    shareFormatLabel: "形式",
    shareFormatAria: "共有形式を選択",
    shareFormatStory: "Story 9:16",
    shareFormatSquare: "正方形 1:1",
    squareDialogCode: "投稿 / 1:1",
    heroLabel: "このページについて",
    heroCopy: "プロジェクト、ソースコード、プロフィール、個人の更新を一か所で確認できます。",
    heroDirectoryCta: "リンクを見る",
    heroGithubCta: "GitHub を開く",
    profileAlt: "ノートパソコンを使用している Muhammad Rafi Priyo",
    visualCurrent: "現在のプロジェクト",
    visualIndex: "個人ページ",
    fieldsAria: "取り組んでいる分野",
    fieldWeb: "Web エンジニアリング",
    fieldAI: "AI ツール",
    fieldIoT: "IoT システム",
    fieldNetwork: "ネットワーク",
    fieldSecurity: "サイバーセキュリティ",
    directoryCode: "02 / リンク",
    directoryTitle: "主要なリンクを、ひとつの場所に。",
    directoryCopy: "Portfolio では作品、GitHub ではコード、LinkedIn では職歴、Instagram では個人の活動を確認できます。",
    directoryAria: "Muhammad Rafi Priyo の個人リンク",
    portfolioNote: "選定したプロジェクト、実験、開発メモ。",
    githubNote: "リポジトリ、ソースコード、技術実験。",
    linkedinNote: "プロフィール、経験、つながり。",
    instagramNote: "個人の活動、作品、更新。",
    aboutRail: "概要 / 現在のフォーカス",
    aboutCode: "自己紹介",
    aboutTitle: "実際に作るプロジェクトから、最も多く学んでいます。",
    aboutCopy: "Web 開発、AI、IoT、ネットワーク、サイバーセキュリティを学ぶ大学生です。UI やデータフローから、その裏にある技術的な判断まで、システムがどう動くかを理解することが好きです。",
    focusAria: "現在のフォーカス",
    focusTitle: "現在のフォーカス",
    focusCount: "5 分野",
    focusWeb: "UI、API、アプリケーション設計",
    focusAI: "AI アシスタントと実用的なワークフロー",
    focusIoT: "IoT、センサー、データ連携",
    focusSecurity: "リスク分析とシステム防御",
    focusNetwork: "ネットワークと通信システム",
    toolkitCode: "04 / ツール",
    toolkitTitle: "よく使う技術。",
    toolkitCopy: "これまで使った技術のすべてではなく、プロジェクト、実験、プロトタイプで特によく使うものをまとめています。",
    toolkitAria: "よく使う技術一覧",
    socialAria: "ソーシャルリンク",
    storyDialogTitle: "共有するデザインを選択してください。",
    storyDialogCopy: "Story 用の 9:16 または正方形投稿用の 1:1 を選び、その後デザインを選択してください。",
    storyVariantAria: "Story の種類を選択",
    storyEditorial: "Editorial",
    storyMinimal: "Minimal",
    storyShare: "共有",
    storyDownload: "PNG を保存",
    storyClose: "閉じる",
    storyTip: "共有メニューに Instagram が表示されない場合は、PNG を保存して Story に手動でアップロードし、Rafi Links への Link Sticker を追加してください。",
    storyPreviewAlt: "Rafi Links Instagram Story のプレビュー",
    shareText: "Rafi Links で Muhammad Rafi Priyo のプロジェクト、コード、プロフィールを見る。",
    copied: "リンクをコピーしました。",
    copyFallback: "ブラウザのアドレスバーからページ URL をコピーしてください。",
    storyPreviewError: "Story のプレビューを生成できませんでした。",
    storyMinimalDownloaded: "Minimal Story を保存しました。",
    storyEditorialDownloaded: "Editorial Story を保存しました。",
    storyDownloadError: "Story ファイルを保存できませんでした。",
    storyShareError: "この端末では Story の共有を利用できません。",
    storyVariantError: "この Story バージョンを読み込めませんでした。",
    story: {
      areas: "WEB · AI · IOT · ネットワーク · セキュリティ",
      side: "RAFI LINKS / INSTAGRAM STORY",
      badge: "作る / 試す / 学ぶ",
      intro: "ポートフォリオ、ソースコード、プロフィール、個人の更新をひとつのページにまとめています。",
      personalIndex: "個人ページ / 2026",
      minimalIntro: "4 つの主要リンクを、コンパクトな 1 ページに。",
      scanOpen: "スキャン / 開く",
      directAccess: "直接アクセス",
      scanToOpen: "スキャンして開く",
      links: ["選定プロジェクトと実験", "コード、リポジトリ、技術実験", "プロフィールとつながり", "個人の活動と更新"]
    }
  }
};

let toastTimer;
let storyObjectUrl = "";
let currentStoryVariant = "editorial";
let currentShareFormat = "story";
let currentLanguage = "id";

function t(key) {
  return TRANSLATIONS[currentLanguage]?.[key] ?? TRANSLATIONS.id[key] ?? key;
}

function storyT() {
  return TRANSLATIONS[currentLanguage]?.story ?? TRANSLATIONS.id.story;
}


function applyLanguage(language, persist = true) {
  if (!TRANSLATIONS[language]) language = "id";
  currentLanguage = language;
  const dictionary = TRANSLATIONS[language];

  document.documentElement.lang = language;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const value = dictionary[element.dataset.i18n];
    if (typeof value === "string") element.textContent = value;
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    const value = dictionary[element.dataset.i18nAria];
    if (typeof value === "string") element.setAttribute("aria-label", value);
  });
  document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
    const value = dictionary[element.dataset.i18nAlt];
    if (typeof value === "string") element.setAttribute("alt", value);
  });

  const description = document.querySelector('meta[name="description"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');
  const ogLocale = document.querySelector('meta[property="og:locale"]');
  if (description) description.content = dictionary.metaDescription;
  if (ogDescription) ogDescription.content = dictionary.ogDescription;
  if (ogLocale) ogLocale.content = dictionary.locale;
  if (languageSelect) languageSelect.value = language;
  if (dialogIndex) dialogIndex.textContent = t(currentShareFormat === "square" ? "squareDialogCode" : "storyDialogCode");
  if (persist) {
    try { localStorage.setItem(LANGUAGE_STORAGE_KEY, language); } catch {}
  }

  if (storyDialog?.open) {
    ensureStoryFile(currentStoryVariant, currentShareFormat).catch(() => showToast(t("storyVariantError")));
  }
}

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2400);
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
  }, { threshold: 0.12, rootMargin: "0px 0px -40px" });

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
  try { copied = document.execCommand("copy"); }
  finally { textarea.remove(); }
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
  const shareData = { title: document.title, text: t("shareText"), url: window.location.href };
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
    showToast(t("copied"));
  } catch {
    showToast(t("copyFallback"));
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

function segmentText(text) {
  if (typeof Intl !== "undefined" && Intl.Segmenter) {
    try {
      const segmenter = new Intl.Segmenter(currentLanguage, { granularity: "word" });
      return [...segmenter.segment(text)].map((item) => item.segment);
    } catch {}
  }
  return /\s/.test(text) ? text.split(/(\s+)/) : Array.from(text);
}

function textLines(ctx, text, maxWidth, maxLines = Infinity) {
  const segments = segmentText(text);
  const lines = [];
  let line = "";

  for (const segment of segments) {
    const candidate = line + segment;
    if (!line || ctx.measureText(candidate).width <= maxWidth) {
      line = candidate;
      continue;
    }
    lines.push(line.trim());
    line = segment.trimStart();
    if (lines.length >= maxLines) break;
  }
  if (line && lines.length < maxLines) lines.push(line.trim());
  return lines;
}

function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight, maxLines = Infinity) {
  const lines = textLines(ctx, text, maxWidth, maxLines);
  lines.forEach((line, index) => ctx.fillText(line, x, y + index * lineHeight));
  return lines.length;
}

function setFittedFont(ctx, text, maxWidth, startSize, minSize, fontFamily, weight = 700) {
  let size = startSize;
  while (size > minSize) {
    ctx.font = `${weight} ${size}px ${fontFamily}`;
    if (ctx.measureText(text).width <= maxWidth) return size;
    size -= 1;
  }
  ctx.font = `${weight} ${minSize}px ${fontFamily}`;
  return minSize;
}

function setStoryVariant(variant) {
  currentStoryVariant = variant;
  storyVariantButtons.forEach((button) => {
    const isActive = button.dataset.storyVariant === variant;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function setShareFormat(format) {
  currentShareFormat = format === "square" ? "square" : "story";
  shareFormatButtons.forEach((button) => {
    const isActive = button.dataset.shareFormat === currentShareFormat;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  storyFrame?.classList.toggle("is-square", currentShareFormat === "square");
  if (dialogIndex) dialogIndex.textContent = t(currentShareFormat === "square" ? "squareDialogCode" : "storyDialogCode");
}

function storyFileName(variant = currentStoryVariant, format = currentShareFormat) {
  const size = format === "square" ? "1x1" : "9x16";
  return `rafi-links-${size}-${variant}.png`;
}

function drawStoryGrid(ctx, width, height, step = 64, opacity = 0.07, color = "255,255,255") {
  ctx.save();
  ctx.strokeStyle = `rgba(${color},${opacity})`;
  ctx.lineWidth = 1;
  for (let x = 0; x <= width; x += step) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
  }
  for (let y = 0; y <= height; y += step) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
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
  if (grayscale) ctx.filter = "grayscale(1) contrast(1.12) brightness(1.03)";
  ctx.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height);
  ctx.restore();
}

function storyLinks() {
  const details = storyT().links;
  return [
    { index: "01", title: "Portfolio", detail: details[0] },
    { index: "02", title: "GitHub", detail: details[1] },
    { index: "03", title: "LinkedIn", detail: details[2] },
    { index: "04", title: "Instagram", detail: details[3] }
  ];
}

function drawEditorialStory(ctx, width, height, assets) {
  const blue = "#2156d8";
  const ink = "#111111";
  const paper = "#f4f3ef";
  const white = "#fffefa";
  const mutedWhite = "rgba(255,255,255,.58)";
  const content = storyT();

  ctx.fillStyle = paper;
  ctx.fillRect(0, 0, width, height);
  drawStoryGrid(ctx, width, height, 72, 0.06, "17,17,17");

  const frame = { x: 52, y: 52, w: width - 104, h: height - 104 };
  const railW = 112;
  const panel = { x: 78, y: 78, w: width - 78 - railW - 26, h: height - 156 };
  ctx.strokeStyle = ink;
  ctx.lineWidth = 2;
  ctx.strokeRect(frame.x, frame.y, frame.w, frame.h);
  ctx.fillStyle = blue;
  ctx.fillRect(width - railW, 0, railW, height);
  ctx.fillStyle = ink;
  ctx.fillRect(panel.x, panel.y, panel.w, panel.h);

  const padX = panel.x + 34;
  const right = panel.x + panel.w - 34;
  ctx.fillStyle = white;
  ctx.font = '700 21px "SFMono-Regular", Consolas, monospace';
  ctx.fillText("MUHAMMAD RAFI PRIYO / 2026", padX, panel.y + 48);
  ctx.fillStyle = mutedWhite;
  ctx.font = '500 17px system-ui, sans-serif';
  drawWrappedText(ctx, content.areas, padX, panel.y + 82, panel.w - 68, 24, 2);

  const heroTop = panel.y + 128;
  const photoW = 270;
  const photoH = 560;
  const photoX = right - photoW;
  const photoY = heroTop + 8;
  const titleW = photoX - padX - 34;

  ctx.fillStyle = white;
  ctx.font = '900 110px "Arial Black", Arial, system-ui, sans-serif';
  ctx.fillText("RAFI", padX, heroTop + 128);
  ctx.strokeStyle = white;
  ctx.lineWidth = 3;
  ctx.font = '900 102px "Arial Black", Arial, system-ui, sans-serif';
  ctx.strokeText("LINKS", padX + 62, heroTop + 222);

  ctx.fillStyle = blue;
  ctx.fillRect(padX, heroTop + 270, Math.min(330, titleW), 54);
  ctx.fillStyle = white;
  setFittedFont(ctx, content.badge, Math.min(292, titleW - 30), 21, 14, 'system-ui, sans-serif', 800);
  ctx.fillText(content.badge, padX + 16, heroTop + 306);

  ctx.fillStyle = "rgba(255,255,255,.7)";
  ctx.font = '400 24px system-ui, sans-serif';
  drawWrappedText(ctx, content.intro, padX, heroTop + 374, titleW, 35, 4);

  drawProfileCrop(ctx, assets.profileImage, photoX, photoY, photoW, photoH, true);
  ctx.strokeStyle = "rgba(255,255,255,.72)";
  ctx.lineWidth = 2;
  ctx.strokeRect(photoX, photoY, photoW, photoH);
  ctx.fillStyle = blue;
  ctx.fillRect(photoX + photoW - 86, photoY + 20, 86, 36);
  ctx.fillStyle = mutedWhite;
  setFittedFont(ctx, content.personalIndex, photoW - 18, 14, 10, '"SFMono-Regular", Consolas, monospace', 700);
  ctx.fillText(content.personalIndex, photoX + 8, photoY + photoH + 26);

  const linksY = heroTop + 630;
  ctx.strokeStyle = "rgba(255,255,255,.18)";
  ctx.beginPath();ctx.moveTo(padX, linksY - 22);ctx.lineTo(right, linksY - 22);ctx.stroke();
  const gap = 18;
  const cardW = (right - padX - gap) / 2;
  const cardH = 190;
  storyLinks().forEach((item, index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    const x = padX + col * (cardW + gap);
    const y = linksY + row * (cardH + gap);
    ctx.strokeStyle = "rgba(255,255,255,.2)";
    ctx.strokeRect(x, y, cardW, cardH);
    ctx.fillStyle = "#88a8ff";
    ctx.font = '700 16px "SFMono-Regular", Consolas, monospace';
    ctx.fillText(item.index, x + 16, y + 27);
    ctx.fillStyle = white;
    setFittedFont(ctx, item.title.toUpperCase(), cardW - 32, 34, 23, '"Arial Black", Arial, system-ui, sans-serif', 900);
    ctx.fillText(item.title.toUpperCase(), x + 16, y + 72);
    ctx.fillStyle = mutedWhite;
    ctx.font = '400 16px system-ui, sans-serif';
    drawWrappedText(ctx, item.detail, x + 16, y + 106, cardW - 32, 22, 3);
  });

  const footerY = 1328;
  const qrSize = 232;
  ctx.strokeStyle = "rgba(255,255,255,.18)";
  ctx.beginPath();ctx.moveTo(padX, footerY - 26);ctx.lineTo(right, footerY - 26);ctx.stroke();
  ctx.fillStyle = paper;
  ctx.fillRect(padX, footerY, qrSize, qrSize);
  ctx.drawImage(assets.qrImage, padX + 16, footerY + 16, qrSize - 32, qrSize - 32);
  ctx.fillStyle = white;
  ctx.font = '700 19px "SFMono-Regular", Consolas, monospace';
  ctx.fillText(content.scanOpen, padX + 270, footerY + 54);
  ctx.font = '900 56px "Arial Black", Arial, system-ui, sans-serif';
  ctx.fillText("RAFI LINKS", padX + 270, footerY + 128);
  ctx.fillStyle = mutedWhite;
  ctx.font = '400 19px system-ui, sans-serif';
  drawWrappedText(ctx, STORY_URL.replace(/^https?:\/\//, ""), padX + 270, footerY + 168, Math.max(280, right - (padX + 270)), 25, 2);

  const bottomY = panel.y + panel.h - 78;
  ctx.strokeStyle = "rgba(255,255,255,.18)";
  ctx.beginPath();ctx.moveTo(padX, bottomY - 24);ctx.lineTo(right, bottomY - 24);ctx.stroke();
  ctx.fillStyle = mutedWhite;
  ctx.font = '700 14px "SFMono-Regular", Consolas, monospace';
  ctx.fillText("MUHAMMAD RAFI PRIYO", padX, bottomY);
  setFittedFont(ctx, content.areas, 390, 14, 10, '"SFMono-Regular", Consolas, monospace', 700);
  ctx.textAlign = "right";
  ctx.fillText(content.areas, right, bottomY);
  ctx.textAlign = "left";

  ctx.save();
  ctx.translate(width - 42, 300);
  ctx.rotate(Math.PI / 2);
  ctx.fillStyle = white;
  setFittedFont(ctx, content.side, 720, 18, 12, '"SFMono-Regular", Consolas, monospace', 700);
  ctx.fillText(content.side, 0, 0);
  ctx.restore();
}

function drawMinimalStory(ctx, width, height, assets) {
  const blue = "#2156d8", ink = "#111111", paper = "#f4f3ef", muted = "#666660", content = storyT(), pad = 66;
  ctx.fillStyle = paper; ctx.fillRect(0, 0, width, height); drawStoryGrid(ctx, width, height, 72, .065, "17,17,17");
  ctx.strokeStyle = ink; ctx.lineWidth = 2; ctx.strokeRect(pad, pad, width - pad * 2, height - pad * 2);
  ctx.fillStyle = blue; ctx.fillRect(pad, pad, 88, 88);
  ctx.fillStyle = "#fff"; ctx.font = '900 48px "Arial Black", Arial, sans-serif'; ctx.fillText("R", pad + 27, pad + 61);
  ctx.fillStyle = ink; ctx.font = '700 20px "SFMono-Regular", Consolas, monospace'; ctx.fillText("MUHAMMAD RAFI PRIYO", pad + 118, pad + 38);
  ctx.fillStyle = muted; setFittedFont(ctx, content.personalIndex, 470, 17, 12, 'system-ui, sans-serif', 500); ctx.fillText(content.personalIndex, pad + 118, pad + 72);

  const photoX = 620, photoY = 196, photoW = 280, photoH = 390;
  drawProfileCrop(ctx, assets.profileImage, photoX, photoY, photoW, photoH, true); ctx.strokeStyle = ink; ctx.strokeRect(photoX, photoY, photoW, photoH);
  ctx.fillStyle = ink; ctx.font = '900 108px "Arial Black", Arial, system-ui, sans-serif'; ctx.fillText("RAFI", pad + 18, 308);
  ctx.strokeStyle = ink; ctx.lineWidth = 3; ctx.strokeText("LINKS", pad + 72, 405);
  ctx.fillStyle = muted; ctx.font = '400 26px system-ui, sans-serif'; drawWrappedText(ctx, content.minimalIntro, pad + 20, 488, 500, 38, 3);

  const linksY = 676, gap = 16, cardW = (width - pad * 2 - gap) / 2, cardH = 190;
  storyLinks().forEach((item, index) => { const col = index % 2, row = Math.floor(index / 2), x = pad + col * (cardW + gap), y = linksY + row * (cardH + gap); ctx.strokeStyle = "rgba(17,17,17,.34)"; ctx.strokeRect(x, y, cardW, cardH); ctx.fillStyle = blue; ctx.font = '700 16px "SFMono-Regular", Consolas, monospace'; ctx.fillText(item.index, x + 16, y + 28); ctx.fillStyle = ink; setFittedFont(ctx, item.title.toUpperCase(), cardW - 32, 34, 23, '"Arial Black", Arial, system-ui, sans-serif', 900); ctx.fillText(item.title.toUpperCase(), x + 16, y + 76); ctx.fillStyle = muted; ctx.font = '400 16px system-ui, sans-serif'; drawWrappedText(ctx, item.detail, x + 16, y + 108, cardW - 32, 22, 3); });

  const footerY = 1430; ctx.strokeStyle = ink; ctx.beginPath(); ctx.moveTo(pad, footerY - 24); ctx.lineTo(width - pad, footerY - 24); ctx.stroke();
  ctx.fillStyle = paper; ctx.fillRect(pad, footerY, 180, 180); ctx.strokeRect(pad, footerY, 180, 180); ctx.drawImage(assets.qrImage, pad + 14, footerY + 14, 152, 152);
  ctx.fillStyle = blue; ctx.font = '700 18px "SFMono-Regular", Consolas, monospace'; ctx.fillText(content.directAccess, pad + 216, footerY + 48);
  ctx.fillStyle = ink; ctx.font = '900 48px "Arial Black", Arial, system-ui, sans-serif'; drawWrappedText(ctx, content.scanToOpen, pad + 216, footerY + 110, 560, 54, 2);
  ctx.fillStyle = muted; ctx.font = '400 18px system-ui, sans-serif'; drawWrappedText(ctx, STORY_URL.replace(/^https?:\/\//, ""), pad + 216, footerY + 158, 560, 24, 2);
}

function drawSquareEditorial(ctx, width, height, assets) {
  const blue = "#2156d8", ink = "#111111", paper = "#f4f3ef", white = "#fffefa", mutedWhite = "rgba(255,255,255,.58)", content = storyT();
  ctx.fillStyle = paper; ctx.fillRect(0, 0, width, height); drawStoryGrid(ctx, width, height, 64, .06, "17,17,17");
  const outer = 44, rail = 96; ctx.strokeStyle = ink; ctx.lineWidth = 2; ctx.strokeRect(outer, outer, width - outer * 2, height - outer * 2); ctx.fillStyle = blue; ctx.fillRect(width - rail, 0, rail, height);
  const panel = { x: 68, y: 68, w: width - 68 - rail - 26, h: height - 136 }; ctx.fillStyle = ink; ctx.fillRect(panel.x, panel.y, panel.w, panel.h);
  const x = panel.x + 30, right = panel.x + panel.w - 30;
  ctx.fillStyle = white; ctx.font = '700 18px "SFMono-Regular", Consolas, monospace'; ctx.fillText("MUHAMMAD RAFI PRIYO / 2026", x, panel.y + 40);
  ctx.fillStyle = mutedWhite; ctx.font = '500 14px system-ui, sans-serif'; drawWrappedText(ctx, content.areas, x, panel.y + 68, 500, 20, 2);
  ctx.fillStyle = white; ctx.font = '900 84px "Arial Black", Arial, sans-serif'; ctx.fillText("RAFI", x, panel.y + 180); ctx.strokeStyle = white; ctx.lineWidth = 2.5; ctx.font = '900 80px "Arial Black", Arial, sans-serif'; ctx.strokeText("LINKS", x + 54, panel.y + 252);
  const photoW = 250, photoH = 300, photoX = right - photoW, photoY = panel.y + 92; drawProfileCrop(ctx, assets.profileImage, photoX, photoY, photoW, photoH, true); ctx.strokeStyle = "rgba(255,255,255,.7)"; ctx.strokeRect(photoX, photoY, photoW, photoH);
  ctx.fillStyle = blue; ctx.fillRect(x, panel.y + 286, 286, 46); ctx.fillStyle = white; setFittedFont(ctx, content.badge, 252, 18, 12, 'system-ui, sans-serif', 800); ctx.fillText(content.badge, x + 14, panel.y + 316);
  ctx.fillStyle = "rgba(255,255,255,.7)"; ctx.font = '400 18px system-ui, sans-serif'; drawWrappedText(ctx, content.intro, x, panel.y + 370, photoX - x - 28, 27, 3);
  const linksY = panel.y + 450, gap = 14, cardW = (right - x - gap) / 2, cardH = 132; storyLinks().forEach((item, index) => { const col = index % 2, row = Math.floor(index / 2), cx = x + col * (cardW + gap), cy = linksY + row * (cardH + gap); ctx.strokeStyle = "rgba(255,255,255,.2)"; ctx.strokeRect(cx, cy, cardW, cardH); ctx.fillStyle = "#88a8ff"; ctx.font = '700 14px "SFMono-Regular", Consolas, monospace'; ctx.fillText(item.index, cx + 14, cy + 24); ctx.fillStyle = white; setFittedFont(ctx, item.title.toUpperCase(), cardW - 28, 27, 20, '"Arial Black", Arial, sans-serif', 900); ctx.fillText(item.title.toUpperCase(), cx + 14, cy + 60); ctx.fillStyle = mutedWhite; ctx.font = '400 14px system-ui, sans-serif'; drawWrappedText(ctx, item.detail, cx + 14, cy + 88, cardW - 28, 19, 2); });
  const qr = 126, qx = x, qy = panel.y + panel.h - 158; ctx.fillStyle = paper; ctx.fillRect(qx, qy, qr, qr); ctx.drawImage(assets.qrImage, qx + 10, qy + 10, qr - 20, qr - 20); ctx.fillStyle = white; ctx.font = '700 15px "SFMono-Regular", Consolas, monospace'; ctx.fillText(content.scanOpen, qx + 154, qy + 35); ctx.font = '900 36px "Arial Black", Arial, sans-serif'; ctx.fillText("RAFI LINKS", qx + 154, qy + 82); ctx.fillStyle = mutedWhite; ctx.font = '400 14px system-ui, sans-serif'; drawWrappedText(ctx, STORY_URL.replace(/^https?:\/\//, ""), qx + 154, qy + 110, right - (qx + 154), 19, 2);
  ctx.save(); ctx.translate(width - 36, 208); ctx.rotate(Math.PI / 2); ctx.fillStyle = white; setFittedFont(ctx, content.side, 560, 15, 10, '"SFMono-Regular", Consolas, monospace', 700); ctx.fillText(content.side, 0, 0); ctx.restore();
}

function drawSquareMinimal(ctx, width, height, assets) {
  const blue = "#2156d8", ink = "#111111", paper = "#f4f3ef", muted = "#666660", content = storyT(), pad = 58;
  ctx.fillStyle = paper; ctx.fillRect(0, 0, width, height); drawStoryGrid(ctx, width, height, 64, .065, "17,17,17"); ctx.strokeStyle = ink; ctx.lineWidth = 2; ctx.strokeRect(pad, pad, width - pad * 2, height - pad * 2);
  ctx.fillStyle = blue; ctx.fillRect(pad, pad, 76, 76); ctx.fillStyle = "#fff"; ctx.font = '900 42px "Arial Black", Arial, sans-serif'; ctx.fillText("R", pad + 23, pad + 53);
  ctx.fillStyle = ink; ctx.font = '700 17px "SFMono-Regular", Consolas, monospace'; ctx.fillText("MUHAMMAD RAFI PRIYO", pad + 100, pad + 32); ctx.fillStyle = muted; setFittedFont(ctx, content.personalIndex, 390, 15, 11, 'system-ui, sans-serif', 500); ctx.fillText(content.personalIndex, pad + 100, pad + 61);
  ctx.font = '900 76px "Arial Black", Arial, sans-serif'; ctx.fillStyle = ink; ctx.fillText("RAFI", pad + 18, 240); ctx.strokeStyle = ink; ctx.lineWidth = 2.5; ctx.strokeText("LINKS", pad + 62, 308);
  const photoX = 660, photoY = 150, photoW = 250, photoH = 280; drawProfileCrop(ctx, assets.profileImage, photoX, photoY, photoW, photoH, true); ctx.strokeStyle = ink; ctx.strokeRect(photoX, photoY, photoW, photoH);
  ctx.fillStyle = muted; ctx.font = '400 18px system-ui, sans-serif'; drawWrappedText(ctx, content.minimalIntro, pad + 20, 358, 470, 26, 3);
  const linksY = 478, gap = 14, cardW = (width - pad * 2 - gap) / 2, cardH = 128; storyLinks().forEach((item, index) => { const col = index % 2, row = Math.floor(index / 2), x = pad + col * (cardW + gap), y = linksY + row * (cardH + gap); ctx.strokeStyle = "rgba(17,17,17,.35)"; ctx.strokeRect(x, y, cardW, cardH); ctx.fillStyle = blue; ctx.font = '700 14px "SFMono-Regular", Consolas, monospace'; ctx.fillText(item.index, x + 14, y + 23); ctx.fillStyle = ink; setFittedFont(ctx, item.title.toUpperCase(), cardW - 28, 27, 20, '"Arial Black", Arial, sans-serif', 900); ctx.fillText(item.title.toUpperCase(), x + 14, y + 58); ctx.fillStyle = muted; ctx.font = '400 14px system-ui, sans-serif'; drawWrappedText(ctx, item.detail, x + 14, y + 86, cardW - 28, 18, 2); });
  const q = 118, qx = pad, qy = height - pad - q; ctx.fillStyle = paper; ctx.fillRect(qx, qy, q, q); ctx.strokeStyle = ink; ctx.strokeRect(qx, qy, q, q); ctx.drawImage(assets.qrImage, qx + 9, qy + 9, q - 18, q - 18); ctx.fillStyle = blue; ctx.font = '700 14px "SFMono-Regular", Consolas, monospace'; ctx.fillText(content.directAccess, qx + 144, qy + 31); ctx.fillStyle = ink; ctx.font = '900 34px "Arial Black", Arial, sans-serif'; ctx.fillText("RAFI LINKS", qx + 144, qy + 73); ctx.fillStyle = muted; ctx.font = '400 14px system-ui, sans-serif'; drawWrappedText(ctx, STORY_URL.replace(/^https?:\/\//, ""), qx + 144, qy + 101, 480, 19, 2);
}

async function renderStoryCard(variant = currentStoryVariant, format = currentShareFormat) {
  if (!storyCanvas) return null;
  if (document.fonts?.ready) {
    try { await document.fonts.ready; } catch {}
  }

  const ctx = storyCanvas.getContext("2d");
  if (!ctx) return null;
  const square = format === "square";
  storyCanvas.width = 1080;
  storyCanvas.height = square ? 1080 : 1920;
  ctx.clearRect(0, 0, storyCanvas.width, storyCanvas.height);

  const [qrImage, profileImage] = await Promise.all([
    loadImage("assets/qr-rafilinks.png"),
    loadImage("assets/rafi-profile.jpg")
  ]);
  const assets = { qrImage, profileImage };

  if (square) {
    if (variant === "minimal") drawSquareMinimal(ctx, storyCanvas.width, storyCanvas.height, assets);
    else drawSquareEditorial(ctx, storyCanvas.width, storyCanvas.height, assets);
  } else if (variant === "minimal") {
    drawMinimalStory(ctx, storyCanvas.width, storyCanvas.height, assets);
  } else {
    drawEditorialStory(ctx, storyCanvas.width, storyCanvas.height, assets);
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
      resolve(new File([blob], storyFileName(variant, format), { type: "image/png" }));
    }, "image/png");
  });
}

async function ensureStoryFile(variant = currentStoryVariant, format = currentShareFormat) {
  return renderStoryCard(variant, format);
}

async function openStoryDialog() {
  if (!storyDialog) return;
  try {
    await ensureStoryFile(currentStoryVariant, currentShareFormat);
    if (typeof storyDialog.showModal === "function") storyDialog.showModal();
    else storyDialog.setAttribute("open", "open");
  } catch {
    showToast(t("storyPreviewError"));
  }
}

function closeStoryDialog() {
  if (!storyDialog) return;
  if (typeof storyDialog.close === "function") storyDialog.close();
  else storyDialog.removeAttribute("open");
}

async function downloadStory(variant = currentStoryVariant, format = currentShareFormat) {
  try {
    await ensureStoryFile(variant, format);
    const link = document.createElement("a");
    link.href = storyObjectUrl;
    link.download = storyFileName(variant, format);
    document.body.append(link);
    link.click();
    link.remove();
    showToast(variant === "minimal" ? t("storyMinimalDownloaded") : t("storyEditorialDownloaded"));
  } catch {
    showToast(t("storyDownloadError"));
  }
}

async function shareStoryFile() {
  try {
    const storyFile = await ensureStoryFile(currentStoryVariant, currentShareFormat);
    const shareData = {
      files: [storyFile],
      title: currentStoryVariant === "minimal" ? "Rafi Links Story Minimal" : "Rafi Links Story Editorial",
      text: t("shareText")
    };

    if (navigator.canShare?.(shareData) && navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (error) {
        if (error.name === "AbortError") return;
      }
    }
    await downloadStory(currentStoryVariant, currentShareFormat);
  } catch {
    showToast(t("storyShareError"));
  }
}

async function handleVariantChange(variant) {
  setStoryVariant(variant);
  if (storyDialog?.open) {
    try { await ensureStoryFile(variant, currentShareFormat); }
    catch { showToast(t("storyVariantError")); }
  }
}

async function handleShareFormatChange(format) {
  setShareFormat(format);
  if (storyDialog?.open) {
    try { await ensureStoryFile(currentStoryVariant, currentShareFormat); }
    catch { showToast(t("storyVariantError")); }
  }
}

shareButton?.addEventListener("click", sharePage);
storyButton?.addEventListener("click", openStoryDialog);
quickDownloadButton?.addEventListener("click", () => downloadStory("editorial", "story"));
storyShareButton?.addEventListener("click", shareStoryFile);
storyDownloadButton?.addEventListener("click", () => downloadStory(currentStoryVariant, currentShareFormat));
storyCloseButton?.addEventListener("click", closeStoryDialog);
storyVariantButtons.forEach((button) => {
  button.addEventListener("click", () => handleVariantChange(button.dataset.storyVariant));
});
shareFormatButtons.forEach((button) => {
  button.addEventListener("click", () => handleShareFormatChange(button.dataset.shareFormat));
});
languageSelect?.addEventListener("change", () => applyLanguage(languageSelect.value));

storyDialog?.addEventListener("click", (event) => {
  const bounds = storyDialog.getBoundingClientRect();
  const isOutside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
  if (isOutside) closeStoryDialog();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && storyDialog?.open) closeStoryDialog();
});

let savedLanguage = null;
try { savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY); } catch {}
setShareFormat("story");
applyLanguage(savedLanguage && TRANSLATIONS[savedLanguage] ? savedLanguage : "id", false);
setupScrollReveal();
