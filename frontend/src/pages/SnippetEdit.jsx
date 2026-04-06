import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getSnippetById,
  getLanguages,
  getTags,
  createTag,
  deleteTag,
  updateSnippet,
  addTagToSnippet,
  removeTagFromSnippet,
} from "../api";

function SnippetEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [languageId, setLanguageId] = useState("");

  const [languages, setLanguages] = useState([]);
  const [tags, setTags] = useState([]);

  const [selectedTagIds, setSelectedTagIds] = useState([]);
  const [originalTagIds, setOriginalTagIds] = useState([]);

  const [newTagName, setNewTagName] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchInitialData = async () => {
    try {
      setLoading(true);

      const [snippetResult, languagesResult, tagsResult] = await Promise.all([
        getSnippetById(id),
        getLanguages(),
        getTags(),
      ]);

      const snippet = snippetResult.data;

      setTitle(snippet.title || "");
      setDescription(snippet.description || "");
      setCode(snippet.code || "");
      setLanguageId(snippet.language_id || "");

      setLanguages(languagesResult.data || []);
      setTags(tagsResult.data || []);

      const existingTags = (snippet.tags || []).map((tag) => tag.id);

      setSelectedTagIds(existingTags);
      setOriginalTagIds(existingTags);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, [id]);

  const handleTagToggle = (tagId) => {
    setSelectedTagIds((prev) =>
      prev.includes(tagId)
        ? prev.filter((t) => t !== tagId)
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

      setTags((prev) => [...prev, createdTag]);
      setSelectedTagIds((prev) =>
        prev.includes(createdTag.id) ? prev : [...prev, createdTag.id]
      );

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
      setOriginalTagIds((prev) => prev.filter((id) => id !== tagId));

      alert("태그가 삭제되었습니다.");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      await updateSnippet(id, {
        title,
        description,
        code,
        language_id: Number(languageId),
      });

      const addedTags = selectedTagIds.filter(
        (tagId) => !originalTagIds.includes(tagId)
      );

      const removedTags = originalTagIds.filter(
        (tagId) => !selectedTagIds.includes(tagId)
      );

      for (const tagId of addedTags) {
        await addTagToSnippet(id, tagId);
      }

      for (const tagId of removedTags) {
        await removeTagFromSnippet(id, tagId);
      }

      alert("수정되었습니다.");
      navigate(`/snippets/${id}`);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="page-container">로딩 중...</div>;
  }

  return (
    <div className="page-container">
      <h1 className="form-page-title">스니펫 수정</h1>

      <form onSubmit={handleSubmit} className="snippet-form">
        <div className="form-group">
          <label>제목</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className="form-group">
          <label>설명</label>
          <textarea
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>코드</label>
          <textarea
            rows="10"
            value={code}
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
              value={newTagName}
              placeholder="새 태그"
              onChange={(e) => setNewTagName(e.target.value)}
            />

            <button type="button" onClick={handleCreateTag}>
              태그 생성
            </button>
          </div>
        </div>

        {error && <p className="error-text">{error}</p>}

        <button type="submit" disabled={saving}>
          {saving ? "저장 중..." : "수정 완료"}
        </button>
      </form>
    </div>
  );
}

export default SnippetEdit;