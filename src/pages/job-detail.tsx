import {
  Button,
  Card,
  Container,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { Footer, NavigationBar } from "../components/layout";

import type { FC } from "react";
import { useGetPostQuery } from "../features/postings";
import { useNavigate } from "react-router-dom";

export const JobDetails: FC = () => {
  const currentURL = window.location.href;
  const jobId = currentURL.match(/\/(\d+)$/);

  const {
    data: post,
    isError,
    isLoading,
    isSuccess,
  } = useGetPostQuery(+jobId![1]);

  const navigate = useNavigate();

  const renderTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      Back to List
    </Tooltip>
  );

  return (
    <>
      <NavigationBar />
      <div className="listing">
        <Container>
          <Card style={{ padding: "10px", margin: "10px" }}>
            <Card.Header>
              <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip}
              >
                <Button
                  onClick={() => {
                    navigate("/job-posting/");
                  }}
                  data-testid="back"
                >
                  Back
                </Button>
              </OverlayTrigger>
            </Card.Header>
            <Card.Body>
              <Card.Title data-testid="posting-name">{post?.name}</Card.Title>
              <Card.Subtitle
                className="mb-2 text-muted"
                data-testid="posting-location"
              >
                {post?.location.city}, {post?.location.country}
              </Card.Subtitle>
              <Card.Title data-testid="job-description">
                {post?.jobAd.sections.jobDescription.title}
              </Card.Title>
              <Card.Text data-testid="job-qualifications">
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
      <Footer />
    </>
  );
};

export default JobDetails;
