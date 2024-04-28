import "react-loading-skeleton/dist/skeleton.css";

import { Card } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";

export const JobDetailCardSkeleton = () => (
  <Card style={{ padding: "10px", margin: "10px" }}>
    <Card.Header></Card.Header>
    <Card.Body>
      <Card.Title>
        {" "}
        <Skeleton />
      </Card.Title>
      <Card.Subtitle className="mb-2 text-muted">
        <Skeleton />
      </Card.Subtitle>
      <Card.Title>
        <Skeleton />
      </Card.Title>
      <Card.Text>
        <Skeleton count={5} />
      </Card.Text>
    </Card.Body>
  </Card>
);
