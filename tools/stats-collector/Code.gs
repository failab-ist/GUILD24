// 길드24 익명 통계 받는 곳 (Google Apps Script). 게임이 보낸 한 판 요약을 구글 시트 한 줄로 쌓는다.
// 시트 열: A 받은 시각 · B rid · C 버전 · D 종류(end/abandon) · E 날짜(D몇) · F~J 본문 JSON(4만 자씩 나눠 담음)
const MAX_BODY = 200000, CHUNK = 40000, SLOTS = 5;
function doPost(e) {
  try {
    const raw = (e && e.postData && e.postData.contents) || '';
    if (!raw || raw.length > MAX_BODY) return out('too-big');
    const p = JSON.parse(raw);
    if (p.schema !== 1 || !p.rid || !p.run) return out('bad');
    const sh = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    const lock = LockService.getScriptLock(); lock.waitLock(20000);
    try {
      const last = sh.getLastRow();
      if (last > 0 && sh.getRange(1, 2, last, 1).createTextFinder(String(p.rid)).matchEntireCell(true).findNext()) return out('dup');
      const row = [new Date(), p.rid, p.build, p.kind, p.run.day];
      for (let i = 0; i < SLOTS; i++) row.push(raw.slice(i * CHUNK, (i + 1) * CHUNK));
      sh.appendRow(row);
    } finally { lock.releaseLock(); }
    return out('ok');
  } catch (err) { return out('error'); }
}
function out(s) { return ContentService.createTextOutput(s); }
