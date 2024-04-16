import { Button, Card } from "react-bootstrap"

import { useGetPostingsQuery } from "./postingsApiSlice"

export const Postings = () => {
  const { data, isError, isLoading, isSuccess } =
    useGetPostingsQuery(10)

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
          ))}
      </div>
    )
  }

  return null
}
