const BASE_URL = "http://localhost:5000";

export const fetchSnippets = async ({ keyword = "", languageId = "" } = {}) => {
  const query = new URLSearchParams();

  if (keyword.trim()) {
    query.append("keyword", keyword.trim());
  }

  if (languageId) {
    query.append("language_id", languageId);
  }

  const url = query.toString()
    ? `${BASE_URL}/snippets?${query.toString()}`
    : `${BASE_URL}/snippets`;

  const response = await fetch(url);
  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to fetch snippets");
  }

  return Array.isArray(result.data) ? result.data : [];
};

export const fetchLanguages = async () => {
  const response = await fetch(`${BASE_URL}/languages`);
  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to fetch languages");
  }

  return Array.isArray(result.data) ? result.data : [];
};

export const fetchSnippetById = async (id) => {
  const response = await fetch(`${BASE_URL}/snippets/${id}`);
  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to fetch snippet detail");
  }

  return result.data;
};

export const deleteSnippetById = async (id) => {
  const response = await fetch(`${BASE_URL}/snippets/${id}`, {
    method: "DELETE",
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to delete snippet");
  }

  return result;
};

export const createSnippet = async (payload) => {
  const response = await fetch(`${BASE_URL}/snippets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to create snippet");
  }

  return result.data;
};

export const updateSnippetById = async (id, payload) => {
  const response = await fetch(`${BASE_URL}/snippets/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to update snippet");
  }

  return result.data;
};