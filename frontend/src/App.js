import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SnippetCreate from "./pages/SnippetCreate";
import SnippetDetail from "./pages/SnippetDetail";
import SnippetEdit from "./pages/SnippetEdit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/snippets/create" element={<SnippetCreate />} />
        <Route path="/snippets/:id/edit" element={<SnippetEdit />} />
        <Route path="/snippets/:id" element={<SnippetDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;