import React, { useEffect, useState } from "react";

const App = () => {
  const [user, setUser] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [profile, setProfile] = useState({});
  const [followers, setFollowers] = useState([]);
  const [repos, setRepos] = useState([]);

  const getFollowers = async () => {
    const response = await fetch(
      `https://api.github.com/users/${profile.login}/followers`,
    );
    const data = await response.json();
    await setFollowers(data);
  };

  const getRepos = async () => {
    const response = await fetch(
      `https://api.github.com/users/${profile.login}/repos`,
    );

    const data = await response.json();
    setRepos(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${searchUser}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
            },
          },
        );
        const data = await response.json();
        setProfile(data);
        setFollowers([]);
        setRepos([]);
      } catch (err) {
        console.log(err);
      }
    };
    if (searchUser) {
      fetchData();
    }
  }, [searchUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchUser(user);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        GitHub Profile Finder
      </h1>

      <form onSubmit={handleSubmit} className="flex gap-3 mb-8">
        <input
          type="text"
          id="user"
          value={user}
          placeholder="Enter GitHub username"
          onChange={(e) => setUser(e.target.value)}
          className="px-4 py-2 border rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Search
        </button>
      </form>

      {profile.status && (
        <h1 className="text-red-500 text-2xl font-semibold">User Not Found</h1>
      )}

      {profile.id && (
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl">
          <div className="flex flex-col items-center">
            <img
              src={profile.avatar_url}
              alt="avatar"
              className="w-40 h-40 rounded-full border-4 border-blue-500"
            />

            <h2 className="text-3xl font-bold mt-4">{profile.name}</h2>

            <p className="text-gray-500">@{profile.login}</p>

            <a
              href={profile.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 bg-black text-white px-4 py-2 rounded-lg no-underline hover:bg-gray-800"
            >
              View Profile
            </a>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold">Account Type</h3>
              <p>{profile.type}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold">View Type</h3>
              <p>{profile.user_view_type || "N/A"}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold">Followers</h3>
              <p>{profile.followers}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold">Following</h3>
              <p>{profile.following}</p>
            </div>
          </div>

          <div className="mt-6 bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold">Created At</h3>
            <p>
              {new Date(profile.created_at).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          <div className="mt-4 bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold">Last Updated</h3>
            <p>
              {new Date(profile.updated_at).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={getFollowers}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Show Followers
            </button>

            <button
              onClick={getRepos}
              className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
            >
              Show Repositories
            </button>
          </div>
        </div>
      )}

      {followers.length > 0 && (
        <div className="mt-8 w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">Followers</h2>

          {followers.map((follower) => (
            <div
              key={follower.id}
              className="flex items-center gap-4 bg-white p-4 rounded-lg shadow mb-3"
            >
              <img
                src={follower.avatar_url}
                alt={follower.login}
                className="w-12 h-12 rounded-full"
              />

              <div>
                <h3 className="font-semibold">{follower.login}</h3>

                <a
                  href={follower.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  View Profile
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {repos.length > 0 && (
        <div className="mt-8 w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">Repositories</h2>

          {repos.map((repo) => (
            <div key={repo.id} className="bg-white p-4 rounded-lg shadow mb-3">
              <h3 className="font-bold text-lg">{repo.name}</h3>

              <p className="text-gray-600">
                {repo.description || "No description"}
              </p>

              <div className="flex gap-4 mt-2">
                <span>⭐ {repo.stargazers_count}</span>

                <span>🍴 {repo.forks_count}</span>

                <span>{repo.language}</span>
              </div>

              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 mt-2 inline-block"
              >
                Open Repository
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
