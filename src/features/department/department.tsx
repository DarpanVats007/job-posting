import {
  DropdownButton,
  Form,
  InputGroup,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap"

import { useState, type FC } from "react"
import { useAppDispatch } from "../../app/hooks"
import { addDepartment } from "./departmentSlice"
import type { department } from "../postings/postingsApiSlice"
import { Tag } from "../../components/tag"

export type DepartmentModel = {
  departments: string[] //TODO change to department type
  filterTags: department["label"][]
  placeHolderText: string
  type: string
}

export const Department: FC<DepartmentModel> = ({ 
  departments, 
  placeHolderText,
  filterTags,
  type 
}) => {
  const [search, setSearch] = useState("")
  const [suggestions, setsugesstions] = useState<
    department["label"][] | undefined
  >()

  const dispatch = useAppDispatch()

  const onClickItem = (department: department["label"]) => {
    setSearch("")
    console.log(department)
    dispatch(addDepartment(department))
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    let suggestions: string[] = []
    if (value!.length > 0) {
      const regex = new RegExp(`^${value}`, "i")
      suggestions = departments.sort().filter(v => regex.test(v))
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
            {departments.map(department => (
              <ListGroupItem
                key={department} // TODO change to department id
                className="search-list-group-item"
                onClick={() => onClickItem(department)}
              >
                {department}
              </ListGroupItem>
            ))}
          </ListGroup>
        </DropdownButton>
      </InputGroup>
      {suggestions && (
        <ListGroup>
          {suggestions.map(department => (
            <ListGroupItem
              key={department}
              // action
              // variant="light"
              onClick={() => onClickItem(department)}
            >
              {department}
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
