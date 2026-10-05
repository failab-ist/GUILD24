# 재현

원시 대용량 JSON은 raw-output-manifest.json의 artifactRoot에 보관한다. 저장된 해시로 파일 무결성을 확인할 수 있다.

1. 이 폴더의 .cjs 파일을 새 측정 출력 폴더에 복사한다.
2. 기준 commit 177d1ab297157c96a80da9049674a9f5feeb23a5를 별도 worktree로 꺼내고, dist/data · dist/systems · tools/measure-v2100.cjs를 git archive로 추출해 출력 폴더의 template/에 둔다.
3. REVISIT_SAVE 환경 변수에 대상 세이브 절대 경로를 지정한다. 지정하지 않으면 기존 Downloads/guild24-save-day-30_1005.json을 읽는다.
4. node prepare.cjs → node verify.cjs → node run-all.cjs → node profile.cjs → node save-estimate.cjs → node analyse.cjs → node report.cjs 순서로 실행한다.

재실행은 측정이므로 AGENTS.md §9-A의 실행 컨펌을 따른다. 원본 세이브와 Production Source를 수정하지 않는다. 후보 .patch는 검토용이며 Production에 적용한 패치가 아니다.
