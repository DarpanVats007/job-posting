import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import type { Posting, location } from "../features/postings/postingsApiSlice";
import { addJob, removeAllJobs, selectJob } from "../features/job/jobSlice";
import { removeAllDepartments, selectDepartment } from "../features/department/departmentSlice";
import { removeAllLocations, selectLocation } from "../features/location/locationSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

import { Department } from "../features/department/department";
import { Job } from "../features/job/job";
import { Location } from "../features/location/location";
import type { SearchCriteria } from "../utils/search";
import { searchJobs } from "../utils/search";
import { useGetPostingsQuery } from "../features/postings/postingsApiSlice";

export default function HomePage() {
  const locationState = useAppSelector(selectLocation);
  const departmentState = useAppSelector(selectDepartment);
  const jobsState = useAppSelector(selectJob);

  const dispatch = useAppDispatch();

  const { data: posts, isError, isLoading, isSuccess } = useGetPostingsQuery(10);

  const arrDept = [...new Set(posts?.content.map((element) => element.department))];

  const uniqueLocations = (locations: location[]) => {
    const uniqueCities = new Set();
    return locations.filter(location => {
      const city = location.city;
      if (!uniqueCities.has(city)) {
        uniqueCities.add(city);
        return true;
      }
      return false;
    });
  };

  const handleSearch = (jobs: Posting[], { location, department }: SearchCriteria) => {
    const searchResult = searchJobs(jobs, { location, department });
    dispatch(addJob(searchResult));
  };

  const clearSearch = () => {
    dispatch(removeAllLocations());
    dispatch(removeAllDepartments());
    dispatch(removeAllJobs());
  };

  if (isSuccess) {
    return (
      <Container className="p-3">
        <Row style={{ margin: "10px 0px" }}>
          <Col sm={5} className="d-flex justify-content-center">
            <Location
              locations={uniqueLocations(posts?.content.map(element => element.location))}
              placeHolderText="Search Location"
              type="location"
              filterTags={locationState}
            />
          </Col>
          <Col sm={5} className="d-flex justify-content-center">
            <Department
              departments={arrDept}
              placeHolderText={"Search Department"}
              type="department"
              filterTags={departmentState}
            />
          </Col>
          <Col sm={2} style={{ textAlign: "right" }}>
            <Button
              onClick={() =>
                handleSearch(posts.content, {
                  location: locationState,
                  department: departmentState,
                })
              }
            >
              Search
            </Button>
          </Col>
        </Row>

        <Row style={{ margin: "20px 0px" }}>
          <Col sm={12}>
            {departmentState.length || locationState.length || jobsState.length ? (
              <Button onClick={() => clearSearch()}>Clear search</Button>
            ) : (
              <></>
            )}
          </Col>
        </Row>

        <div>{jobsState.length ? <Job jobs={jobsState.flat()} /> : <Job jobs={posts.content} />}</div>
      </Container>
    );
  }

  // Loading state
  return (
    <div className="loading">
      <Spinner animation="border" variant="primary" />
      <h1>Loading...</h1>
    </div>
  );
}
