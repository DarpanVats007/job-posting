import {
  Button,
  Card,
  Container,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

import type { FC } from "react";
import { useGetPostQuery } from "../features/postings/postApiSlice";

export const JobDetails: FC = () => {
  const currentURL = window.location.href;
  const jobId = currentURL.match(/\/(\d+)$/);

  console.log(+jobId![1]);

  const {
    data: post,
    isError,
    isLoading,
    isSuccess,
  } = useGetPostQuery(+jobId![1]);

  console.log(post);

  const renderTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      Back to List
    </Tooltip>
  );

  return (
    <div>
      <div className="listing">
        <Container>
          <Card style={{ padding: "10px", margin: "10px" }}>
            <Card.Header>
              <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip}
              >
                <Button onClick={() => {}} data-test="back">
                  Back
                </Button>
              </OverlayTrigger>
            </Card.Header>
            <Card.Body>
              <Card.Title data-test="posting-name">{post?.name}</Card.Title>
              <Card.Subtitle
                className="mb-2 text-muted"
                data-test="posting-location"
              >
                {post?.location.city}, {post?.location.country}
              </Card.Subtitle>
              <Card.Title data-test="job-description">
                {post?.jobAd.sections.jobDescription.title}
              </Card.Title>
              <Card.Text data-test="job-qualifications">
                <div
                  dangerouslySetInnerHTML={{
                    __html: post?.jobAd.sections.jobDescription.text || "",
                  }}
                ></div>
              </Card.Text>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default JobDetails;
