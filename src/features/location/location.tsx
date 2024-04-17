import type { ChangeEvent, FC } from "react";
import { DropdownButton, Form, InputGroup, ListGroup, ListGroupItem } from "react-bootstrap";

import { Tag } from "../../components/tag";
import type { TagModel } from "../../components/tag";
import { addLocation } from "./locationSlice";
import type { location } from "../postings/postingsApiSlice";
import { useAppDispatch } from "../../app/hooks";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export interface LocationModel {
  locations: location[]; //TODO change to locationtype
  filterTags: location[];
  placeHolderText: string;
  type: TagModel["type"];
}

export const Location: FC<LocationModel> = ({
  locations,
  placeHolderText,
  filterTags,
  type
}) => {
  const [search, setSearch] = useState<string>("");
  const [suggestions, setSuggestions] = useState<location[]>([]);
  const dispatch = useAppDispatch();

  const onClickItem = (selectedLocation: location) => {
    const locationWithUUID: location = { ...selectedLocation, id: uuidv4() };
    setSearch("");
    dispatch(addLocation(locationWithUUID));
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const regex = new RegExp(`^${value}`, "i");
    const suggestions = value.length > 0 ? locations.filter(v => regex.test(v.city)).sort() : [];
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
            {locations.map(location => (
              <ListGroupItem
                key={location.city} // TODO change to location id
                className="search-list-group-item"
                onClick={() => onClickItem(location)}
              >
                {location.city}
              </ListGroupItem>
            ))}
          </ListGroup>
        </DropdownButton>
      </InputGroup>
      {search.length > 1 && suggestions.length > 0 && (
        <ListGroup>
          {suggestions.map(suggestion => (
            <ListGroupItem
              key={suggestion.city}
              onClick={() => onClickItem(suggestion)}
            >
              {suggestion.city}
            </ListGroupItem>
          ))}
        </ListGroup>
      )}
      <Tag badges={filterTags} type={type} />
    </div>
  );
};