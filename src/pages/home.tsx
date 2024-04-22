import "./home.css";

import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import {
  DepartmentList,
  removeAllDepartments,
  selectDepartment,
} from "../features/department";
import { Footer, NavigationBar } from "../components/layout";
import {
  JobList,
  addJobList,
  removeAllJobLists,
  selectJobList,
} from "../features/job";
import {
  LocationList,
  removeAllLocations,
  selectLocation,
} from "../features/location";
import type { LocationModel, PostingModel } from "../features/postings";
import { useAppDispatch, useAppSelector } from "../app/hooks";

import type { SearchCriteria } from "../utils/search";
import { searchJobs } from "../utils/search";
import { useGetPostingsQuery } from "../features/postings";

export default function HomePage() {
  const locationState = useAppSelector(selectLocation);
  const departmentState = useAppSelector(selectDepartment);
  const jobListState = useAppSelector(selectJobList);

  const dispatch = useAppDispatch();

  const {
    data: posts,
    isError,
    isLoading,
    isSuccess,
  } = useGetPostingsQuery(10); // TODO add error and loding state

  const arrDept = [
    ...new Set(posts?.content.map((element) => element.department)),
  ];

  const uniqueLocations = (locations: LocationModel[]) => {
    const uniqueCities = new Set();
    return locations.filter((location) => {
      const city = location.city;
      if (!uniqueCities.has(city)) {
        uniqueCities.add(city);
        return true;
      }
      return false;
    });
  };

  const handleSearch = (
    jobs: PostingModel[],
    { location, department }: SearchCriteria,
  ) => {
    const searchResult = searchJobs(jobs, { location, department });
    dispatch(addJobList(searchResult));
  };

  const clearSearch = () => {
    dispatch(removeAllLocations());
    dispatch(removeAllDepartments());
    dispatch(removeAllJobLists());
  };

  if (isSuccess) {
    return (
      <>
        <NavigationBar />
        <Container className="p-3">
          <div className="search-container">
            <LocationList
              locations={uniqueLocations(
                posts?.content.map((element) => element.location),
              )}
              placeHolderText="Search Location"
              type="location"
              filterTags={locationState}
            />
            <DepartmentList
              departments={arrDept}
              placeHolderText={"Search Department"}
              type="department"
              filterTags={departmentState}
            />
            <Button
              style={{
                maxHeight: 40,
              }}
              data-testid="search-button"
              onClick={() =>
                handleSearch(posts.content, {
                  location: locationState,
                  department: departmentState,
                })
              }
            >
              Search
            </Button>
          </div>

          <Row style={{ margin: "20px 0px" }}>
            <Col sm={12}>
              {departmentState.length ||
              locationState.length ||
              jobListState.length ? (
                <Button onClick={() => clearSearch()}>Clear search</Button>
              ) : (
                <></>
              )}
            </Col>
          </Row>

          <div>
            {jobListState.length ? (
              <JobList
                jobLists={jobListState.flat()}
                data-testid="job-list-1"
              />
            ) : (
              <JobList jobLists={posts.content} data-testid="job-list-2" />
            )}
          </div>
        </Container>
        <Footer />
      </>
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
