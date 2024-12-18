import requests
import json
from datetime import datetime
import os

def fetch_last_commit_date(username, repo_name, headers):
    """Fetch the date of the last commit for a repository."""
    url = f"https://api.github.com/repos/{username}/{repo_name}/commits"
    response = requests.get(url, headers=headers)
    if response.ok and response.json():
        return response.json()[0]['commit']['committer']['date']
    return None

def fetch_github_projects(username):
    url = f"https://api.github.com/users/{username}/repos?per_page=100&type=public"
    headers = {}
    
    # Use GitHub token if available
    if 'GITHUB_TOKEN' in os.environ:
        headers['Authorization'] = f"token {os.environ['GITHUB_TOKEN']}"
    
    response = requests.get(url, headers=headers)
    if response.ok:
        repos = response.json()
        projects = []
        for repo in repos:
            # Fetch last commit date for each repository
            last_commit_date = fetch_last_commit_date(username, repo["name"], headers)
            
            projects.append({
                "name": repo["name"],
                "description": repo["description"] or "No description available",
                "language": repo["language"] or "N/A",
                "html_url": repo["html_url"],
                "last_commit": last_commit_date,  # Add last commit date
                "topics": repo["topics"],
                "stargazers_count": repo["stargazers_count"]
            })
        return projects
    else:
        raise Exception(f"Failed to fetch repos: {response.status_code}")

def main():
    username = "aldenbernsteinn"
    projects = fetch_github_projects(username)
    
    # Ensure the static directory exists
    os.makedirs("docs/static", exist_ok=True)
    
    # Save to static file
    with open("docs/static/projects_static.json", "w", encoding='utf-8') as f:
        json.dump(projects, f, indent=2)
    
    print(f"Successfully generated projects_static.json with {len(projects)} repositories")

if __name__ == "__main__":
    main() 
