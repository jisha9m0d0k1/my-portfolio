// ADD 2026/02/01 
document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;
  // スラッシュで分割して、空でない要素の数から階層を判定
  const parts = path.split('/').filter(p => p && p !== 'my-portfolio');
  const depth = parts.length - 1; // ファイル名自体を除いた階層数
  const prefix = depth > 0 ? "../".repeat(depth) : "./";

  console.log("現在のパス:", path);  // デバッグ用に一時的に復活
  console.log("depth:", depth);
  console.log("prefix:", prefix);

  // ヘッダー読み込み
  fetch(prefix + "header.html")
    .then(res => res.text())
    .then(data => {
      const header = document.getElementById("header");
      header.innerHTML = data;

      const btn = document.getElementById("menu-btn");
      const menu = document.getElementById("menu");

      btn.addEventListener("click", () => {
        menu.classList.toggle("open");
      });
    })
    .catch(err => console.error("fetch失敗", err));

  // 最新diary読み込み（index.htmlのみ）
  const latestDiary = document.getElementById("latest-diary");
  if (latestDiary) {
    fetch(prefix + "diary.html")
      .then(res => res.text())
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const items = doc.querySelectorAll('.diary-item');

        const latest = Array.from(items).slice(0, 3);
        latestDiary.innerHTML = latest.map(item => `<p>${item.textContent}</p>`).join('');
      })
      .catch(err => console.error("diary読み込み失敗", err));
  }

  // ヘッダー読み込みの後に追加
  fetch(prefix + "footer.html")
    .then(res => res.text())
    .then(data => {
      const footer = document.getElementById("footer");
      if (footer) {
        footer.innerHTML = data;
      }
    })
    .catch(err => console.error("footer fetch失敗", err));
    
});