import "react-loading-skeleton/dist/skeleton.css";

import { Card } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";

export const JobListCardSkeleton = () => (
  <Card
    style={{
      margin: "10px 0px",
      textAlign: "left",
    }}
  >
    <Card.Header as="h5">
      <Skeleton />
    </Card.Header>
    <Card.Body>
      <Card.Title data-testid="job-list-posting-location">
        <Skeleton /> <Skeleton />
      </Card.Title>
    </Card.Body>
  </Card>
);
