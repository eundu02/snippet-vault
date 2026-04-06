import React from "react";

function FilterBar({
  keyword,
  setKeyword,
  languageId,
  setLanguageId,
  languages,
  onSearch,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form className="filter-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="제목, 코드, 설명으로 검색"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <select
        value={languageId}
        onChange={(e) => setLanguageId(e.target.value)}
      >
        <option value="">전체 언어</option>
        {languages.map((language) => (
          <option key={language.id} value={language.id}>
            {language.name}
          </option>
        ))}
      </select>

      <button type="submit">검색</button>
    </form>
  );
}

export default FilterBar;