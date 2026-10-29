# 기술 스택 검토

검토일: 2026-10-29

GitHub REST API의 저장소별 languages 응답을 확인해 주요 언어를 먼저 표시하고, 실제 구현을 설명하는 프레임워크와 도구를 뒤에 배치했다. 언어 바이트 비중은 개발 시간이나 개인 기여 비중을 뜻하지 않는다. 문서 사이트의 MDX, UI의 Svelte와 SCSS도 통계에 포함된다.

- Notiiv, 디자인 시스템, 홈페이지, Marker, Echo, Kivra, Apple Music Discord Presence는 TypeScript가 가장 큰 비중이었다.
- Boundra는 Rust, document-workspace는 Go, 인트라넷은 Dart가 가장 큰 비중이었다.
- Chorus는 Svelte와 TypeScript가 중심이었다.
- rust-with-typescript는 JavaScript, SCSS, Rust, MDX, TypeScript 순이었다. 학습 주제인 Rust만으로 스택을 표현하지 않았다.
- OWKR은 Match의 TypeScript, Exam의 Svelte·TypeScript, Gather Bot의 Python, Docs의 CSS·Astro·TypeScript를 함께 검토했다. 저장소 크기를 합산해 프로젝트 전체 비중으로 표현하지 않았다.
- 점주로는 이번 검토에서 저장소 언어 통계를 확인하지 못했다. 기존 구현 설명에 근거해 TypeScript, Next.js, React와 에디터·공통 UI 도구를 정리했다.

출처는 각 프로젝트에 연결된 GitHub 저장소와 Notiiv, 인트라넷, document-workspace의 인증된 저장소 languages API다. 비공개 저장소의 소스나 내부 주소는 새로 공개하지 않았다.
