// 길드24 익명 통계 받는 곳 (Cloudflare Worker + D1). 게임이 보낸 한 판 요약을 표 한 줄로 쌓는다.
// 바인딩: DB (D1 데이터베이스), 비밀 값: EXPORT_KEY (내려받을 때만 쓰는 암호)
const MAX_BODY = 200000;
const CORS = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS' };
const text = (s, status = 200) => new Response(s, { status, headers: CORS });

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (req.method === 'OPTIONS') return text('');
    if (req.method === 'GET' && url.pathname === '/export') {
      if (!env.EXPORT_KEY || url.searchParams.get('key') !== env.EXPORT_KEY) return text('no', 403);
      const since = Number(url.searchParams.get('since') || 0);
      const { results } = await env.DB.prepare('SELECT body FROM runs WHERE id > ? ORDER BY id').bind(since).all();
      return text(results.map(r => r.body).join('\n'));
    }
    if (req.method !== 'POST') return text('ok');
    const raw = await req.text();
    if (!raw || raw.length > MAX_BODY) return text('too-big', 413);
    let p;
    try { p = JSON.parse(raw); } catch (e) { return text('bad', 400); }
    if (p.schema !== 1 || !p.rid || !p.run) return text('bad', 400);
    await env.DB.prepare('CREATE TABLE IF NOT EXISTS runs (id INTEGER PRIMARY KEY AUTOINCREMENT, rid TEXT UNIQUE, at TEXT, build TEXT, kind TEXT, day INTEGER, body TEXT)').run();
    const r = await env.DB.prepare('INSERT OR IGNORE INTO runs (rid, at, build, kind, day, body) VALUES (?, ?, ?, ?, ?, ?)')
      .bind(String(p.rid), new Date().toISOString(), String(p.build || ''), String(p.kind || ''), Number(p.run.day) || 0, raw).run();
    return text(r.meta.changes ? 'ok' : 'dup');
  },
};
