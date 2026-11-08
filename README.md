# YAHWA UI prototype

야화 시안 1 최신 공유용 코드 — 2026-11-08, v119.

## 실행

Python 3 설치 후 저장소 폴더에서:

```sh
python3 -m http.server 8080 --directory public
```

브라우저에서 http://localhost:8080/#discovery 를 엽니다.

## 구성

- public/index.html: 화면 및 기본 흐름
- public/features.js / features-rules.js: 확장 기능 및 규칙
- public/features.css / nov08.css: 스타일
- public 내 이미지·폰트: 시연 자산

UI 시연용 프로젝트입니다. 실제 가입, 결제, 인증, 메시지 전송 서버가 포함된 운영 앱이 아닙니다. 시연 상태는 브라우저에 저장될 수 있습니다.

기존 배포: https://yahwa-first-frame-review.bluehour011.chatgpt.site/final-review/design-1/?v=119#discovery

공개 저장소 제공이 포함된 사진·폰트·브랜드 자산의 자유 재사용 허가를 의미하지 않습니다.
