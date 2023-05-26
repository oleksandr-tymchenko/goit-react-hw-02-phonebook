export default function Filter({ value, onSearch }) {
  return (
    <label htmlFor="filter">
      Find contacts by name
      <input type="text" value={value} onChange={onSearch} />
      {/* <ErrorMessage name="name" component="div" /> */}
    </label>
  );
}
