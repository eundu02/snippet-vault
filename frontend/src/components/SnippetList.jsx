import SnippetCard from "./SnippetCard";

function SnippetList({ snippets, loading }) {
  if (loading) {
    return <div className="status-box">스니펫을 불러오는 중입니다...</div>;
  }

  if (!snippets || snippets.length === 0) {
    return <div className="status-box">검색 결과가 없습니다.</div>;
  }

  return (
    <div className="snippet-list">
      {snippets.map((snippet) => (
        <SnippetCard key={snippet.id} snippet={snippet} />
      ))}
    </div>
  );
}

export default SnippetList;