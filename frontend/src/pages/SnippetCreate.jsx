import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getLanguages,
  getTags,
  createTag,
  deleteTag,
  createSnippet,
  addTagToSnippet,
} from "../api";

function SnippetCreate() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [languageId, setLanguageId] = useState("");

  const [languages, setLanguages] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTagIds, setSelectedTagIds] = useState([]);

  const [newTagName, setNewTagName] = useState("");

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchInitialData = async () => {
    try {
      setPageLoading(true);
      setError("");

      const [languagesResult, tagsResult] = await Promise.all([
        getLanguages(),
        getTags(),
      ]);

      setLanguages(languagesResult.data || []);
      setTags(tagsResult.data || []);
    } catch (error) {
      console.error("Failed to load create page data:", error);
      setError(error.message);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const handleTagToggle = (tagId) => {
    setSelectedTagIds((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  const handleCreateTag = async () => {
    if (!newTagName.trim()) {
      alert("새 태그 이름을 입력하세요.");
      return;
    }

    try {
      const result = await createTag({ name: newTagName.trim() });
      const createdTag = result.data;

      if (createdTag) {
        setTags((prev) => [...prev, createdTag]);
        setSelectedTagIds((prev) =>
          prev.includes(createdTag.id) ? prev : [...prev, createdTag.id]
        );
      }

      setNewTagName("");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDeleteTag = async (tagId, tagName) => {
    const confirmed = window.confirm(
      `정말 "${tagName}" 태그를 삭제하시겠습니까?\n연결된 스니펫에서도 함께 제거됩니다.`
    );

    if (!confirmed) return;

    try {
      await deleteTag(tagId);

      setTags((prev) => prev.filter((tag) => tag.id !== tagId));
      setSelectedTagIds((prev) => prev.filter((id) => id !== tagId));

      alert("태그가 삭제되었습니다.");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !code.trim() || !languageId) {
      alert("제목, 코드, 언어는 필수입니다.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const snippetResult = await createSnippet({
        title: title.trim(),
        description: description.trim(),
        code,
        language_id: Number(languageId),
      });

      const createdSnippet = snippetResult.data;

      if (createdSnippet && createdSnippet.id) {
        for (const tagId of selectedTagIds) {
          await addTagToSnippet(createdSnippet.id, tagId);
        }
      }

      alert("스니펫이 생성되었습니다.");
      navigate("/");
    } catch (error) {
      console.error("Failed to create snippet:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return <div className="page-container">로딩 중...</div>;
  }

  return (
    <div className="page-container">
      <h1 className="form-page-title">스니펫 생성</h1>

      <form onSubmit={handleSubmit} className="snippet-form">
        <div className="form-group">
          <label>제목</label>
          <input
            type="text"
            value={title}
            placeholder="예: React useEffect 예제"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>설명</label>
          <textarea
            value={description}
            rows="4"
            placeholder="코드 설명"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>코드</label>
          <textarea
            value={code}
            rows="10"
            placeholder="코드를 입력하세요"
            onChange={(e) => setCode(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>언어</label>
          <select
            value={languageId}
            onChange={(e) => setLanguageId(e.target.value)}
          >
            <option value="">언어 선택</option>
            {languages.map((language) => (
              <option key={language.id} value={language.id}>
                {language.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>태그 선택 / 관리</label>

          {tags.length === 0 ? (
            <div className="empty-state">태그가 없습니다.</div>
          ) : (
            <div className="tag-manage-list">
              {tags.map((tag) => (
                <div key={tag.id} className="tag-manage-item">
                  <label className="tag-checkbox-item">
                    <input
                      type="checkbox"
                      checked={selectedTagIds.includes(tag.id)}
                      onChange={() => handleTagToggle(tag.id)}
                    />
                    {tag.name}
                  </label>

                  <button
                    type="button"
                    className="tag-delete-button"
                    onClick={() => handleDeleteTag(tag.id, tag.name)}
                  >
                    삭제
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="form-group">
          <label>새 태그 만들기</label>

          <div className="tag-create-row">
            <input
              type="text"
              value={newTagName}
              placeholder="예: API"
              onChange={(e) => setNewTagName(e.target.value)}
            />

            <button type="button" onClick={handleCreateTag}>
              태그 생성
            </button>
          </div>
        </div>

        {error && <p className="error-text">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "생성 중..." : "생성 완료"}
        </button>
      </form>
    </div>
  );
}

export default SnippetCreate;