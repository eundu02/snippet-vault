import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getLanguages,
  getTags,
  createTag,
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
  const [error, setError] = useState("");

  const fetchInitialData = async () => {
    try {
      const [languagesResult, tagsResult] = await Promise.all([
        getLanguages(),
        getTags(),
      ]);

      setLanguages(languagesResult.data || []);
      setTags(tagsResult.data || []);
    } catch (error) {
      setError(error.message);
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
        setSelectedTagIds((prev) => [...prev, createdTag.id]);
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
      setLoading(true);
      setError("");

      const snippetResult = await createSnippet({
        title,
        description,
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
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "24px" }}>
      <h1>스니펫 생성</h1>

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
            {tags.length === 0 ? (
              <p>태그가 없습니다.</p>
            ) : (
              tags.map((tag) => (
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
              ))
            )}
          </div>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label>새 태그 만들기</label>
          <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
            <input
              type="text"
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              placeholder="예: React"
              style={{ flex: 1, padding: "8px" }}
            />
            <button type="button" onClick={handleCreateTag}>
              태그 생성
            </button>
          </div>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "생성 중..." : "생성하기"}
        </button>
      </form>
    </div>
  );
}

export default SnippetCreate;