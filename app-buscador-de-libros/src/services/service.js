export const fetchBooks = async (query = "react") => {
  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
    );
    if (!response.ok) {
      throw new Error("Error fetching data");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};