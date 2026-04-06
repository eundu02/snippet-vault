import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import FilterBar from "../components/FilterBar";
import SnippetCard from "../components/SnippetCard";
import { getLanguages, getSnippets } from "../api";

function Home() {
  const [snippets, setSnippets] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [languageId, setLanguageId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchLanguages = useCallback(async () => {
    try {
      const result = await getLanguages();
      setLanguages(result.data || []);
    } catch (error) {
      console.error("Failed to fetch languages:", error);
      setError(error.message);
    }
  }, []);

  const fetchSnippets = useCallback(async () => {
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
  }, [keyword, languageId]);

  useEffect(() => {
    fetchLanguages();
  }, [fetchLanguages]);

  useEffect(() => {
    fetchSnippets();
  }, [fetchSnippets]);

  return (
    <div className="page-container">
      <div className="home-header">
        <h1 className="home-title">Snippet Vault</h1>
        <Link to="/snippets/create">
          <button>스니펫 관리
          </button>
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

      <p className="result-count">총 {snippets.length}개</p>

      {loading && <p>로딩 중...</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && snippets.length === 0 ? (
        <div className="empty-state">스니펫이 없습니다.</div>
      ) : (
        <div className="snippet-list">
          {snippets.map((snippet) => (
            <SnippetCard key={snippet.id} snippet={snippet} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;