import useUsersQuery from "../queries/userUsersQuery";

const Home = () => {
  const { data, isLoading } = useUsersQuery("andihaki");
  const users = data?.items || [];
  if (!users.length && !isLoading) {
    return <div>No users found</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 16,
      }}
    >
      {users.map((user) => (
        <div key={user.id} style={{ minWidth: 142 }}>
          <h2>{user.login}</h2>
          <a href={user.html_url} target="_blank" rel="noopener noreferrer">
            <img src={user.avatar_url} alt={user.login} width="50" />
            <div>View Profile</div>
          </a>
        </div>
      ))}
    </div>
  );
};

export default Home;
