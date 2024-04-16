import {
  Card
} from "react-bootstrap"
import type {FC} from "react"
import type { Posting } from "../postings/postingsApiSlice"

export interface JobModel {
  jobs: Posting[] //TODO change to jobtype
}

export const Job: FC<JobModel> = ({
  jobs
}) => {
  return (
    <div
    style={{
      margin: "20px 0px"
    }}>
      {jobs?.map(job => (
        <Card 
        key={job.id} 
        onClick={() => {}} 
        data-test="posting"
        style={{
          margin: "10px 0px",
          textAlign: "left"
        }}>
          <Card.Header as="h5" data-test="posting-name">
            {job.name}
          </Card.Header>
          <Card.Body>
            <Card.Title data-test="posting-location">
              {job.location.city}, {job.department.label}
            </Card.Title>
          </Card.Body>
        </Card>
      ))}
    </div>
  )
}
