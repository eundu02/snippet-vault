# Snippet-Vault 최종 보고서

## 1. 실험 목적 및 범위

### 1.1 실험 목적

본 프로젝트의 목적은 개발자가 자주 사용하는 코드 조각(snippet)을 효율적으로 저장하고 검색하며 재사용할 수 있는 **웹 기반 코드 자산 관리 시스템**을 구현하는 것이다.

일반적으로 개발자는 동일하거나 유사한 코드 패턴을 반복적으로 작성하게 되는데, 이러한 코드를 체계적으로 관리하지 않으면 개발 생산성이 저하될 수 있다. 이러한 문제를 해결하기 위해 Snippet-Vault 시스템을 설계하였다.

본 시스템은 다음과 같은 기능을 제공한다.

- 코드 스니펫 저장 및 관리
- 코드 검색 기능
- 언어 기반 필터링
- 태그 기반 분류
- 코드 복사 기능
- 코드 하이라이팅

이를 통해 개발자가 필요한 코드를 빠르게 찾고 재사용할 수 있도록 하여 개발 생산성을 향상시키는 것을 목표로 한다.

---

### 1.2 실험 범위

본 프로젝트에서 구현한 범위는 다음과 같다.

#### 포함 기능

- 스니펫 CRUD 기능  
- 코드 검색 기능  
- 태그 관리 기능  
- 언어 관리 기능  
- 코드 하이라이팅 기능  
- 코드 복사 기능  

#### 제외 기능

- 사용자 로그인 시스템  
- 권한 관리 기능  
- 협업 기능  
- 클라우드 배포  

---

# 2. 분석

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

# 2.2 유스케이스 명세서

