/* ============================================================
   Yunhao Zang · Single-page multilingual switcher
   Supported: en / zh-Hans / zh-Hant
   - reads ?lang= from URL, falls back to localStorage, then 'en'
   - replaces [data-i18n] text, [data-i18n-html] markup,
     [data-i18n-aria] aria-label and [data-i18n-alt] alt text
   ============================================================ */

(function () {
  "use strict";

  var LANG_CODES = ["en", "zh-Hans", "zh-Hant"];
  var STORAGE_KEY = "site-lang";

  var I18N = {
    en: {
      metaTitle: "Yunhao Zang — Linguistics PhD Student at CUHK",
      metaDesc:
        "Homepage of Yunhao Zang (臧云皓), PhD student in Linguistics at The Chinese University of Hong Kong under Prof Victor Junnan Pan.",

      skip: "Skip to content",
      navAria: "Primary",
      brandAria: "Yunhao Zang, back to top",
      langAria: "Language",
      toggleAria: "Toggle menu",

      brand:
        'Yunhao Zang&nbsp;<em class="brand-cn">臧云皓</em>',
      navAbout: "About",
      navPublications: "Publications",
      navPresentations: "Presentations",
      navEducation: "Education",
      navContact: "Contact",

      avatarAlt: "Portrait of Yunhao Zang",
      eyebrow: "HI THERE! IT’S YUNHAO.",
      role:
        "PhD Student in Linguistics · The Chinese University of Hong Kong",
      tag: "Generative syntax · Chinese dialects · Minimalist Program",
      chipLocation: "Hong Kong SAR, China",
      chipSupervisor: "Prof Victor Junnan Pan",
      btnPublications: "Publications",
      btnGetInTouch: "Get in touch",

      secAboutKicker: "01 · About Me",
      secAboutTitle: 'About <span class="grad">me</span>',
      aboutLead:
        "I am currently a PhD student at The Chinese University of Hong Kong, supervised by Prof Victor Junnan Pan, and I come from Tianjin, China. My main research interest is syntax, especially the application of the Minimalist Program to the syntactic study of Chinese dialects.",
      aboutBody:
        "My current research mainly deals with numerals and classifiers, directionals, demonstratives, and right-dislocation. I am also interested in other areas of linguistics, such as phonology, Chinese historical phonology, language acquisition, and language processing.",

      secPubKicker: "02 · Publications",
      secPubTitle: "Publications",
      secPubSub: "Selected publications and proceedings papers.",
      tagProceedings: "Proceedings",
      tagJournal: "Journal",
      pub1authors:
        "<strong>Yunhao Zang</strong> &amp; Victor Junnan Pan",
      pub1venue:
        "In Arum Kang (ed.), <em>2026 Syntax and Its Interfaces in Generative Grammar</em>, pp. 324–333. Daejeon: The Korean Generative Grammar Circle.",
      pub1note:
        "Proceedings volume of the 28th Seoul International Conference on Generative Grammar (SICOGG-28).",
      pub2authors: "<strong>Yunhao Zang</strong>",
      pub2venue:
        "<em>Communications in Humanities Research</em>, 34, pp. 17–22.",
      articleLabel: "Article ↗",

      secTalksKicker: "03 · Presentations",
      secTalksTitle: 'Talks &amp; <span class="grad">posters</span>',
      talk1authors: "<strong>Yunhao Zang</strong>",
      talk1venue:
        "Paper presented at the 4th Beijing-Shanghai-Hong Kong-Macao Postgraduate Forum on Chinese Studies, University of Macau, Macao, October 23, 2026.",
      talk2authors:
        "<strong>Yunhao Zang</strong> &amp; Victor Junnan Pan",
      talk2venue:
        "Paper presented at the 28th Seoul International Conference on Generative Grammar (SICOGG-28), Chungnam National University, Daejeon, South Korea, August 10–12, 2026.",
      talk3authors: "<strong>Yunhao Zang</strong>",
      talk3venue:
        "Paper presented at the 2nd Interdisciplinary Taught Postgraduate Student Conference on Arts and Humanities, The Chinese University of Hong Kong, April 30, 2026.",

      secEduKicker: "04 · Education",
      secEduTitle: "Education",
      edu1when: "2026 — present",
      edu1degree: "PhD in Linguistics",
      edu1where: "The Chinese University of Hong Kong",
      edu1detail:
        "Dept. of Linguistics and Modern Languages · PhD student supervised by Prof Victor Junnan Pan.",
      edu2when: "2025 — 2026",
      edu2degree: "MA in Linguistics",
      edu2where: "The Chinese University of Hong Kong",
      edu2detail:
        'Thesis: “Omission of Numeral and Classifier in Mandarin Chinese”.',
      edu3when: "July 2024",
      edu3degree: "Summer School in Languages and Linguistics",
      edu3where: "Leiden University",
      edu3detail: "Linguistics summer school programme.",
      edu4when: "2021 — 2025",
      edu4degree: "BA in English Language and Literature",
      edu4where: "Zhejiang University",
      edu4detail:
        "Coursework in modern linguistics, syntax, phonology, pragmatics, semantics and psycholinguistics.",

      secContactKicker: "05 · Contact",
      secContactTitle: 'Let’s <span class="grad">connect</span>',
      contactEmailLabel: "Email",
      contactLabLabel: "My Lab",

      footerBrand:
        'Yunhao Zang <span class="footer-cn">臧云皓</span>',
      footerTop: "Back to top ↑",
      footerPublications: "Publications",
      footerContact: "Contact",
      footerMeta: "Yunhao Zang. Dept. of Linguistics and Modern Languages, CUHK."
    },

    "zh-Hans": {
      metaTitle: "臧云皓 — 香港中文大学语言学博士研究生",
      metaDesc:
        "臧云皓（Yunhao Zang）的个人主页——香港中文大学语言学博士研究生，师从潘俊楠教授。",

      skip: "跳到主要内容",
      navAria: "主导航",
      brandAria: "臧云皓，回到顶部",
      langAria: "语言",
      toggleAria: "打开菜单",

      brand:
        '臧云皓&nbsp;<em class="brand-cn">Yunhao Zang</em>',
      navAbout: "关于我",
      navPublications: "论文",
      navPresentations: "报告",
      navEducation: "教育",
      navContact: "联系",

      avatarAlt: "臧云皓的照片",
      eyebrow: "你好，我是云皓。",
      role: "香港中文大学语言学博士研究生",
      tag: "生成句法 · 汉语方言 · 最简方案",
      chipLocation: "中国 · 香港",
      chipSupervisor: "导师：潘俊楠教授",
      btnPublications: "论文",
      btnGetInTouch: "联系我",

      secAboutKicker: "01 · 关于我",
      secAboutTitle: '关于<span class="grad">我</span>',
      aboutLead:
        "我目前是香港中文大学的博士生，师从潘俊楠（Victor Junnan Pan）教授，来自中国天津。我的主要研究兴趣是句法学，尤其是最简方案（Minimalist Program）在汉语方言句法研究中的应用。",
      aboutBody:
        "我目前的研究主要涉及数词与量词（numerals and classifiers）、趋向词（directionals）、指示词（demonstratives）以及右置（right-dislocation）。此外，我对语言学的其他领域也很感兴趣，如音系学、汉语历史音韵学、语言习得以及语言加工（language processing）。",

      secPubKicker: "02 · 论文",
      secPubTitle: "发表<strong>论文</strong>",
      secPubSub: "代表性论文与会议论文集（proceedings）论文。",
      tagProceedings: "Proceedings",
      tagJournal: "期刊",
      pub1authors: "臧云皓 &amp; Victor Junnan Pan",
      pub1venue:
        "载于 Arum Kang（编），<em>2026 Syntax and Its Interfaces in Generative Grammar</em>，第 324–333 页。大田：The Korean Generative Grammar Circle。",
      pub1note: "第 28 届首尔生成语法国际会议（SICOGG-28）论文集。",
      pub2authors: "臧云皓",
      pub2venue:
        "《Communications in Humanities Research》，第 34 卷，第 17–22 页。",
      articleLabel: "文章 ↗",

      secTalksKicker: "03 · 报告",
      secTalksTitle: '口头报告与<span class="grad">海报</span>',
      talk1authors: "臧云皓",
      talk1venue:
        "第四届京沪港澳高校中文学科研究生论坛口头报告，澳门大学（澳门），2026 年 10 月 23 日。",
      talk2authors: "臧云皓 &amp; Victor Junnan Pan",
      talk2venue:
        "第 28 届首尔生成语法国际会议（SICOGG-28）口头报告，韩国忠南大学（大田），2026 年 8 月 10–12 日。",
      talk3authors: "臧云皓",
      talk3venue:
        "香港中文大学第二届跨学科授课式研究生人文艺术会议口头报告，2026 年 4 月 30 日。",

      secEduKicker: "04 · 教育",
      secEduTitle: "教育经历",
      edu1when: "2026 至今",
      edu1degree: "语言学博士",
      edu1where: "香港中文大学",
      edu1detail: "语言学及现代语言系 · 由潘俊楠教授指导。",
      edu2when: "2025 – 2026",
      edu2degree: "语言学硕士",
      edu2where: "香港中文大学",
      edu2detail: "学位论文：《普通话数词与量词的省略》。",
      edu3when: "2024 年 7 月",
      edu3degree: "语言与语言学暑期学校",
      edu3where: "莱顿大学",
      edu3detail: "语言学暑期学校课程。",
      edu4when: "2021 – 2025",
      edu4degree: "英语语言文学学士",
      edu4where: "浙江大学",
      edu4detail: "现代语言学、句法学、音系学、语用学、语义学与心理语言学等课程。",

      secContactKicker: "05 · 联系",
      secContactTitle: '与我<span class="grad">联系</span>',
      contactEmailLabel: "邮箱",
      contactLabLabel: "我工作的实验室",

      footerBrand:
        '臧云皓 <span class="footer-cn">Yunhao Zang</span>',
      footerTop: "返回顶部 ↑",
      footerPublications: "论文",
      footerContact: "联系",
      footerMeta: "臧云皓 · 香港中文大学语言学及现代语言系。"
    },

    "zh-Hant": {
      metaTitle: "臧云皓 — 香港中文大學語言學博士研究生",
      metaDesc:
        "臧云皓（Yunhao Zang）的個人主頁——香港中文大學語言學博士研究生，師從潘俊楠教授。",

      skip: "跳到主要內容",
      navAria: "主導覽",
      brandAria: "臧云皓，回到頂部",
      langAria: "語言",
      toggleAria: "打開選單",

      brand:
        '臧云皓&nbsp;<em class="brand-cn">Yunhao Zang</em>',
      navAbout: "關於我",
      navPublications: "論文",
      navPresentations: "報告",
      navEducation: "教育",
      navContact: "聯繫",

      avatarAlt: "臧云皓的照片",
      eyebrow: "你好，我是云皓。",
      role: "香港中文大學語言學博士研究生",
      tag: "生成句法 · 漢語方言 · 最簡方案",
      chipLocation: "中國 · 香港",
      chipSupervisor: "導師：潘俊楠教授",
      btnPublications: "論文",
      btnGetInTouch: "聯繫我",

      secAboutKicker: "01 · 關於我",
      secAboutTitle: '關於<span class="grad">我</span>',
      aboutLead:
        "我目前是香港中文大學的博士生，師從潘俊楠（Victor Junnan Pan）教授，來自中國天津。我的主要研究興趣是句法學，尤其是最簡方案（Minimalist Program）在漢語方言句法研究中的應用。",
      aboutBody:
        "我目前的研究主要涉及數詞與量詞（numerals and classifiers）、趨向詞（directionals）、指示詞（demonstratives）以及右置（right-dislocation）。此外，我對語言學的其他領域也很感興趣，如音系學、漢語歷史音韻學、語言習得以及語言處理（language processing）。",

      secPubKicker: "02 · 論文",
      secPubTitle: "發表<strong>論文</strong>",
      secPubSub: "代表性論文與會議論文集（proceedings）論文。",
      tagProceedings: "Proceedings",
      tagJournal: "期刊",
      pub1authors: "臧云皓 &amp; Victor Junnan Pan",
      pub1venue:
        "載於 Arum Kang（編），<em>2026 Syntax and Its Interfaces in Generative Grammar</em>，第 324–333 頁。大田：The Korean Generative Grammar Circle。",
      pub1note: "第 28 屆首爾生成語法國際會議（SICOGG-28）論文集。",
      pub2authors: "臧云皓",
      pub2venue:
        "《Communications in Humanities Research》，第 34 卷，第 17–22 頁。",
      articleLabel: "文章 ↗",

      secTalksKicker: "03 · 報告",
      secTalksTitle: '口頭報告與<span class="grad">海報</span>',
      talk1authors: "臧云皓",
      talk1venue:
        "第四屆京滬港澳高校中文學科研究生論壇口頭報告，澳門大學（澳門），2026 年 10 月 23 日。",
      talk2authors: "臧云皓 &amp; Victor Junnan Pan",
      talk2venue:
        "第 28 屆首爾生成語法國際會議（SICOGG-28）口頭報告，韓國忠南大學（大田），2026 年 8 月 10–12 日。",
      talk3authors: "臧云皓",
      talk3venue:
        "香港中文大學第二屆跨學科授課式研究生人文藝術會議口頭報告，2026 年 4 月 30 日。",

      secEduKicker: "04 · 教育",
      secEduTitle: "教育經歷",
      edu1when: "2026 至今",
      edu1degree: "語言學博士",
      edu1where: "香港中文大學",
      edu1detail: "語言學及現代語言系 · 由潘俊楠教授指導。",
      edu2when: "2025 – 2026",
      edu2degree: "語言學碩士",
      edu2where: "香港中文大學",
      edu2detail: "學位論文：《普通話數詞與量詞的省略》。",
      edu3when: "2024 年 7 月",
      edu3degree: "語言與語言學暑期學校",
      edu3where: "萊頓大學",
      edu3detail: "語言學暑期學校課程。",
      edu4when: "2021 – 2025",
      edu4degree: "英語語言文學學士",
      edu4where: "浙江大學",
      edu4detail: "現代語言學、句法學、音系學、語用學、語義學與心理語言學等課程。",

      secContactKicker: "05 · 聯繫",
      secContactTitle: '與我<span class="grad">聯繫</span>',
      contactEmailLabel: "電郵",
      contactLabLabel: "我工作的實驗室",

      footerBrand:
        '臧云皓 <span class="footer-cn">Yunhao Zang</span>',
      footerTop: "返回頂部 ↑",
      footerPublications: "論文",
      footerContact: "聯繫",
      footerMeta: "臧云皓 · 香港中文大學語言學及現代語言系。"
    }
  };

  /* ---- helpers ---- */
  function $$(sel) {
    return Array.prototype.slice.call(document.querySelectorAll(sel));
  }

  function currentLang() {
    try {
      var q = new URLSearchParams(window.location.search).get("lang");
      if (q && I18N[q]) return q;
    } catch (e) {}
    try {
      var s = localStorage.getItem(STORAGE_KEY);
      if (s && I18N[s]) return s;
    } catch (e) {}
    return "en";
  }

  function apply(lang) {
    if (!I18N[lang]) lang = "en";
    var dict = I18N[lang];

    document.documentElement.setAttribute("lang", lang);
    document.title = dict.metaTitle;
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", dict.metaDesc);

    $$("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key] != null) el.textContent = dict[key];
    });

    $$("[data-i18n-html]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-html");
      if (dict[key] != null) el.innerHTML = dict[key];
    });

    $$("[data-i18n-aria]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-aria");
      if (dict[key] != null) el.setAttribute("aria-label", dict[key]);
    });

    $$("[data-i18n-alt]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-alt");
      if (dict[key] != null) el.setAttribute("alt", dict[key]);
    });

    // active lang pill
    $$("[data-set-lang]").forEach(function (a) {
      var active = a.getAttribute("data-set-lang") === lang;
      a.classList.toggle("active", active);
      if (active) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
  }

  function setLang(lang) {
    if (I18N[lang]) {
      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch (e) {}
      apply(lang);
    }
  }

  /* ---- wire up ---- */
  document.addEventListener("click", function (e) {
    var trigger = e.target.closest ? e.target.closest("[data-set-lang]") : null;
    if (!trigger) return;
    e.preventDefault();
    setLang(trigger.getAttribute("data-set-lang"));
  });

  apply(currentLang());
})();
