import type { ChangeEvent, FC } from "react";
import {
  Container,
  DropdownButton,
  Form,
  InputGroup,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import type { DepartmentModel, LocationModel } from "../../features/postings";

import { Tag } from "../tag";
import type { TagModel } from "../tag";
import { useState } from "react";

export type SearchModel<T> = {
  items: T[];
  placeHolderText: string;
  onSearchChange: (value: string) => void;
  onClickItem: (item: T) => void;
  renderItem: (item: T) => React.ReactNode;
  filterTags: TagModel["badges"];
  type: TagModel["type"];
};

export const Search = <T extends LocationModel | DepartmentModel>({
  items,
  placeHolderText,
  onSearchChange,
  onClickItem,
  renderItem,
  filterTags,
  type,
}: SearchModel<T>) => {
  const [search, setSearch] = useState<string>("");
  const [suggestions, setSuggestions] = useState<T[]>([]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const regex = new RegExp(`^${value}`, "i");
    const suggestions =
      value.length > 0
        ? items.filter((v) => regex.test(renderItem(v)!.toString()))
        : [];
    setSuggestions(suggestions);
    setSearch(value);
    onSearchChange(value);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container
        style={{
          display: "flex",
          flexDirection: "row",
          margin: 0,
          padding: 0,
        }}
      >
        <Form
          style={{
            minWidth: 300,
          }}
        >
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Control
              type="search"
              placeholder={placeHolderText}
              value={search}
              onChange={handleSearchChange}
            />
          </Form.Group>
        </Form>
        <InputGroup>
          <DropdownButton id="input-group-dropdown-2" title="">
            <ListGroup className="search-list-group">
              {items.map((item, index) => (
                <ListGroupItem
                  key={index}
                  className="search-list-group-item"
                  onClick={() => onClickItem(item)}
                >
                  {renderItem(item)}
                </ListGroupItem>
              ))}
            </ListGroup>
          </DropdownButton>
        </InputGroup>
      </Container>
      <ListGroup
        style={{
          maxWidth: 300,
        }}
      >
        {suggestions.map((item, index) => (
          <ListGroupItem key={index} onClick={() => onClickItem(item)}>
            {renderItem(item)}
          </ListGroupItem>
        ))}
      </ListGroup>
      <Tag badges={filterTags} type={type} />
    </div>
  );
};
