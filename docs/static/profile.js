// Animation helper function
const animate = (element, animation) => {
    element.style.opacity = 0;
    element.style.animation = animation;
    element.style.opacity = 1;
  };
  
  // Fetch GitHub projects
  const fetchGitHubProjects = async (username) => {
      try {
          // First try to fetch from the static file
          const response = await fetch('./static/projects_static.json');
          if (!response.ok) {
              throw new Error('Failed to load projects');
          }
          const data = await response.json();
          
          // Cache the data
          localStorage.setItem('githubProjects', JSON.stringify(data));
          localStorage.setItem('githubProjectsTimestamp', Date.now().toString());
          
          return data;
      } catch (error) {
          console.error('Error fetching projects:', error);
          
          // Try to use cached data if available
          const cachedData = localStorage.getItem('githubProjects');
          if (cachedData) {
              return JSON.parse(cachedData);
          }
          
          return [];
      }
  };
  
  // Enhanced createProjectCard function
  const createProjectCard = (project) => {
      const card = document.createElement('div');
      card.className = 'project-card';
      
      const clickCount = repoStats.click_counts[project.name] || 0;
      const lastCommitDate = repoStats.last_commits[project.name] 
          ? new Date(repoStats.last_commits[project.name])
          : new Date(0);
  
      card.innerHTML = `
          <h3>${project.name}</h3>
          <p>${project.description || 'No description available'}</p>
          <div class="project-stats">
              <span class="language-tag">
                  ${project.language ? `<span class="language-dot"></span>${project.language}` : 'N/A'}
              </span>
              <span class="click-count" title="View count">👁 ${clickCount}</span>
              <span class="last-commit" title="Last updated ${lastCommitDate.toLocaleDateString()}">
                  📅 ${timeSince(lastCommitDate)} ago
              </span>
          </div>
          <a href="${project.html_url}" target="_blank" class="project-link" data-repo="${project.name}">View Repository</a>
      `;
  
      // Add click event listener
      const projectLink = card.querySelector('.project-link');
      projectLink.addEventListener('click', () => {
          incrementClickCount(project.name);
          card.querySelector('.click-count').textContent = `👁 ${repoStats.click_counts[project.name]}`;
      });
  
      return card;
  };
  
  // Enhanced initProfile function
  const initProfile = async () => {
      const projectsContainer = document.getElementById('projects-container');
      const username = 'aldenbernsteinn';
      let allProjects = [];
      let searchIndex = new Map(); // Pre-computed search index
  
      try {
          // Show loading state
          projectsContainer.innerHTML = `
              <div class="loading-state">
                  <div class="loader"></div>
                  <p>Loading repositories...</p>
              </div>
          `;
  
          // Load repo stats first
          await loadRepoStats();
  
          // Fetch and display projects
          allProjects = await fetchGitHubProjects(username);
  
          // Update last commit dates and build search index
          await Promise.all(allProjects.map(async (project) => {
              const lastCommitDate = await getLastCommitDate(project);
              repoStats.last_commits[project.name] = lastCommitDate.toISOString();
              
              // Build search index for each project
              const searchTerms = new Set([
                  ...(project.name || '').toLowerCase().split(/[-_\s]+/),
                  ...(project.description || '').toLowerCase().split(/\s+/),
                  (project.language || '').toLowerCase()
              ]);
              searchIndex.set(project, searchTerms);
          }));
          await saveRepoStats();
  
          // Optimized search function
          const matchesSearch = (project, searchTerm) => {
              if (!searchTerm) return true;
              const terms = searchIndex.get(project);
              return terms.has(searchTerm) || 
                     Array.from(terms).some(term => term.includes(searchTerm));
          };
  
          // Memoized sort function
          const getSortValue = (() => {
              const cache = new Map();
              
              return (project, sortMethod) => {
                  const cacheKey = `${project.name}-${sortMethod}`;
                  if (cache.has(cacheKey)) return cache.get(cacheKey);
                  
                  let value;
                  if (sortMethod === 'relevance') {
                      value = repoStats.click_counts[project.name] || 0;
                  } else { // newest
                      value = new Date(repoStats.last_commits[project.name] || 0).getTime();
                  }
                  
                  cache.set(cacheKey, value);
                  return value;
              };
          })();
  
          // Optimized filter and sort function
          const filterAndSortProjects = (() => {
              let lastSearchTerm = '';
              let lastSortMethod = '';
              let cachedResults = [];
  
              return (searchTerm = '', sortMethod = 'relevance') => {
                  searchTerm = searchTerm.toLowerCase();
                  
                  // Use cached results if nothing changed
                  if (searchTerm === lastSearchTerm && sortMethod === lastSortMethod) {
                      return;
                  }
  
                  // Filter projects
                  const filteredProjects = searchTerm ? 
                      allProjects.filter(project => matchesSearch(project, searchTerm)) :
                      allProjects;
  
                  // Sort projects
                  filteredProjects.sort((a, b) => {
                      if (searchTerm) {
                          // Prioritize exact language matches
                          const langA = (a.language || '').toLowerCase() === searchTerm;
                          const langB = (b.language || '').toLowerCase() === searchTerm;
                          if (langA !== langB) return langB - langA;
                      }
                      
                      return getSortValue(b, sortMethod) - getSortValue(a, sortMethod);
                  });
  
                  // Update cache
                  lastSearchTerm = searchTerm;
                  lastSortMethod = sortMethod;
                  cachedResults = filteredProjects;
  
                  // Render results with optimized DOM updates
                  const fragment = document.createDocumentFragment();
                  filteredProjects.forEach((project, index) => {
                      const card = createProjectCard(project);
                      card.style.animationDelay = `${index * 0.05}s`; // Reduced delay
                      card.style.opacity = '0';
                      card.style.animation = 'fadeInUp 0.3s ease forwards'; // Faster animation
                      fragment.appendChild(card);
                  });
  
                  projectsContainer.innerHTML = '';
                  projectsContainer.appendChild(fragment);
              };
          })();
  
          // Add sort event listener with throttling
          const sortSelect = document.getElementById('sort-select');
          sortSelect.addEventListener('change', (e) => {
              const searchBar = document.getElementById('project-search');
              filterAndSortProjects(searchBar.value, e.target.value);
          });
  
          // Add search functionality with optimized debounce
          const searchBar = document.getElementById('project-search');
          let searchTimeout;
          searchBar.addEventListener('input', (e) => {
              clearTimeout(searchTimeout);
              searchTimeout = setTimeout(() => {
                  filterAndSortProjects(e.target.value, sortSelect.value);
              }, 150); // Reduced debounce time
          });
  
          // Initial display
          filterAndSortProjects('', 'relevance');
      } catch (error) {
          projectsContainer.innerHTML = `
              <div class="error-state">
                  <h3>⚠️ Unable to load repositories</h3>
                  <p>Please try refreshing the page or check your connection.</p>
                  <p class="error-details">${error.message}</p>
              </div>
          `;
          console.error('Failed to initialize profile:', error);
      }
  };
  
  // Initialize when DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    initProfile();
    
    const dialog = document.getElementById('description-dialog');
    const seeMoreBtn = document.querySelector('.see-more-btn');
    const closeBtn = document.querySelector('.close-dialog');
    
    if (dialog && seeMoreBtn && closeBtn) {
      seeMoreBtn.addEventListener('click', () => {
        dialog.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      });
      
      closeBtn.addEventListener('click', () => {
        dialog.style.display = 'none';
        document.body.style.overflow = 'auto';
      });
      
      // Close dialog when clicking outside
      dialog.addEventListener('click', (e) => {
        if (e.target === dialog) {
          dialog.style.display = 'none';
          document.body.style.overflow = 'auto';
        }
      });
      
      // Close dialog on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && dialog.style.display === 'flex') {
          dialog.style.display = 'none';
          document.body.style.overflow = 'auto';
        }
      });
    }
  });
  
  // Add scroll animations
  window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(element => {
      const position = element.getBoundingClientRect();
      if (position.top < window.innerHeight) {
        element.classList.add('visible');
      }
    });
  });
  
  // Add these functions to your existing JavaScript
  let repoStats = null;
  
  function loadRepoStats() {
      const stats = localStorage.getItem('repoStats');
      if (stats) {
          repoStats = JSON.parse(stats);
      } else {
          repoStats = { click_counts: {}, last_commits: {} };
      }
  }
  
  function saveRepoStats() {
      localStorage.setItem('repoStats', JSON.stringify(repoStats));
  }
  
  async function getLastCommitDate(repo) {
      try {
          const response = await fetch(`https://api.github.com/repos/aldenbernsteinn/${repo.name}/commits`);
          const commits = await response.json();
          if (commits.length > 0) {
              return new Date(commits[0].commit.author.date);
          }
      } catch (error) {
          console.error(`Error fetching commits for ${repo.name}:`, error);
      }
      return new Date(0);
  }
  
  function incrementClickCount(repoName) {
      if (!repoStats.click_counts[repoName]) {
          repoStats.click_counts[repoName] = 0;
      }
      repoStats.click_counts[repoName]++;
      saveRepoStats();
  }
  
  // Helper function to format time since last commit
  function timeSince(date) {
      const seconds = Math.floor((new Date() - date) / 1000);
      
      let interval = seconds / 31536000; // years
      if (interval > 1) return Math.floor(interval) + "y";
      
      interval = seconds / 2592000; // months
      if (interval > 1) return Math.floor(interval) + "mo";
      
      interval = seconds / 86400; // days
      if (interval > 1) return Math.floor(interval) + "d";
      
      interval = seconds / 3600; // hours
      if (interval > 1) return Math.floor(interval) + "h";
      
      interval = seconds / 60; // minutes
      if (interval > 1) return Math.floor(interval) + "m";
      
      return Math.floor(seconds) + "s";
  }
