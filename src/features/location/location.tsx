import {
  DropdownButton,
  Form,
  InputGroup,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap"

import { useState, type FC } from "react"
import { useAppDispatch } from "../../app/hooks"
import { addLocation } from "./locationSlice"
import type { location } from "../postings/postingsApiSlice"
import { Tag } from "../../components/tag"

export type LocationModel = {
  locations: string[] //TODO change to locationtype
  filterTags: location["city"][]
  placeHolderText: string
  type: string
}

export const Location: FC<LocationModel> = ({ 
  locations, 
  placeHolderText,
  filterTags,
  type 
}) => {
  const [search, setSearch] = useState("")
  const [suggestions, setsugesstions] = useState<
    location["city"][] | undefined
  >()

  const dispatch = useAppDispatch()

  const onClickItem = (location: location["city"]) => {
    setSearch("")
    console.log(location)
    dispatch(addLocation(location))
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    let suggestions: string[] = []
    if (value!.length > 0) {
      const regex = new RegExp(`^${value}`, "i")
      suggestions = locations.sort().filter(v => regex.test(v))
    }

    setsugesstions(suggestions)
    setSearch(e.target.value)
  }

  return (
    <div
    style={{
      maxWidth: 400,
    }}>
      <InputGroup
      style={{
        width: "100%"
      }}>
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
        <DropdownButton
          // as={InputGroup.Append}
          id="input-group-dropdown-2"
          title=""
        >
          <ListGroup className="search-list-group">
            {locations.map(location => (
              <ListGroupItem
                key={location} // TODO change to location id
                className="search-list-group-item"
                onClick={() => onClickItem(location)}
              >
                {location}
              </ListGroupItem>
            ))}
          </ListGroup>
        </DropdownButton>
      </InputGroup>
      {suggestions && (
        <ListGroup>
          {suggestions.map(location => (
            <ListGroupItem
              key={location}
              // action
              // variant="light"
              onClick={() => onClickItem(location)}
            >
              {location}
            </ListGroupItem>
          ))}
        </ListGroup>
      )}

     <Tag 
        badges={filterTags} 
        type = {type} // TODO check type use 
      />
    </div>
  )
}
