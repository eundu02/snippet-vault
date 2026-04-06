import React from "react";
import { Link } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function SnippetCard({ snippet }) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet.code);
      alert("코드가 복사되었습니다.");
    } catch (error) {
      alert("복사에 실패했습니다.");
    }
  };

  const getLanguageForHighlight = () => {
    if (!snippet.language_name) return "javascript";

    const languageMap = {
      javascript: "javascript",
      typescript: "typescript",
      python: "python",
      java: "java",
      c: "c",
      "c++": "cpp",
      cpp: "cpp",
      csharp: "csharp",
      "c#": "csharp",
      html: "html",
      css: "css",
      json: "json",
      sql: "sql",
      kotlin: "kotlin",
      dart: "dart",
      jsx: "jsx",
      tsx: "tsx",
      bash: "bash",
    };

    const normalized = snippet.language_name.toLowerCase().trim();
    return languageMap[normalized] || "javascript";
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

      <div className="snippet-code-block syntax-wrapper">
        <SyntaxHighlighter
          language={getLanguageForHighlight()}
          style={oneDark}
          customStyle={{
            margin: 0,
            padding: "18px",
            borderRadius: "16px",
            background: "transparent",
            fontSize: "14px",
          }}
          wrapLongLines={true}
          showLineNumbers={false}
        >
          {snippet.code || ""}
        </SyntaxHighlighter>
      </div>

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