import { Card } from "react-bootstrap";
import type { FC } from "react";
import type { PostingModel } from "../postings/postings-api-slice";
import { useNavigate } from "react-router-dom";

export type JobListModel = {
  jobLists: PostingModel[];
};

export const JobList: FC<JobListModel> = ({ jobLists }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        margin: "20px 0px",
      }}
    >
      {jobLists?.map((jobList) => (
        <Card
          key={jobList.id}
          onClick={() =>
            navigate(`/job-posting/${jobList.id}`, {
              replace: true,
              state: jobList.id,
            })
          }
          data-testid="navigate-to-posting"
          style={{
            margin: "10px 0px",
            textAlign: "left",
          }}
        >
          <Card.Header as="h5" data-testid="job-list-posting-name">
            {jobList.name}
          </Card.Header>
          <Card.Body>
            <Card.Title data-testid="job-list-posting-location">
              {jobList.location.city}, {jobList.department.label}
            </Card.Title>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};
