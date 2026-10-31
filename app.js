// Renders versions and release notes from releases.json; the download button links straight to the
// GitHub Release asset of the latest version.
const $ = (id) => document.getElementById(id);
const button = $("dl-button");
let latest = null;

// the hero reel settles into a timeline once
const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
setTimeout(() => $("reel").classList.add("sorted"), still ? 0 : 600);

const mb = (bytes) => `${Math.round(bytes / 1e6)} MB`;
const el = (tag, cls, text) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text !== undefined) e.textContent = text; // text only, never HTML
  return e;
};

fetch("releases.json", { cache: "no-cache" })
  .then((r) => r.json())
  .then(render)
  .catch(() => {
    $("dl-version").textContent = "暫時讀不到版本資訊";
    $("release-list").textContent = "暫時讀不到更新紀錄，請稍後再試。";
  });

function render(releases) {
  latest = releases.find((r) => r.url) || null;
  if (latest) {
    $("dl-version").textContent = `TripVlog ${latest.version}`;
    $("dl-meta").textContent = `${latest.date} 發布，${mb(latest.size)} 的 zip（裡面是 DMG）`;
    $("hero-version").textContent = `最新版 ${latest.version}，Apple Silicon、macOS 14 以上`;
    $("dl-sha-value").textContent = latest.sha256;
    $("dl-sha").hidden = !latest.sha256;
    button.href = latest.url;
    button.removeAttribute("aria-disabled");
  } else {
    $("dl-version").textContent = "下載準備中";
    $("dl-meta").textContent = "第一個公開版本很快就會放上來。";
  }

  const list = $("release-list");
  list.textContent = "";
  const older = el("details", "older");
  older.append(el("summary", "", "較早的版本"));
  releases.forEach((r, i) => {
    const art = el("article", "release");
    const head = el("header");
    head.append(el("span", "v", r.version), el("span", "name", r.title), el("span", "date", r.date));
    if (r === latest) head.append(el("span", "latest", "最新"));
    const ul = el("ul");
    for (const n of r.notes) ul.append(el("li", "", n));
    art.append(head, ul);
    (i < 2 ? list : older).append(art);
  });
  if (releases.length > 2) list.append(older);
}

button.addEventListener("click", () => {
  if (latest) $("dl-status").textContent = `開始下載（${mb(latest.size)}，依網路速度需要幾分鐘）。`;
});
