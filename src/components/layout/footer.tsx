import { Container } from "react-bootstrap";
import type { FC } from "react";

export const Footer: FC = () => {
  return (
    <footer className="footer mt-auto">
      <Container className="d-flex justify-content-center">
        <div>
          &copy; {new Date().getFullYear()} Data provided by{" "}
          <a href="https://dev.smartrecruiters.com/">
            SmartRecruiters Public API
          </a>
        </div>
      </Container>
    </footer>
  );
};
