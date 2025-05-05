import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { Form, Button, Container } from "react-bootstrap";
import { useCreateStudentMutation } from "../../slices/studentApiSlice";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const CreateStudent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const [createStudent, { isLoading }] = useCreateStudentMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("passwords do not match");
    } else {
      try {
        const res = await createStudent({
          name,
          email,
          password,
        }).unwrap();
        console.log(res);
        navigate("/studentsInfo");
        toast.success("Created successfully 😎!!");
      } catch (err) {
        toast.error(err?.data?.message + "🤦‍♂️" || err.error);
      }
    }
  };

  return (
    <>
      <Container>
        <Link to="/studentsInfo" className="btn btn-light my-2 ">
          Go Back
        </Link>
      </Container>

      <FormContainer>
        <h1>Create Student</h1>

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name :</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email :</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password :</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password :</Form.Label>
            <Form.Control
              type="Password"
              placeholder="Enter ConfirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          {isLoading && <Loader />}

          <Button type="submit" variant="primary" className="my-4">
            Create
          </Button>

          {isLoading && <Loader />}
        </Form>
      </FormContainer>
    </>
  );
};

export default CreateStudent;
