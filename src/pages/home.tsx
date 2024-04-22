import "./home.css";

import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import {
  DepartmentList,
  removeAllDepartments,
  selectDepartment,
} from "../features/department";
import type {
  DepartmentModel,
  LocationModel,
  PostingModel,
} from "../features/postings";
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
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useEffect, useState } from "react";

import type { FC } from "react";
import type { SearchCriteria } from "../utils/search";
import { searchJobs } from "../utils/search";
import { uniqueFilter } from "../utils/unique-array";
import { useGetPostingsQuery } from "../features/postings";

export const HomePage: FC = () => {
  const [locations, setLocations] = useState<LocationModel[]>([]);
  const [departments, setDepartments] = useState<DepartmentModel[]>([]);
  const locationState = useAppSelector(selectLocation);
  const departmentState = useAppSelector(selectDepartment);
  const jobListState = useAppSelector(selectJobList);

  const dispatch = useAppDispatch();

  const {
    data: posts,
    isError,
    isLoading,
    isSuccess,
  } = useGetPostingsQuery(10); // TODO add error and loading state

  useEffect(() => {
    if (isSuccess && posts) {
      setLocations(
        uniqueFilter(
          posts.content.map((element) => element.location),
          "city",
        ),
      );
      setDepartments(
        uniqueFilter(
          posts.content.map((element) => element.department),
          "label",
        ),
      );
    }
  }, [isSuccess, posts]);

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

  if (isLoading) {
    // Loading state
    return (
      <div className="loading">
        <Spinner animation="border" variant="primary" />
        <h1>Loading...</h1>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <>
        <NavigationBar />
        <Container className="p-3">
          <div className="search-container">
            <LocationList
              locations={locations}
              placeHolderText="Search Location"
              type="location"
              filterTags={locationState}
            />
            <DepartmentList
              departments={departments}
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

  // Handle error state
  return <div>Error occurred...</div>;
};
