// ─── Scout Final Leaderboard ───
// Loads leaderboard.json. Expected shape:
// {
//   "meta": { "scouts": 1042, "contributions": 1900000, "rewards": "—", "days": 480,
//             "generatedAt": "2026-06-20", "frozen": true },
//   "rows": [ { "rank": 1, "scout": "name or null", "address": "0x… / sent1…",
//               "contributions": 12345, "score": 98765, "reward": "1,234 DVPN" }, ... ]
// }

const fmt = (n) =>
  typeof n === 'number' ? n.toLocaleString('en-US') : (n ?? '—');

const short = (addr) =>
  !addr ? '' : addr.length > 16 ? `${addr.slice(0, 8)}…${addr.slice(-6)}` : addr;

function renderStats(meta = {}) {
  const map = {
    scouts: meta.scouts,
    contributions: meta.contributions,
    rewards: meta.rewards,
    days: meta.days,
  };
  document.querySelectorAll('[data-stat]').forEach((el) => {
    const v = map[el.dataset.stat];
    el.textContent = v == null ? '—' : fmt(v);
  });
}

function rowHtml(r) {
  const rankClass = r.rank <= 3 ? `rank-${r.rank}` : '';
  const name = r.scout
    ? `<span>${escapeHtml(r.scout)}</span>`
    : `<span class="scout-addr">${escapeHtml(short(r.address))}</span>`;
  const sub = r.scout && r.address
    ? `<div class="scout-addr">${escapeHtml(short(r.address))}</div>`
    : '';
  return `<tr class="${rankClass}" data-search="${escapeHtml(
    `${r.scout ?? ''} ${r.address ?? ''}`.toLowerCase()
  )}">
    <td class="col-rank">${r.rank}</td>
    <td class="col-scout">${name}${sub}</td>
    <td class="col-num">${fmt(r.contributions)}</td>
    <td class="col-num">${fmt(r.score)}</td>
    <td class="col-num reward">${escapeHtml(r.reward ?? '—')}</td>
  </tr>`;
}

function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

function renderRows(rows) {
  const body = document.getElementById('lb-body');
  if (!rows || !rows.length) {
    body.innerHTML = `<tr class="lb-empty"><td colspan="5">No entries yet — the final dataset is being prepared.</td></tr>`;
    return;
  }
  body.innerHTML = rows.map(rowHtml).join('');
}

function wireSearch() {
  const input = document.getElementById('search');
  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    document.querySelectorAll('#lb-body tr').forEach((tr) => {
      if (tr.classList.contains('lb-empty')) return;
      const hay = tr.getAttribute('data-search') || '';
      tr.style.display = !q || hay.includes(q) ? '' : 'none';
    });
  });
}

async function load() {
  wireSearch();
  try {
    const res = await fetch('./leaderboard.json', { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    renderStats(data.meta);
    renderRows(data.rows);
  } catch (err) {
    // Dataset not finalized yet — keep the page usable and honest.
    console.warn('leaderboard.json not loaded:', err.message);
    renderStats({});
    document.getElementById('lb-body').innerHTML =
      `<tr class="lb-empty"><td colspan="5">
        The final leaderboard dataset is being finalized from the archived Scout telemetry.
        Check back soon — every contribution is being accounted for.
      </td></tr>`;
  }
}

load();
