const CountryFinder = ({ searchString, findCountries, handleChange }) => {
  return (
    <>
      <form onSubmit={findCountries}>
        <label>
          find countries{" "}
          <input value={searchString} onChange={handleChange}></input>
        </label>
      </form>
    </>
  );
};
export default CountryFinder;
