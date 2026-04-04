import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSnippet, fetchLanguages } from "../api";

function SnippetCreate() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [languageId, setLanguageId] = useState("");

  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [languageLoading, setLanguageLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadLanguages = async () => {
      try {
        setLanguageLoading(true);
        const data = await fetchLanguages();
        setLanguages(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLanguageLoading(false);
      }
    };

    loadLanguages();
  }, []);

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
      setLoading(true);
      setError("");

      const createdSnippet = await createSnippet({
        title: title.trim(),
        description: description.trim(),
        code,
        language_id: Number(languageId),
      });

      alert("스니펫이 등록되었습니다.");
      navigate(`/snippets/${createdSnippet.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMoveBack = () => {
    navigate("/");
  };

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

      <div className="form-card">
        <div className="detail-header">
          <h1>스니펫 추가</h1>
        </div>

        {error && <div className="error-box">{error}</div>}

        <form className="snippet-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">제목</label>
            <input
              id="title"
              type="text"
              placeholder="예: Java Scanner 입력"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="language">언어</label>
            <select
              id="language"
              value={languageId}
              onChange={(e) => setLanguageId(e.target.value)}
              disabled={loading || languageLoading}
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
              placeholder="스니펫에 대한 간단한 설명을 입력하세요"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="code">코드</label>
            <textarea
              id="code"
              rows="12"
              placeholder="코드를 입력하세요"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="secondary-btn"
              onClick={handleMoveBack}
              disabled={loading}
            >
              취소
            </button>

            <button type="submit" disabled={loading}>
              {loading ? "저장 중..." : "저장"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SnippetCreate;