import { Container, Navbar } from "react-bootstrap";

import type { FC } from "react";
import logo from "../../assets/smartrecruiters.webp";

export const NavigationBar: FC = () => {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          <img
            src={logo}
            width="250"
            height="25"
            className="d-inline-block align-top"
            alt="logo file"
          />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};
