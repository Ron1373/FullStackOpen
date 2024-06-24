const Filter = ({ data, handleChange }) => (
  <p>
    filter shown with
    <input value={data} onChange={handleChange}></input>
  </p>
);
export default Filter;
