import requests
import json
from datetime import datetime
import os
import base64

def get_languages_from_repo(username, repo_name, headers):
    """Analyze repository contents to detect languages used."""
    languages = set()
    
    try:
        # Get repository contents
        contents_url = f"https://api.github.com/repos/{username}/{repo_name}/git/trees/main?recursive=1"
        response = requests.get(contents_url, headers=headers)
        
        if response.status_code == 404:  # Try 'master' if 'main' doesn't exist
            contents_url = f"https://api.github.com/repos/{username}/{repo_name}/git/trees/master?recursive=1"
            response = requests.get(contents_url, headers=headers)
            
        if response.ok:
            tree = response.json().get('tree', [])
            
            # Define file extensions and their corresponding languages
            extension_to_language = {
                '.py': 'Python',
                '.js': 'JavaScript',
                '.html': 'HTML',
                '.css': 'CSS',
                '.java': 'Java',
                '.cpp': 'C++',
                '.c': 'C',
                '.hpp': 'C++',
                '.h': 'C/C++',
                '.rs': 'Rust',
                '.go': 'Go',
                '.rb': 'Ruby',
                '.php': 'PHP',
                '.swift': 'Swift',
                '.kt': 'Kotlin',
                '.ts': 'TypeScript',
                '.jsx': 'React',
                '.tsx': 'React/TypeScript',
                '.vue': 'Vue',
                '.sql': 'SQL',
                '.r': 'R',
                '.scala': 'Scala',
                '.m': 'Objective-C',
                '.sh': 'Shell',
                '.pl': 'Perl',
                '.ex': 'Elixir',
                '.cs': 'C#',
                '.fs': 'F#',
                '.dart': 'Dart',
                '.lua': 'Lua',
                '.jl': 'Julia',
                '.hs': 'Haskell',
                '.yml': 'YAML',
                '.yaml': 'YAML',
                '.json': 'JSON',
                '.xml': 'XML',
                '.ipynb': 'Jupyter Notebook'
            }
            
            # Analyze each file in the repository
            for item in tree:
                if item['type'] == 'blob':  # It's a file
                    file_path = item['path'].lower()
                    # Check file extension
                    for ext, lang in extension_to_language.items():
                        if file_path.endswith(ext):
                            languages.add(lang)
                            break
                    
                    # Special cases for files without extensions
                    if 'dockerfile' in file_path:
                        languages.add('Docker')
                    elif 'makefile' in file_path:
                        languages.add('Make')
                    
            # Check for special files indicating frameworks/tools
            file_paths = [item['path'].lower() for item in tree]
            if any('requirements.txt' in path for path in file_paths):
                languages.add('Python/pip')
            if any('package.json' in path for path in file_paths):
                languages.add('Node.js')
            if any('composer.json' in path for path in file_paths):
                languages.add('PHP/Composer')
            if any('gemfile' in path for path in file_paths):
                languages.add('Ruby/Bundler')
            if any('cargo.toml' in path for path in file_paths):
                languages.add('Rust/Cargo')
            
    except Exception as e:
        print(f"Error analyzing languages for {repo_name}: {e}")
    
    return sorted(list(languages))

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
            projects.append({
                "name": repo["name"],
                "description": repo["description"] or "No description available",
                "language": repo["language"] or "N/A",
                "html_url": repo["html_url"],
                "updated_at": repo["updated_at"],
                "created_at": repo["created_at"],
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
