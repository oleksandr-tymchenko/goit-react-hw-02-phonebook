import { FilterCont, Input } from './Filter.styled';

export default function Filter({ value, onSearch }) {
  return (
    <FilterCont>
      <label htmlFor="filter">Find contacts by name</label>

      <Input
        type="text"
        value={value}
        onChange={onSearch}
        placeholder="Jacob Mercer"
      />
      {/* <ErrorMessage name="name" component="div" /> */}
    </FilterCont>
  );
}
