import type { ChangeEvent, FC } from "react";
import { DropdownButton, Form, InputGroup, ListGroup, ListGroupItem } from "react-bootstrap";

import { Tag } from "../../components/tag";
import type { TagModel } from "../../components/tag";
import { addDepartment } from "./departmentSlice";
import type { department } from "../postings/postingsApiSlice";
import { useAppDispatch } from "../../app/hooks";
import { useState } from "react";

export interface DepartmentModel {
  departments: department[]; //TODO change to department type
  filterTags: department[];
  placeHolderText: string;
  type: TagModel["type"];
}

export const Department: FC<DepartmentModel> = ({
  departments,
  placeHolderText,
  filterTags,
  type
}) => {
  const [search, setSearch] = useState<string>("");
  const [suggestions, setSuggestions] = useState<department[]>([]);
  const dispatch = useAppDispatch();

  const onClickItem = (selectedDepartment: department) => {
    setSearch("");
    dispatch(addDepartment(selectedDepartment));
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const regex = new RegExp(`^${value}`, "i");
    const suggestions = value.length > 0 ? departments.filter(v => regex.test(v.label)).sort() : [];
    setSuggestions(suggestions);
    setSearch(value);
  };

  return (
    <div style={{ maxWidth: 400 }}>
      <InputGroup style={{ width: "100%" }}>
        <Form>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Control
              type="search"
              placeholder={placeHolderText}
              value={search}
              onChange={handleSearchChange}
            />
          </Form.Group>
        </Form>
        <DropdownButton id="input-group-dropdown-2" title="">
          <ListGroup className="search-list-group">
            {departments.map(department => (
              <ListGroupItem
                key={department.id} // TODO change to department id
                className="search-list-group-item"
                onClick={() => onClickItem(department)}
              >
                {department.label}
              </ListGroupItem>
            ))}
          </ListGroup>
        </DropdownButton>
      </InputGroup>
      {search.length > 1 && suggestions.length > 0 && (
        <ListGroup>
          {suggestions.map(suggestion => (
            <ListGroupItem
              key={suggestion.id}
              onClick={() => onClickItem(suggestion)}
            >
              {suggestion.label}
            </ListGroupItem>
          ))}
        </ListGroup>
      )}
      <Tag badges={filterTags} type={type} />
    </div>
  );
};