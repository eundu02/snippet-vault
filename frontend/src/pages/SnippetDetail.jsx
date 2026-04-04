import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSnippetById, deleteSnippetById } from "../api";

function SnippetDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [snippet, setSnippet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadSnippetDetail = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await fetchSnippetById(id);
        setSnippet(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadSnippetDetail();
  }, [id]);

  const handleMoveBack = () => {
    navigate("/");
  };

  const handleMoveEdit = () => {
    navigate(`/snippets/${id}/edit`);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet?.code || "");
      alert("코드가 복사되었습니다.");
    } catch (error) {
      alert("복사에 실패했습니다.");
    }
  };

  const handleDelete = async () => {
    if (!snippet) {
      return;
    }

    const isConfirmed = window.confirm(
      `"${snippet.title}" 스니펫을 삭제하시겠습니까?`
    );

    if (!isConfirmed) {
      return;
    }

    try {
      setDeleteLoading(true);
      await deleteSnippetById(id);
      alert("스니펫이 삭제되었습니다.");
      navigate("/");
    } catch (err) {
      alert(err.message || "삭제에 실패했습니다.");
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="app-container">
        <div className="status-box">상세 정보를 불러오는 중입니다...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container">
        <div className="error-box">{error}</div>
        <div className="detail-top-bar">
          <button
            type="button"
            className="secondary-btn"
            onClick={handleMoveBack}
          >
            목록으로
          </button>
        </div>
      </div>
    );
  }

  if (!snippet) {
    return (
      <div className="app-container">
        <div className="status-box">스니펫 정보를 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="detail-top-bar">
        <button
          type="button"
          className="secondary-btn"
          onClick={handleMoveBack}
        >
          목록으로
        </button>
      </div>

      <div className="detail-card">
        <div className="detail-header">
          <h1>{snippet.title || "제목 없음"}</h1>
          <span className="language-badge">
            {snippet.language_name || "Unknown"}
          </span>
        </div>

        <p className="detail-description">
          {snippet.description || "설명이 없습니다."}
        </p>

        <pre className="snippet-code">
          <code>{snippet.code || ""}</code>
        </pre>

        <div className="snippet-card-actions">
          <button type="button" onClick={handleCopy} disabled={deleteLoading}>
            복사
          </button>

          <button
            type="button"
            className="secondary-btn"
            onClick={handleMoveEdit}
            disabled={deleteLoading}
          >
            수정
          </button>

          <button
            type="button"
            className="danger-btn"
            onClick={handleDelete}
            disabled={deleteLoading}
          >
            {deleteLoading ? "삭제 중..." : "삭제"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SnippetDetail;