import React from "react";
import { Link } from "react-router-dom";

function SnippetCard({ snippet }) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet.code);
      alert("코드가 복사되었습니다.");
    } catch (error) {
      alert("복사에 실패했습니다.");
    }
  };

  return (
    <div className="snippet-card">
      <div className="snippet-card-header">
        <h3 className="snippet-title">{snippet.title}</h3>
      </div>

      <div className="snippet-meta">
        <span className="language-badge">
          {snippet.language_name || "언어 없음"}
        </span>

        <div className="tag-list">
          {snippet.tags && snippet.tags.length > 0 ? (
            snippet.tags.map((tag) => (
              <span key={tag.id} className="tag-badge">
                #{tag.name}
              </span>
            ))
          ) : (
            <span className="tag-empty">태그 없음</span>
          )}
        </div>
      </div>

      <p className="snippet-description">
        {snippet.description || "설명이 없습니다."}
      </p>

      <pre className="snippet-code-block">
        <code>{snippet.code}</code>
      </pre>

      <div className="snippet-actions">
        <button onClick={handleCopy}>복사</button>

        <Link to={`/snippets/${snippet.id}`}>
          <button>상세보기</button>
        </Link>
      </div>
    </div>
  );
}

export default SnippetCard;