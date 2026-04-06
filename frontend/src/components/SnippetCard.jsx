import React from "react";
import { Link } from "react-router-dom";

function SnippetCard({ snippet, onDelete }) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet.code);
      alert("코드가 복사되었습니다.");
    } catch (error) {
      alert("복사에 실패했습니다.");
    }
  };

  const handleDelete = () => {
    const confirmed = window.confirm("정말 삭제하시겠습니까?");
    if (confirmed) {
      onDelete(snippet.id);
    }
  };

  return (
    <div className="snippet-card">
      <h3>{snippet.title}</h3>

      <div style={{ marginBottom: "8px" }}>
        <span
          style={{
            display: "inline-block",
            padding: "4px 10px",
            borderRadius: "12px",
            backgroundColor: "#eef2ff",
            fontSize: "13px",
            marginBottom: "8px",
          }}
        >
          {snippet.language_name || "언어 없음"}
        </span>

        <div style={{ marginTop: "6px" }}>
          {snippet.tags && snippet.tags.length > 0 ? (
            snippet.tags.map((tag) => (
              <span
                key={tag.id}
                style={{
                  display: "inline-block",
                  marginRight: "6px",
                  marginBottom: "6px",
                  padding: "4px 8px",
                  borderRadius: "10px",
                  backgroundColor: "#f3f4f6",
                  fontSize: "12px",
                }}
              >
                #{tag.name}
              </span>
            ))
          ) : (
            <span style={{ fontSize: "12px", color: "#888" }}>태그 없음</span>
          )}
        </div>
      </div>

      <p>{snippet.description}</p>

      <pre
        style={{
          backgroundColor: "#f8f8f8",
          padding: "12px",
          borderRadius: "8px",
          overflowX: "auto",
        }}
      >
        <code>{snippet.code}</code>
      </pre>

      <div style={{ marginTop: "12px", display: "flex", gap: "8px" }}>
        <button onClick={handleCopy}>복사</button>
        <Link to={`/snippets/${snippet.id}`}>
          <button>상세보기</button>
        </Link>
        <Link to={`/snippets/${snippet.id}/edit`}>
          <button>수정</button>
        </Link>
        <button onClick={handleDelete}>삭제</button>
      </div>
    </div>
  );
}

export default SnippetCard;