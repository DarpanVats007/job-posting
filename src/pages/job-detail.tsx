import {
  Button,
  Card,
  Container,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { Footer, NavigationBar } from "../components/layout";
import { useNavigate, useParams } from "react-router-dom";

import DOMPurify from "dompurify";
import { ErrorLoading } from "../components/error/error-loading";
import type { FC } from "react";
import { JobDetailCardSkeleton } from "../components/skeleton/job-detail-skeleton";
import { useGetPostQuery } from "../features/postings";

export const JobDetails: FC = () => {
  const params = useParams();

  const {
    data: post,
    isError,
    isLoading,
    isSuccess,
  } = useGetPostQuery(+params!.jobId!);

  const navigate = useNavigate();

  if (isLoading) {
    return (
      <>
        <NavigationBar />
        <Container className="p-3">
          <JobDetailCardSkeleton />
        </Container>
        <Footer />
      </>
    );
  }

  if (isError) {
    return (
      <>
        <NavigationBar />
        <Container className="p-3">
          <ErrorLoading />
        </Container>
        <Footer />
      </>
    );
  }

  if (isSuccess) {
    const renderTooltip = (props: any) => (
      <Tooltip id="button-tooltip" {...props}>
        Back to List
      </Tooltip>
    );

    const sanitizedHtml = DOMPurify.sanitize(
      post!.jobAd.sections.jobDescription.text,
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
                  <p
                    dangerouslySetInnerHTML={{
                      __html: sanitizedHtml || "",
                    }}
                  ></p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Container>
        </div>
        <Footer />
      </>
    );
  }
};

export default JobDetails;
