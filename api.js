const API = 'https://hacker-news.firebaseio.com/v0';

/**
 * Fetches an array of the newest post IDs from HackerNews.
 * These are IDs of the latest 'new stories'.
 * returns {Promise<number[]>} Array of post IDs
 */
export async function fetchNewPostIds() {
  // Make a GET request to the 'newstories' endpoint of the API
  const res = await fetch(`${API}/newstories.json`);
  // Parse the response as JSON and return it (an array of IDs)
  return await res.json();
}

/**
 * Fetches the full data for a single post given its ID.
 * param {number} id - The ID of the post to fetch
 * returns {Promise<Object|undefined>} The post data or undefined if type doesn't match
 */
export async function fetchPost(id) {
  // Fetch the post data JSON by its ID
  const res = await fetch(`${API}/item/${id}.json`);
  // Parse the JSON response into an object
  const post = await res.json();

  return post;
  // Otherwise, return undefined (post ignored)
}
