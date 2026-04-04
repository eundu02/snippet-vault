function SnippetCard({ snippet }) {
  if (!snippet) {
    return null;
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet.code || "");
      alert("코드가 복사되었습니다.");
    } catch (error) {
      alert("복사에 실패했습니다.");
    }
  };    

  return (
    <div className="snippet-card">
      <div className="snippet-card-header">
        <h3>{snippet.title || "제목 없음"}</h3>
        <span className="language-badge">
          {snippet.language_name || "Unknown"}
        </span>
      </div>

      <p className="snippet-description">
        {snippet.description || "설명이 없습니다."}
      </p>

      <pre className="snippet-code">
        <code>{snippet.code || ""}</code>
      </pre>

      <div className="snippet-card-actions">
        <button onClick={handleCopy}>복사</button>
      </div>
    </div>
  );
}

export default SnippetCard;