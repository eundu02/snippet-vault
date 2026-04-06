import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getSnippetById, deleteSnippet } from "../api";

function SnippetDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [snippet, setSnippet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSnippet = async () => {
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
  };

  useEffect(() => {
    fetchSnippet();
  }, [id]);

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

  if (loading) {
    return <div style={{ padding: "24px" }}>로딩 중...</div>;
  }

  if (error) {
    return (
      <div style={{ padding: "24px", color: "red" }}>
        오류: {error}
      </div>
    );
  }

  if (!snippet) {
    return <div style={{ padding: "24px" }}>스니펫이 없습니다.</div>;
  }

  return (
    <div style={{ padding: "24px" }}>
      <h1>{snippet.title}</h1>

      <div style={{ marginBottom: "12px" }}>
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

        <div style={{ marginTop: "8px" }}>
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

      <p style={{ marginBottom: "16px" }}>{snippet.description}</p>

      <pre
        style={{
          backgroundColor: "#f8f8f8",
          padding: "16px",
          borderRadius: "8px",
          overflowX: "auto",
        }}
      >
        <code>{snippet.code}</code>
      </pre>

      <div style={{ marginTop: "16px", display: "flex", gap: "8px" }}>
        <button onClick={handleCopy}>복사</button>

        <Link to={`/snippets/${snippet.id}/edit`}>
          <button>수정</button>
        </Link>

        <button onClick={handleDelete}>삭제</button>

        <Link to="/">
          <button>목록으로</button>
        </Link>
      </div>
    </div>
  );
}

export default SnippetDetail;