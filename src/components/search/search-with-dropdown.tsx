import type { ChangeEvent, FC } from "react";
import {
  Container,
  DropdownButton,
  Form,
  InputGroup,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";

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

export const Search: FC<SearchModel<any>> = ({
  items,
  placeHolderText,
  onSearchChange,
  onClickItem,
  renderItem,
  filterTags,
  type,
}) => {
  const [search, setSearch] = useState<string>("");
  const [suggestions, setSuggestions] = useState<any[]>([]);

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
          <ListGroup>
            {suggestions.map((item, index) => (
              <ListGroupItem key={index} onClick={() => onClickItem(item)}>
                {renderItem(item)}
              </ListGroupItem>
            ))}
          </ListGroup>
        </InputGroup>
      </Container>
      <Tag badges={filterTags} type={type} />
    </div>
  );
};
