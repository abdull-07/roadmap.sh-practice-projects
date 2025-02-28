const languageSelect = document.getElementById("language-select");
const fetchRepoButton = document.getElementById("fetch-repo");
const statusDiv = document.getElementById("status");
const repoContainer = document.getElementById("repo-container");
const repoName = document.getElementById("repo-name");
const repoDescription = document.getElementById("repo-description");
const repoStats = document.getElementById("repo-stats");
const refreshButton = document.getElementById("refresh");

const GITHUB_API_URL = "https://api.github.com/search/repositories?q=language:";

// Display status messages
const showStatus = (message, isError = false) => {
  statusDiv.textContent = message;
  statusDiv.style.color = isError ? "red" : "gray";
};

// Fetch random repository
const fetchRandomRepo = async (language) => {
  try {
    showStatus("Loading, please wait...");
    repoContainer.classList.add("hidden");

    // Fetch repositories from GitHub API
    const response = await fetch(`${GITHUB_API_URL}${language}&sort=stars`);
    if (!response.ok) throw new Error("Error fetching repositories");

    const data = await response.json();
    if (data.items.length === 0) throw new Error("No repositories found");

    // Pick a random repository
    const randomRepo = data.items[Math.floor(Math.random() * data.items.length)];
    displayRepository(randomRepo);
    showStatus(""); // Clear status
  } catch (error) {
    showStatus(error.message, true);
  }
};

// Display repository details
const displayRepository = (repo) => {
  repoName.textContent = repo.name;
  repoDescription.textContent = repo.description || "No description available.";
  repoStats.innerHTML = `
    ⭐ Stars: ${repo.stargazers_count} | 🍴 Forks: ${repo.forks_count} | 🐞 Issues: ${repo.open_issues_count}
  `;
  repoContainer.classList.remove("hidden");
};

// Event Listeners
fetchRepoButton.addEventListener("click", () => {
  const selectedLanguage = languageSelect.value;
  if (!selectedLanguage) {
    showStatus("Please select a language", true);
    return;
  }
  fetchRandomRepo(selectedLanguage);
});

refreshButton.addEventListener("click", () => {
  const selectedLanguage = languageSelect.value;
  fetchRandomRepo(selectedLanguage);
});
