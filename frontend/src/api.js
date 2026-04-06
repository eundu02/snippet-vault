const BASE_URL = "http://localhost:5000";

async function request(url, options = {}) {
  const response = await fetch(`${BASE_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  const result = await response.json();

  if (!response.ok || result.success === false) {
    throw new Error(result.message || "Request failed");
  }

  return result;
}

// snippets
export const getSnippets = async (keyword = "", languageId = "") => {
  const query = new URLSearchParams();

  if (keyword) query.append("keyword", keyword);
  if (languageId) query.append("language_id", languageId);

  const url = query.toString() ? `/snippets?${query.toString()}` : "/snippets";
  return request(url);
};

export const getSnippetById = async (id) => {
  return request(`/snippets/${id}`);
};

export const createSnippet = async (snippetData) => {
  return request("/snippets", {
    method: "POST",
    body: JSON.stringify(snippetData),
  });
};

export const updateSnippet = async (id, snippetData) => {
  return request(`/snippets/${id}`, {
    method: "PUT",
    body: JSON.stringify(snippetData),
  });
};

export const deleteSnippet = async (id) => {
  return request(`/snippets/${id}`, {
    method: "DELETE",
  });
};

// languages
export const getLanguages = async () => {
  return request("/languages");
};

// tags
export const getTags = async () => {
  return request("/tags");
};

export const createTag = async (tagData) => {
  return request("/tags", {
    method: "POST",
    body: JSON.stringify(tagData),
  });
};

// snippet-tags
export const getSnippetTags = async (snippetId) => {
  return request(`/snippets/${snippetId}/tags`);
};

export const addTagToSnippet = async (snippetId, tagId) => {
  return request(`/snippets/${snippetId}/tags`, {
    method: "POST",
    body: JSON.stringify({ tag_id: tagId }),
  });
};