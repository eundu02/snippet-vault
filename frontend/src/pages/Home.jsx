import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLanguages, fetchSnippets } from "../api";
import FilterBar from "../components/FilterBar";
import SnippetList from "../components/SnippetList";

function Home() {
  const navigate = useNavigate();

  const [snippets, setSnippets] = useState([]);
  const [languages, setLanguages] = useState([]);

  const [keywordInput, setKeywordInput] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const [appliedKeyword, setAppliedKeyword] = useState("");
  const [appliedLanguage, setAppliedLanguage] = useState("");

  const [loading, setLoading] = useState(false);
  const [languageLoading, setLanguageLoading] = useState(false);
  const [error, setError] = useState("");

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

  const loadSnippets = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await fetchSnippets({
        keyword: appliedKeyword,
        languageId: appliedLanguage,
      });

      setSnippets(data);
    } catch (err) {
      setError(err.message);
      setSnippets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLanguages();
  }, []);

  useEffect(() => {
    loadSnippets();
  }, [appliedKeyword, appliedLanguage]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setAppliedKeyword(keywordInput);
    setAppliedLanguage(selectedLanguage);
  };

  const handleReset = () => {
    setKeywordInput("");
    setSelectedLanguage("");
    setAppliedKeyword("");
    setAppliedLanguage("");
  };

  const handleMoveCreate = () => {
    navigate("/snippets/new");
  };

  return (
    <div className="app-container">
      <header className="page-header">
        <div className="page-header-row">
          <div>
            <h1>Snippet Vault</h1>
            <p>자주 사용하는 코드 스니펫을 검색하고 관리하는 공간</p>
          </div>

          <button type="button" onClick={handleMoveCreate}>
            + 스니펫 추가
          </button>
        </div>
      </header>

      <FilterBar
        keywordInput={keywordInput}
        setKeywordInput={setKeywordInput}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        languages={languages}
        onSearch={handleSearchSubmit}
        onReset={handleReset}
        languageLoading={languageLoading}
      />

      {error && <div className="error-box">{error}</div>}

      <section className="result-summary">
        <p>
          총 <strong>{snippets.length}</strong>개의 스니펫
        </p>
      </section>

      <SnippetList snippets={snippets} loading={loading} />
    </div>
  );
}

export default Home;