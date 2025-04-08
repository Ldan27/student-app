import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import {
  Container,
  Button,
  Form,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearStudentInfo } from "../../slices/authSlice";
import { useLogoutMutation } from "../../slices/studentApiSlice";

const Navbars = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { studentInfo } = useSelector((state) => state.auth);

  const [logout] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logout().unwrap();
      dispatch(clearStudentInfo());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar expand="md" className="bg-body-tertiary mt-3">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>DMKT App</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="offcanvasNavbar-expand-md" />
          <Navbar.Offcanvas
            id="offcanvasNavbar-expand-md"
            aria-labelledby="offcanvasNavbarLabel-expand-md"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel-expand-md">
                Offcanvas
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3"></Nav>
              {studentInfo && studentInfo.isAdmin !== true ? (
                <NavDropdown title={studentInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : studentInfo && studentInfo.isAdmin ? (
                <NavDropdown title={studentInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/studentsInfo">
                    <NavDropdown.Item>Student Info</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <FaSignInAlt /> Sign In
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
              {/* <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form> */}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default Navbars;
