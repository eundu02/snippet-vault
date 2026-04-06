import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getSnippetById,
  getLanguages,
  getTags,
  createTag,
  updateSnippet,
  addTagToSnippet,
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
      setError("");

      const [snippetResult, languagesResult, tagsResult] = await Promise.all([
        getSnippetById(id),
        getLanguages(),
        getTags(),
      ]);

      const snippet = snippetResult.data;
      const languageList = languagesResult.data || [];
      const tagList = tagsResult.data || [];

      setTitle(snippet.title || "");
      setDescription(snippet.description || "");
      setCode(snippet.code || "");
      setLanguageId(snippet.language_id ? String(snippet.language_id) : "");

      const existingTagIds = (snippet.tags || []).map((tag) => tag.id);

      setSelectedTagIds(existingTagIds);
      setOriginalTagIds(existingTagIds);

      setLanguages(languageList);
      setTags(tagList);
    } catch (error) {
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
        ? prev.filter((item) => item !== tagId)
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
      } else {
        const tagsResult = await getTags();
        setTags(tagsResult.data || []);
      }

      setNewTagName("");
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
      setSaving(true);
      setError("");

      await updateSnippet(id, {
        title,
        description,
        code,
        language_id: Number(languageId),
      });

      const addedTagIds = selectedTagIds.filter(
        (tagId) => !originalTagIds.includes(tagId)
      );

      for (const tagId of addedTagIds) {
        await addTagToSnippet(id, tagId);
      }

      alert("스니펫이 수정되었습니다.\n현재는 태그 추가만 가능하고 제거는 아직 백엔드 API가 필요합니다.");
      navigate(`/snippets/${id}`);
    } catch (error) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div style={{ padding: "24px" }}>로딩 중...</div>;
  }

  return (
    <div style={{ padding: "24px" }}>
      <h1>스니펫 수정</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "16px" }}>
          <label>제목</label>
          <br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label>설명</label>
          <br />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label>코드</label>
          <br />
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows="10"
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label>언어</label>
          <br />
          <select
            value={languageId}
            onChange={(e) => setLanguageId(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          >
            <option value="">언어 선택</option>
            {languages.map((language) => (
              <option key={language.id} value={language.id}>
                {language.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label>태그 선택</label>
          <div style={{ marginTop: "8px" }}>
            {tags.map((tag) => (
              <label
                key={tag.id}
                style={{
                  display: "inline-block",
                  marginRight: "12px",
                  marginBottom: "8px",
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedTagIds.includes(tag.id)}
                  onChange={() => handleTagToggle(tag.id)}
                />{" "}
                {tag.name}
              </label>
            ))}
          </div>
          <p style={{ fontSize: "13px", color: "#666" }}>
            현재 백엔드에는 태그 제거 API가 없어서, 체크 해제해도 기존 태그는 실제 삭제되지 않습니다.
          </p>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label>새 태그 만들기</label>
          <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
            <input
              type="text"
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              placeholder="예: API"
              style={{ flex: 1, padding: "8px" }}
            />
            <button type="button" onClick={handleCreateTag}>
              태그 생성
            </button>
          </div>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" disabled={saving}>
          {saving ? "수정 중..." : "수정 완료"}
        </button>
      </form>
    </div>
  );
}

export default SnippetEdit;