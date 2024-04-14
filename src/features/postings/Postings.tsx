import { Button, Card } from "react-bootstrap"

import { useGetPostingsQuery } from "./postingsApiSlice"
import { useState } from "react"

const options = [5, 10, 20, 30]

export const Postings = () => {
  const [numberOfPostings, setNumberOfnumberOfPostings] = useState(10)
  // Using a query hook automatically fetches data and returns query values
  const { data, isError, isLoading, isSuccess } =
    useGetPostingsQuery(numberOfPostings)

  if (isError) {
    return (
      <div>
        <h1>There was an error!!!</h1>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div>
        <select
          value={numberOfPostings}
          onChange={e => {
            setNumberOfnumberOfPostings(Number(e.target.value))
          }}
        >
          {options.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {data.content &&
          data.content.map(({ name, department, id, location }) => (
            <Card
              key={id}
              style={{
                textAlign: "left",
                marginBottom: 20,
                // TODO add margin and padding to page
              }}
              onClick={
                () => {}
                //   listingDescription(u.id, u.customField[1].valueLabel)
              }
            >
              <Card.Header>{name}</Card.Header>
              <Card.Body>
                <Card.Title> {location.city}</Card.Title>
                <Card.Text>{department.label}</Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
            // <Card
            //   key={id}
            //   onClick={
            //     () => {}
            //     //   listingDescription(u.id, u.customField[1].valueLabel)
            //   }
            //   data-test="posting"
            // >
            //   <Card.Header as="h5" data-test="posting-name">
            //     {name}
            //   </Card.Header>
            //   <Card.Body>
            //     <Card.Title data-test="posting-location">
            //       { location.city}
            //       {department.label}
            //     </Card.Title>
            //   </Card.Body>
            // </Card>
          ))}
      </div>
    )
  }

  return null
}