![snippet-vault 유스케이스](https://github.com/user-attachments/assets/fefd0cca-e296-404d-8467-ca736d1b05e8)

## UC-01 스니펫 생성

| 항목 | 내용 |
|----|----|
| 유스케이스 이름 | 스니펫 생성 |
| 행위자 | 사용자 |
| 설명 | 새로운 코드 스니펫을 저장 |
| 사전 조건 | 시스템이 정상적으로 실행 중 |
| 기본 흐름 | 1. 사용자가 스니펫 생성 화면에 접근<br>2. 제목 입력<br>3. 코드 입력<br>4. 언어 선택<br>5. 태그 선택<br>6. 저장 |
| 결과 | 데이터베이스에 스니펫 저장 |

---

## UC-02 스니펫 조회

| 항목 | 내용 |
|----|----|
| 유스케이스 이름 | 스니펫 조회 |
| 행위자 | 사용자 |
| 설명 | 저장된 스니펫 목록 조회 |
| 기본 흐름 | 1. 사용자가 홈 화면에 접속<br>2. 시스템이 스니펫 목록 표시 |
| 결과 | 사용자가 스니펫 목록 확인 |

---

## UC-03 스니펫 수정

| 항목 | 내용 |
|----|----|
| 유스케이스 이름 | 스니펫 수정 |
| 행위자 | 사용자 |
| 설명 | 기존 스니펫 정보 수정 |
| 기본 흐름 | 1. 상세 화면 진입<br>2. 수정 버튼 클릭<br>3. 데이터 수정<br>4. 저장 |
| 결과 | 데이터베이스 정보 업데이트 |

---

## UC-04 스니펫 삭제

| 항목 | 내용 |
|----|----|
| 유스케이스 이름 | 스니펫 삭제 |
| 행위자 | 사용자 |
| 설명 | 스니펫 삭제 |
| 기본 흐름 | 삭제 버튼 클릭 |
| 결과 | 데이터베이스에서 삭제 |

---

## UC-05 검색 기능

| 항목 | 내용 |
|----|----|
| 유스케이스 이름 | 스니펫 검색 |
| 행위자 | 사용자 |
| 설명 | 키워드를 이용하여 스니펫 검색 |
| 검색 대상 | title, description, code, tags |

---

# 3. 설계

## 3.1 시스템 아키텍처

<img width="380" height="971" alt="mermaid-diagram (3)" src="https://github.com/user-attachments/assets/4a815ee9-55fb-4c51-b829-146155b0673d" />

설명

- React는 사용자 인터페이스를 담당한다.  
- Express 서버는 REST API를 제공한다.  
- SQLite는 데이터 저장을 담당한다.

---

## 3.2 ERD 다이어그램

![snippet-vault erd](https://github.com/user-attachments/assets/d0f6ab54-8152-48b3-826f-b216fbbf4266)

설명

- Snippet은 하나의 Language를 가진다.  
- Snippet은 여러 Tag와 연결될 수 있다.  
- SnippetTag는 Snippet과 Tag 간의 다대다 관계를 관리하기 위한 중간 테이블이다.

---

## 3.3 순서 다이어그램

### 스니펫 생성 과정

<img width="2100" height="1238" alt="mermaid-diagram" src="https://github.com/user-attachments/assets/9d0cfe7b-1ef2-46fa-8858-1ead2a8f258d" />

### 스니펫 검색 과정

<img width="2160" height="1238" alt="mermaid-diagram (1)" src="https://github.com/user-attachments/assets/466495ff-a2cf-49bc-9d4c-c9084039e48f" />

---

# 4. 구현

## 4.1 개발 환경

| 항목 | 내용 |
|-----|------|
| Frontend | React |
| Backend | Node.js |
| Framework | Express |
| Database | SQLite |
| 개발도구 | VS Code |
| API 테스트 | Postman |
| 버전관리 | Git / GitHub |

---

## 4.2 API 설계

### Snippets API

| Method | URL | 설명 |
|------|------|------|
| GET | /snippets | 스니펫 목록 조회 |
| GET | /snippets/:id | 스니펫 상세 조회 |
| POST | /snippets | 스니펫 생성 |
| PUT | /snippets/:id | 스니펫 수정 |
| DELETE | /snippets/:id | 스니펫 삭제 |

---

### Languages API

| Method | URL | 설명 |
|------|------|------|
| GET | /languages | 언어 목록 조회 |
| POST | /languages | 언어 추가 |
| DELETE | /languages/:id | 언어 삭제 |

---

### Tags API

| Method | URL | 설명 |
|------|------|------|
| GET | /tags | 태그 목록 조회 |
| POST | /tags | 태그 생성 |
| DELETE | /tags/:id | 태그 삭제 |

---

### Snippet Tags API

| Method | URL | 설명 |
|------|------|------|
| GET | /snippets/:id/tags | 특정 스니펫의 태그 조회 |
| POST | /snippets/:id/tags | 스니펫에 태그 추가 |
| DELETE | /snippets/:id/tags/:tagId | 스니펫에서 태그 삭제 |

---

## 4.3 주요 화면 구현

### 홈 화면 (스니펫 목록)

홈 화면에서는 저장된 스니펫 목록을 확인할 수 있으며 검색 기능과 언어 필터를 통해 원하는 스니펫을 빠르게 찾을 수 있다.

![홈 화면](https://github.com/user-attachments/assets/0000ce2f-0c69-4a3b-8014-ab987421e391)

---

### 스니펫 생성 화면

사용자는 제목, 코드, 설명을 입력하여 새로운 스니펫을 생성할 수 있으며 언어 선택과 태그 추가 기능을 이용해 스니펫을 체계적으로 관리할 수 있다.

![생성 화면1](https://github.com/user-attachments/assets/8654623c-2475-4eb2-88c2-87cd0870d31e)

![생성 화면2](https://github.com/user-attachments/assets/1328ecd3-d59a-413e-af0c-ee29e9cefcf0)

---

### 스니펫 상세 화면

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

# 5. 실험

## 5.1 테스트 데이터

시스템 테스트를 위해 다음과 같은 예시 데이터를 사용하였다.

- React useEffect example  
- Express REST API Example  
- Python 리스트 컴프리헨션  

각 스니펫에는 다음과 같은 태그가 포함된다.

- React  
- API  
- JavaScript  
- Python  
- Algorithm  

---

## 5.2 API 테스트 (Postman)

Postman을 이용하여 REST API가 정상적으로 동작하는지 테스트하였다.

![snippet 생성](https://github.com/user-attachments/assets/0ad4bab4-1248-4f3f-a830-8fbed88f7d9f)

![단일 조회](https://github.com/user-attachments/assets/b2c6e788-c77e-40e6-8801-c7de1447a50e)

![삭제](https://github.com/user-attachments/assets/57c74bc6-b586-4422-a980-c65aecfe9c1e)

---

## 5.3 테스트 결과

| 기능 | 결과 |
|-----|------|
| 스니펫 생성 | 정상 |
| 스니펫 수정 | 정상 |
| 스니펫 삭제 | 정상 |
| 태그 생성 | 정상 |
| 태그 삭제 | 정상 |
| 언어 추가 | 정상 |
| 언어 삭제 | 사용 중일 경우 삭제 불가 |
| 검색 기능 | 정상 |
| 코드 복사 | 정상 |
| 코드 하이라이팅 | 정상 |

---

# 6. 구현 중 해결한 문제

## 6.1 API 상태 코드 오류

### 원인

response util 함수에서 HTTP 상태 코드 대신 문자열이 전달되어 오류가 발생하였다.

### 해결 방법

statusCode와 message를 분리하여 전달하도록 수정하였다.

---

## 6.2 React Router 경로 충돌

### 원인

/snippets/create 경로가 /snippets/:id 라우트와 충돌하여 create 페이지가 id로 인식되는 문제가 발생하였다.

### 해결 방법

라우트 정의 순서를 수정하여 create 경로가 먼저 인식되도록 변경하였다.

---

# 7. 결론

Snippet-Vault 시스템은 개발자가 자주 사용하는 코드 조각을 저장하고 관리할 수 있도록 설계된 웹 기반 애플리케이션이다.

본 시스템은 코드 스니펫 저장, 검색, 수정, 삭제 기능을 제공하며 태그와 언어 기반 분류 기능을 통해 원하는 코드를 빠르게 찾을 수 있도록 설계하였다. 또한 코드 하이라이팅과 코드 복사 기능을 통해 코드의 가독성과 재사용성을 향상시켰다.

이를 통해 개발자가 필요한 코드를 효율적으로 관리하고 재사용할 수 있도록 하여 개발 생산성을 높이는 것을 목표로 구현하였다.

향후 발전 방향으로는 다음과 같은 기능을 추가할 수 있다.

- 사용자 로그인 시스템  
- 클라우드 배포  
- 코드 공유 기능  

---
