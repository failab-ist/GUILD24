# 재현

이 측정은 기존 경험치 5일 후보에서 미방문 조건 한 곳만 2일로 바꾼 사본이다. xp5-to-xp2.patch는 그 사본 간 차이이며 Production 적용 파일이 아니다.

1. 이전 보고 폴더 revisit-xp-20261005의 prepare.cjs · profile.cjs · save-estimate.cjs와 이 폴더의 .cjs 파일을 새 출력 폴더에 복사한다.
2. 이전 보고의 기준 commit 177d1ab297157c96a80da9049674a9f5feeb23a5에서 dist/data · dist/systems · tools/measure-v2100.cjs를 추출해 template/에 둔다.
3. node prepare.cjs → node prepare-xp2.cjs를 실행해 후보를 만든다. REVISIT_SAVE에 세이브 절대 경로를 지정할 수 있다.
4. 실행 컨펌 후 node run-xp2.cjs로 표준 15,000판과 세이브 조건 2,000판을 측정한다. node save-estimate-xp2.cjs는 방문·결과 고정 경험치 추정이다.
5. 기준·5일 원시 JSON은 이전 raw-output-manifest.json이 가리키는 보관 파일을 SHA-256 확인 후 재사용한다. 새 결과와 함께 node analyse-xp2.cjs를 실행하면 summary-xp2.json을 만든다. 이전 provenance.json도 기준·5일 후보 파일 확인에 사용한다.
6. verify-results-xp2.cjs는 후보 해시, 조건별 행 수, 중복 seed, 비교 seed 집합, 이전 원시 파일 해시를 검사한다. 이전 manifest 경로는 이 저장소의 절대 경로이므로 다른 위치에서는 해당 경로를 조정한다.

재실행은 AGENTS.md §9-A의 실행 컨펌 대상이다. 기준·5일을 새로 측정해야 하는 경우 이전 보고의 절차를 따로 적용한다. 원본 세이브와 Production Source는 수정하지 않는다.
