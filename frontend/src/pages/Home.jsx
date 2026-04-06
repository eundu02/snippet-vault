import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FilterBar from "../components/FilterBar";
import SnippetCard from "../components/SnippetCard";
import { getLanguages, getSnippets, deleteSnippet } from "../api";

function Home() {
  const [snippets, setSnippets] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [languageId, setLanguageId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchLanguages = async () => {
    try {
      const result = await getLanguages();
      setLanguages(result.data || []);
    } catch (error) {
      console.error("Failed to fetch languages:", error);
      setError(error.message);
    }
  };

  const fetchSnippets = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getSnippets(keyword, languageId);
      setSnippets(result.data || []);
    } catch (error) {
      console.error("Failed to fetch snippets:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSnippet(id);
      await fetchSnippets();
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchLanguages();
  }, []);

  useEffect(() => {
    fetchSnippets();
  }, []);

  return (
    <div style={{ padding: "24px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1>Snippet Vault</h1>
        <Link to="/snippets/create">
          <button>스니펫 추가</button>
        </Link>
      </div>

      <FilterBar
        keyword={keyword}
        setKeyword={setKeyword}
        languageId={languageId}
        setLanguageId={setLanguageId}
        languages={languages}
        onSearch={fetchSnippets}
      />

      <p style={{ marginTop: "16px" }}>총 {snippets.length}개</p>

      {loading && <p>로딩 중...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && snippets.length === 0 ? (
        <p>스니펫이 없습니다.</p>
      ) : (
        <div style={{ display: "grid", gap: "16px", marginTop: "16px" }}>
          {snippets.map((snippet) => (
            <SnippetCard
              key={snippet.id}
              snippet={snippet}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;