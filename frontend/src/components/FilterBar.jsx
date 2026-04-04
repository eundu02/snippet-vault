function FilterBar({
  keywordInput,
  setKeywordInput,
  selectedLanguage,
  setSelectedLanguage,
  languages,
  onSearch,
  onReset,
  languageLoading,
}) {
  return (
    <form className="filter-bar" onSubmit={onSearch}>
      <div className="filter-group">
        <label htmlFor="keyword">검색어</label>
        <input
          id="keyword"
          type="text"
          placeholder="제목, 코드, 설명으로 검색"
          value={keywordInput}
          onChange={(e) => setKeywordInput(e.target.value)}
        />
      </div>

      <div className="filter-group">
        <label htmlFor="language">언어</label>
        <select
          id="language"
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          disabled={languageLoading}
        >
          <option value="">전체 언어</option>
          {languages.map((language) => (
            <option key={language.id} value={language.id}>
              {language.name}
            </option>
          ))}
        </select>
      </div>

      <div className="button-group">
        <button type="submit">검색</button>
        <button type="button" className="secondary-btn" onClick={onReset}>
          초기화
        </button>
      </div>
    </form>
  );
}

export default FilterBar;