const loginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  handleLogin,
}) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username"></label>
          <input
            type="text"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            id="username"
            name="username"
          />
        </div>

        <div>
          <label htmlFor="password"></label>
          <input
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            id="password"
            name="password"
          />

          <button type="submit">login</button>
        </div>
      </form>
    </div>
  );
};

export default loginForm;
