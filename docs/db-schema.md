# DB 스키마 설계

## 1. 테이블 구성

### Snippets
- id : INTEGER, PK
- title : TEXT, NOT NULL
- code : TEXT, NOT NULL
- description : TEXT
- language_id : INTEGER, FK
- created_at : TEXT

### Languages
- id : INTEGER, PK
- name : TEXT, NOT NULL, UNIQUE

### Tags
- id : INTEGER, PK
- tag_name : TEXT, NOT NULL, UNIQUE

### Snippet_Tags
- snippet_id : INTEGER, FK
- tag_id : INTEGER, FK

## 2. 관계
- 하나의 스니펫은 하나의 언어를 가진다.
- 하나의 스니펫은 여러 개의 태그를 가질 수 있다.
- 하나의 태그는 여러 개의 스니펫에 연결될 수 있다.

## 3. ER 개념 구조

Languages (1) ---- (N) Snippets
Snippets (N) ---- (N) Tags