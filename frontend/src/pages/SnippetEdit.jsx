import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchLanguages,
  fetchSnippetById,
  updateSnippetById,
} from "../api";

function SnippetEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [languageId, setLanguageId] = useState("");

  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        setError("");

        const [snippetData, languageData] = await Promise.all([
          fetchSnippetById(id),
          fetchLanguages(),
        ]);

        setTitle(snippetData.title || "");
        setDescription(snippetData.description || "");
        setCode(snippetData.code || "");
        setLanguageId(
          snippetData.language_id ? String(snippetData.language_id) : ""
        );

        setLanguages(languageData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, [id]);

  const handleMoveBack = () => {
    navigate(`/snippets/${id}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (!code.trim()) {
      alert("코드를 입력해주세요.");
      return;
    }

    if (!languageId) {
      alert("언어를 선택해주세요.");
      return;
    }

    try {
      setSubmitLoading(true);
      setError("");

      await updateSnippetById(id, {
        title: title.trim(),
        description: description.trim(),
        code,
        language_id: Number(languageId),
      });

      alert("스니펫이 수정되었습니다.");
      navigate(`/snippets/${id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="app-container">
        <div className="status-box">수정할 스니펫 정보를 불러오는 중입니다...</div>
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
          disabled={submitLoading}
        >
          상세로 돌아가기
        </button>
      </div>

      <div className="form-card">
        <div className="detail-header">
          <h1>스니펫 수정</h1>
        </div>

        {error && <div className="error-box">{error}</div>}

        <form className="snippet-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">제목</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={submitLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="language">언어</label>
            <select
              id="language"
              value={languageId}
              onChange={(e) => setLanguageId(e.target.value)}
              disabled={submitLoading}
            >
              <option value="">언어를 선택하세요</option>
              {languages.map((language) => (
                <option key={language.id} value={language.id}>
                  {language.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">설명</label>
            <textarea
              id="description"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={submitLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="code">코드</label>
            <textarea
              id="code"
              rows="12"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              disabled={submitLoading}
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="secondary-btn"
              onClick={handleMoveBack}
              disabled={submitLoading}
            >
              취소
            </button>

            <button type="submit" disabled={submitLoading}>
              {submitLoading ? "수정 중..." : "수정 완료"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SnippetEdit;