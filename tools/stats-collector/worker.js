// 길드24 익명 통계 받는 곳 (Cloudflare Worker + D1). 게임이 보낸 한 판 요약을 표 한 줄로 쌓는다.
// 바인딩: DB (D1 데이터베이스), 비밀 값: EXPORT_KEY (내려받을 때만 쓰는 암호)
const MAX_BODY = 200000;
const CORS = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS' };
const text = (s, status = 200) => new Response(s, { status, headers: CORS });

const TABLE = 'CREATE TABLE IF NOT EXISTS runs (id INTEGER PRIMARY KEY AUTOINCREMENT, rid TEXT UNIQUE, at TEXT, build TEXT, kind TEXT, day INTEGER, body TEXT)';

/* 중간 기록(schema 2): 3일마다 보내는 작은 조각. 같은 판(rid)의 첫 날(fd)이 같으면 중복으로 버린다. 판 끝 요약(runs)과 따로 둔다. */
const PARTS = 'CREATE TABLE IF NOT EXISTS parts (id INTEGER PRIMARY KEY AUTOINCREMENT, rid TEXT, fd INTEGER, at TEXT, body TEXT, UNIQUE(rid, fd))';

export default {
  async fetch(req, env) {
    try { return await handle(req, env); } catch (e) { return text('error: ' + (e && e.message), 500); }
  },
};

async function handle(req, env) {
  const url = new URL(req.url);
  if (req.method === 'OPTIONS') return text('');
  if (req.method === 'GET' && url.pathname === '/export') {
    if (!env.EXPORT_KEY || url.searchParams.get('key') !== env.EXPORT_KEY) return text('no', 403);
    await env.DB.prepare(TABLE).run();
    await env.DB.prepare(PARTS).run();
    const since = Number(url.searchParams.get('since') || 0), kind = url.searchParams.get('kind');
    /* kind=parts: 중간 기록만, kind=runs: 판 끝 요약만, 없으면 둘 다(runs 먼저) */
    const rows = [];
    if (kind !== 'parts') rows.push(...(await env.DB.prepare('SELECT body FROM runs WHERE id > ? ORDER BY id').bind(since).all()).results);
    if (kind !== 'runs') rows.push(...(await env.DB.prepare('SELECT body FROM parts WHERE id > ? ORDER BY id').bind(since).all()).results);
    return text(rows.map(r => r.body).join('\n'));
  }
  if (req.method !== 'POST') return text('ok');
  const raw = await req.text();
  if (!raw || raw.length > MAX_BODY) return text('too-big', 413);
  let p;
  try { p = JSON.parse(raw); } catch (e) { return text('bad', 400); }
  if (p.schema === 2 && p.kind === 'part' && p.rid && Array.isArray(p.days) && p.days.length) {
    await env.DB.prepare(PARTS).run();
    const r = await env.DB.prepare('INSERT OR IGNORE INTO parts (rid, fd, at, body) VALUES (?, ?, ?, ?)')
      .bind(String(p.rid), Number(p.days[0].d) || 0, new Date().toISOString(), raw).run();
    return text(r.meta.changes ? 'ok' : 'dup');
  }
  if (p.schema !== 1 || !p.rid || !p.run) return text('bad', 400);
  await env.DB.prepare(TABLE).run();
  const r = await env.DB.prepare('INSERT OR IGNORE INTO runs (rid, at, build, kind, day, body) VALUES (?, ?, ?, ?, ?, ?)')
    .bind(String(p.rid), new Date().toISOString(), String(p.build || ''), String(p.kind || ''), Number(p.run.day) || 0, raw).run();
  return text(r.meta.changes ? 'ok' : 'dup');
}
