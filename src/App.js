import { useQuery } from "react-query";

const fetchUsers = async () => {
  try {
    return await (await fetch("https://reqres.in/api/users")).json();
  } catch (err) {
    throw new Error(err);
  }
};

function App() {
  const { data: users, isLoading, isFetching, error } = useQuery("users", fetchUsers);
  console.log(users);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong</p>;
  }

  return (
    <div>
      {users.data.map((user) => (
        <p key={user.id}>
          {user.first_name} {user.last_name}
        </p>
      ))}
    </div>
  );
}

export default App;
