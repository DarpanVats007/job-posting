import type { ChangeEvent, FC } from "react";
import {
  Container,
  DropdownButton,
  Form,
  InputGroup,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";

import type { LocationModel } from "../postings/postingsApiSlice";
import { Tag } from "../../components/tag";
import type { TagModel } from "../../components/tag";
import { addLocation } from "./locationSlice";
import { useAppDispatch } from "../../app/hooks";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export type LocationListModel = {
  locations: LocationModel[]; //TODO change to locationtype
  filterTags: LocationModel[];
  placeHolderText: string;
  type: TagModel["type"];
};

export const LocationList: FC<LocationListModel> = ({
  locations,
  placeHolderText,
  filterTags,
  type,
}) => {
  const [search, setSearch] = useState<string>("");
  const [suggestions, setSuggestions] = useState<LocationModel[]>([]);
  const dispatch = useAppDispatch();

  const onClickItem = (selectedLocation: LocationModel) => {
    const locationWithUUID: LocationModel = {
      ...selectedLocation,
      id: uuidv4(),
    };
    setSearch("");
    dispatch(addLocation(locationWithUUID));
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const regex = new RegExp(`^${value}`, "i");
    const suggestions =
      value.length > 0
        ? locations.filter((v) => regex.test(v.city)).sort()
        : [];
    setSuggestions(suggestions);
    setSearch(value);
  };

  return (
    <Container>
      <InputGroup className="w-100">
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
            {locations.map((location) => (
              <ListGroupItem
                key={location.id}
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
          {suggestions.map((suggestion) => (
            <ListGroupItem
              key={suggestion.id}
              onClick={() => onClickItem(suggestion)}
            >
              {suggestion.city}
            </ListGroupItem>
          ))}
        </ListGroup>
      )}
      <Tag badges={filterTags} type={type} />
    </Container>
  );
};
