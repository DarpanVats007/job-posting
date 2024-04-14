import { type FC } from "react"
import { Location } from "../features/location/location"
import { Postings } from "../features/postings/Postings"
import { useGetPostingsQuery } from "../features/postings/postingsApiSlice"
import { Container, Nav, Navbar } from "react-bootstrap"
//   import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { useAppSelector } from "../app/hooks"
import { selectLocation } from "../features/location/locationSlice"
import { Department } from "../features/department/department"
import { selectDepartment } from "../features/department/departmentSlice"
//   import type { location } from "../postings/postingsApiSlice";

export type HomePageModel = {}

export const HomePage: FC<HomePageModel> = () => {
  const { data, isSuccess } = useGetPostingsQuery(10)

  const location = useAppSelector(selectLocation) // TODO check to make multiple reducers
  const department = useAppSelector(selectDepartment) // TODO check to make multiple reducers

  //TODO think of something to make dept available dierctly
  let arr: string[] = []
  data?.content.forEach(element => {
    arr.push(element.location.city)
  })

  const arrLocation = arr.filter(
    (value, index, self) => self.indexOf(value) === index,
  )

  let arr2: string[] = []
  data?.content.forEach(element => {
    arr2.push(element.department.label)
  })

  const arrDept = arr2.filter(
    (value, index, self) => self.indexOf(value) === index,
  )

  if (isSuccess) {
    return (
      <>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Navbar expand="lg" className="bg-body-tertiary"></Navbar>
        <Container
          style={{
            padding: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <Location
              locations={arrLocation}
              placeHolderText="Search by location"
              type="location"
              filterTags={location}
            />
            <Department
              departments={arrDept}
              placeHolderText="Search by Dept."
              type="department"
              filterTags={department}
            />
          </div>
          <Postings />
        </Container>
      </>
    )
  }
}
