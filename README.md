# 📦 Snippet-Vault
개발자가 자주 사용하는 **코드 스니펫을 저장, 검색, 관리, 재사용할 수 있도록 설계된 웹 기반 코드 자산 관리 시스템**

---

# 📌 프로젝트 개요

개발자는 개발 과정에서 동일하거나 유사한 코드 패턴을 반복적으로 작성하는 경우가 많다.  
하지만 이러한 코드를 체계적으로 관리하지 않으면 **개발 생산성이 저하되고 코드 재사용성이 떨어질 수 있다.**

이를 해결하기 위해 **Snippet-Vault 시스템**을 설계하였다.

Snippet-Vault는 개발자가 자주 사용하는 코드 스니펫을 저장하고  
검색 및 필터링을 통해 빠르게 찾을 수 있도록 지원하는 **웹 기반 코드 자산 관리 플랫폼**이다.

---

# 🧰 Tech Stack

### Frontend

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

### Backend

![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)

### Database

![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)

### Tools

![VSCode](https://img.shields.io/badge/VSCode-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

---

# 🎯 1. 실험 목적 및 범위

## 1.1 실험 목적

본 프로젝트의 목적은 개발자가 자주 사용하는 코드 조각(snippet)을 효율적으로 저장하고 검색하며 재사용할 수 있는 **웹 기반 코드 자산 관리 시스템**을 구현하는 것이다.

본 시스템은 다음 기능을 제공한다.

- 코드 스니펫 저장 및 관리
- 코드 검색 기능
- 언어 기반 필터링
- 태그 기반 분류
- 코드 복사 기능
- 코드 하이라이팅

이를 통해 개발자가 필요한 코드를 빠르게 찾고 재사용할 수 있도록 하여 **개발 생산성을 향상**시키는 것을 목표로 한다.

---

## 1.2 실험 범위

### 포함 기능

- 스니펫 CRUD 기능
- 코드 검색 기능
- 태그 관리 기능
- 언어 관리 기능
- 코드 하이라이팅
- 코드 복사 기능

### 제외 기능

- 사용자 로그인
- 권한 관리
- 협업 기능
- 클라우드 배포

---

# 🔍 2. 분석

## 2.1 기능 목록

| 기능 | 설명 |
|-----|------|
| 스니펫 생성 | 새로운 코드 스니펫 저장 |
| 스니펫 조회 | 저장된 스니펫 목록 조회 |
| 스니펫 수정 | 기존 스니펫 수정 |
| 스니펫 삭제 | 스니펫 삭제 |
| 검색 기능 | 제목, 설명, 코드, 태그 기반 검색 |
| 언어 관리 | 언어 추가 및 삭제 |
| 태그 관리 | 태그 생성 및 삭제 |
| 코드 복사 | 코드 클립보드 복사 |

---

# 📑 2.2 유스케이스 명세서

![snippet-vault 유스케이스](https://github.com/user-attachments/assets/fefd0cca-e296-404d-8467-ca736d1b05e8)

---

## UC-01 스니펫 생성

| 항목 | 내용 |
|----|----|
| 유스케이스 이름 | 스니펫 생성 |
| 행위자 | 사용자 |
| 설명 | 새로운 코드 스니펫 저장 |
| 기본 흐름 | 1. 스니펫 생성 화면 접근 → 2. 제목 입력 → 3. 코드 입력 → 4. 언어 선택 → 5. 태그 선택 → 6. 저장 |
| 결과 | 데이터베이스에 스니펫 저장 |

---

## UC-02 스니펫 조회

| 항목 | 내용 |
|----|----|
| 유스케이스 이름 | 스니펫 조회 |
| 행위자 | 사용자 |
| 설명 | 저장된 스니펫 목록 조회 |
| 결과 | 스니펫 목록 확인 |

---

## UC-03 스니펫 수정

| 항목 | 내용 |
|----|----|
| 유스케이스 이름 | 스니펫 수정 |
| 설명 | 기존 스니펫 정보 수정 |
| 결과 | 데이터베이스 정보 업데이트 |

---

## UC-04 스니펫 삭제

| 항목 | 내용 |
|----|----|
| 유스케이스 이름 | 스니펫 삭제 |
| 설명 | 스니펫 삭제 |
| 결과 | 데이터베이스에서 제거 |

---

# 🏗 3. 설계

## 3.1 시스템 아키텍처

<img width="380" height="971" src="https://github.com/user-attachments/assets/4a815ee9-55fb-4c51-b829-146155b0673d" />

### 구조 설명
- React는 사용자 인터페이스를 담당한다.  
- Express 서버는 REST API를 제공한다.  
- SQLite는 데이터 저장을 담당한다.

---

## 3.2 ERD 다이어그램

![snippet-vault erd](https://github.com/user-attachments/assets/d0f6ab54-8152-48b3-826f-b216fbbf4266)

### 관계 설명

- Snippet → Language (1:N)
- Snippet ↔ Tag (N:M)
- SnippetTag 테이블을 통해 다대다 관계 관리

---

## 3.3 순서 다이어그램

### 스니펫 생성 과정

<img width="2100" height="1238" alt="mermaid-diagram" src="https://github.com/user-attachments/assets/9d0cfe7b-1ef2-46fa-8858-1ead2a8f258d" />

### 스니펫 검색 과정

<img width="2160" height="1238" alt="mermaid-diagram (1)" src="https://github.com/user-attachments/assets/466495ff-a2cf-49bc-9d4c-c9084039e48f" />

---

# 💻 4. 구현

## 4.1 API 설계

### Snippets API

| Method | URL | 설명 |
|------|------|------|
| GET | `/snippets` | 목록 조회 |
| GET | `/snippets/:id` | 상세 조회 |
| POST | `/snippets` | 스니펫 생성 |
| PUT | `/snippets/:id` | 수정 |
| DELETE | `/snippets/:id` | 삭제 |

---

### Languages API

| Method | URL | 설명 |
|------|------|------|
| GET | `/languages` | 언어 목록 조회 |
| POST | `/languages` | 언어 추가 |
| DELETE | `/languages/:id` | 언어 삭제 |

---

### Tags API

| Method | URL | 설명 |
|------|------|------|
| GET | `/tags` | 태그 목록 조회 |
| POST | `/tags` | 태그 생성 |
| DELETE | `/tags/:id` | 태그 삭제 |

---

# 🖥 주요 화면

## 홈 화면
홈 화면에서는 저장된 스니펫 목록을 확인할 수 있으며 검색 기능과 언어 필터를 통해 원하는 스니펫을 빠르게 찾을 수 있다.

![홈 화면](https://github.com/user-attachments/assets/0000ce2f-0c69-4a3b-8014-ab987421e391)

---

## 스니펫 생성 화면
사용자는 제목, 코드, 설명을 입력하여 새로운 스니펫을 생성할 수 있으며 언어 선택과 태그 추가 기능을 이용해 스니펫을 체계적으로 관리할 수 있다.

![생성 화면1](https://github.com/user-attachments/assets/8654623c-2475-4eb2-88c2-87cd0870d31e)

![생성 화면2](https://github.com/user-attachments/assets/1328ecd3-d59a-413e-af0c-ee29e9cefcf0)

---

## 스니펫 상세 화면
스니펫 상세 화면에서는 코드 하이라이팅이 적용된 코드 내용을 확인할 수 있으며 코드 복사 기능과 수정 및 삭제 기능을 사용할 수 있다.

![상세 화면](https://github.com/user-attachments/assets/1ed7866e-e768-4fba-9d9b-508c6da5cc73)

---

### 스니펫 수정 화면

스니펫 수정 화면에서는 기존에 저장된 스니펫 정보를 불러와 수정할 수 있다.  
사용자는 제목, 코드, 설명을 수정할 수 있으며 언어 변경 및 태그 수정도 가능하다.

수정 화면에서는 기존 데이터가 자동으로 입력되어 있어 사용자가 필요한 부분만 변경할 수 있도록 설계하였다.

![수정 화면1](https://github.com/user-attachments/assets/cd5afefd-e7f2-4b69-9acd-4d2e16fbb728)

![수정 화면2](https://github.com/user-attachments/assets/1df4e043-3770-4d0b-90f1-c170734edcf8)

---

# 🧪 5. 실험

## 테스트 데이터

테스트에 사용된 예시 데이터

- React useEffect example
- Express REST API Example
- Python 리스트 컴프리헨션

사용된 태그

- React
- API
- JavaScript
- Python
- Algorithm

---

## API 테스트

Postman을 이용하여 REST API 정상 동작 확인

![snippet 생성](https://github.com/user-attachments/assets/0ad4bab4-1248-4f3f-a830-8fbed88f7d9f)

![단일 조회](https://github.com/user-attachments/assets/b2c6e788-c77e-40e6-8801-c7de1447a50e)

![삭제](https://github.com/user-attachments/assets/57c74bc6-b586-4422-a980-c65aecfe9c1e)

---

# ⚙ 구현 중 해결한 문제

## API 상태 코드 오류

### 원인
HTTP status code 대신 문자열이 전달됨

### 해결
statusCode와 message를 분리하도록 수정

---

## React Router 경로 충돌
### 원인

/snippets/create 경로가 /snippets/:id 라우트와 충돌하여 create 페이지가 id로 인식되는 문제가 발생하였다.

### 해결 

라우트 정의 순서를 수정하여 create 경로가 먼저 인식되도록 변경하였다.

---

# 🏁 결론

Snippet-Vault는 개발자가 자주 사용하는 코드 조각을 저장하고 관리할 수 있도록 설계된 **웹 기반 코드 관리 시스템**이다.

본 시스템은

- 코드 저장
- 코드 검색
- 태그 분류
- 언어 필터링
- 코드 하이라이팅
- 클립보드 복사

기능을 제공하며 이를 통해 개발자가 필요한 코드를 **빠르게 검색하고 재사용할 수 있도록 지원한다.**

---

# 🚀 향후 발전 방향

- 사용자 로그인 시스템
- 클라우드 배포
- 코드 공유 기능
- 협업 기능

