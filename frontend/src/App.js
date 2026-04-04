import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SnippetDetail from "./pages/SnippetDetail";
import SnippetCreate from "./pages/SnippetCreate";
import SnippetEdit from "./pages/SnippetEdit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/snippets/new" element={<SnippetCreate />} />
        <Route path="/snippets/:id" element={<SnippetDetail />} />
        <Route path="/snippets/:id/edit" element={<SnippetEdit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;