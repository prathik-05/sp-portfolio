export interface GitHubStats {
  publicRepos: number;
  followers: number;
  following: number;
  publicGists: number;
  totalStars: number;
  avatarUrl: string;
  bio: string;
  updatedAt: string;
}

export async function getGitHubStats(): Promise<GitHubStats> {
  const defaultStats: GitHubStats = {
    publicRepos: 12,
    followers: 15,
    following: 10,
    publicGists: 0,
    totalStars: 28,
    avatarUrl: "https://github.com/prathik-05.png",
    bio: "AI Systems & Computer Vision Developer",
    updatedAt: new Date().toISOString()
  };

  try {
    const userRes = await fetch("https://api.github.com/users/prathik-05", {
      next: { revalidate: 3600 }
    });
    if (!userRes.ok) return defaultStats;

    const userData = await userRes.json();

    const reposRes = await fetch("https://api.github.com/users/prathik-05/repos?per_page=100", {
      next: { revalidate: 3600 }
    });

    let totalStars = 0;
    if (reposRes.ok) {
      const repos = await reposRes.json();
      if (Array.isArray(repos)) {
        totalStars = repos.reduce((acc: number, repo: { stargazers_count?: number }) => acc + (repo.stargazers_count || 0), 0);
      }
    }

    return {
      publicRepos: userData.public_repos || defaultStats.publicRepos,
      followers: userData.followers || defaultStats.followers,
      following: userData.following || defaultStats.following,
      publicGists: userData.public_gists || 0,
      totalStars: totalStars || defaultStats.totalStars,
      avatarUrl: userData.avatar_url || defaultStats.avatarUrl,
      bio: userData.bio || defaultStats.bio,
      updatedAt: userData.updated_at || defaultStats.updatedAt
    };
  } catch {
    return defaultStats;
  }
}
