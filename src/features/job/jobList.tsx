import { Card } from "react-bootstrap";
import type { FC } from "react";
import type { PostingModel } from "../postings/postingsApiSlice";
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
            navigate(`/${jobList.id}`, {
              replace: true,
              state: jobList.id,
            })
          }
          data-test="posting"
          style={{
            margin: "10px 0px",
            textAlign: "left",
          }}
        >
          <Card.Header as="h5" data-test="posting-name">
            {jobList.name}
          </Card.Header>
          <Card.Body>
            <Card.Title data-test="posting-location">
              {jobList.location.city}, {jobList.department.label}
            </Card.Title>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};
