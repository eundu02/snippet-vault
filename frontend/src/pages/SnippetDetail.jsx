import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { getSnippetById, deleteSnippet } from "../api";

function SnippetDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [snippet, setSnippet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSnippet = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getSnippetById(id);
      setSnippet(result.data || null);
    } catch (error) {
      console.error("Failed to fetch snippet:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchSnippet();
  }, [fetchSnippet]);

  const handleCopy = async () => {
    if (!snippet) return;

    try {
      await navigator.clipboard.writeText(snippet.code);
      alert("코드가 복사되었습니다.");
    } catch (error) {
      alert("복사에 실패했습니다.");
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmed) return;

    try {
      await deleteSnippet(id);
      alert("스니펫이 삭제되었습니다.");
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  const getLanguageForHighlight = () => {
    if (!snippet?.language_name) return "javascript";

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

  if (loading) {
    return <div className="page-container">로딩 중...</div>;
  }

  if (error) {
    return <div className="page-container error-text">오류: {error}</div>;
  }

  if (!snippet) {
    return <div className="page-container">스니펫이 없습니다.</div>;
  }

  return (
    <div className="page-container">
      <div className="detail-card">
        <h1 className="detail-title">{snippet.title}</h1>

        <div className="detail-meta">
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

        <div className="detail-code-block syntax-wrapper">
          <SyntaxHighlighter
            language={getLanguageForHighlight()}
            style={oneDark}
            customStyle={{
              margin: 0,
              padding: "20px",
              borderRadius: "16px",
              background: "transparent",
              fontSize: "14px",
            }}
            wrapLongLines={true}
            showLineNumbers={true}
          >
            {snippet.code || ""}
          </SyntaxHighlighter>
        </div>

        <div className="snippet-actions">
          <button onClick={handleCopy}>복사</button>

          <Link to={`/snippets/${snippet.id}/edit`}>
            <button>수정</button>
          </Link>

          <button onClick={handleDelete} className="danger-button">
            삭제
          </button>

          <Link to="/">
            <button>목록으로</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SnippetDetail;