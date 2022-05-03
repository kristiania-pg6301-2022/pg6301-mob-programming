export default function Profile({ user }) {
  return (
    <div>
      <h1>Profile</h1>
      <h1>
        {user.name} ({user.email})
      </h1>
      <pre>{JSON.stringify(user, undefined, "  ")}</pre>
    </div>
  );
}
