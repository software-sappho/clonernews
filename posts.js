import { fetchNewPostIds, fetchPost } from './api.js';

// Grab the container element where posts will be rendered
const postsContainer = document.getElementById('posts');

// Grab the element that shows live update status messages
const liveUpdates = document.getElementById('live-updates');

// Main function to load initial posts on page load.
export async function loadInitialPosts() {
  // Show a loading message to the user
  liveUpdates.textContent = 'Loading posts...';

  // Fetch the array of new post IDs from HackerNews API
  const ids = await fetchNewPostIds();

  // Take the first 20 post IDs from the newest posts
  const first10 = ids.slice(0, 20);

  // Loop over each post ID and fetch the post data
  for (const id of first10) {
    const post = await fetchPost(id);

    // If post data exists (and is story/job/poll), render it
    if (post) renderPost(post);
  }

  // Update live status to show how many posts are displayed
  liveUpdates.textContent = 'Showing latest 20 posts.';
}

/**
 * Creates and inserts a post's HTML into the page.
 * param {Object} post - The post data object fetched from API
 */
function renderPost(post) {
  const postEl = document.createElement('article');
  postEl.className = 'post';

  // Determine the URL to use for "Read more"
  const link = post.url 
    ? post.url // external link if present
    : `https://news.ycombinator.com/item?id=${post.id}`; // fallback to HN discussion page

  postEl.innerHTML = `
    <h2>${post.title || '(No title)'}</h2>
    <p><strong>Type:</strong> ${post.type}</p>
    <p><strong>By:</strong> ${post.by}</p>
    <p><strong>Posted at:</strong> ${new Date(post.time * 1000).toLocaleString()}</p>
    <a href="${link}" target="_blank" rel="noopener noreferrer">Read more</a>
  `;

  postsContainer.appendChild(postEl);
}


// Immediately start loading posts when this module runs
loadInitialPosts();