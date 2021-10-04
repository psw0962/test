import { useQuery, useMutation } from "react-query";

const fetchUsers = async () => {
  try {
    return await (await fetch("https://reqres.in/api/users")).json();
  } catch (err) {
    throw new Error(err);
  }
};

const addUser = async (user) => {
  try {
    return await (
      await fetch("https://reqres.in/api/users", {
        method: "POST",
        body: JSON.stringify({
          first_name: user.first_name,
          last_name: user.last_name,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
    ).json();
  } catch (err) {
    throw new Error(err);
  }
};

function App() {
  // Call all users
  const { data: users, isLoading, isFetching, error } = useQuery("users", fetchUsers);

  // Create a Mutation for adding user
  // const {mutate, mutateAsync, isLoading: isAddingUser, error: addError} = useMutation(addUser, {
  //   onSuccess:
  // })

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
