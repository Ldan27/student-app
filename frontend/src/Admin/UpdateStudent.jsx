import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { Form, Button, Container } from "react-bootstrap";
import Loader from "../components/Loader";

import {
  useUpdateStudentMutation,
  useGetStudentByIdQuery,
} from "../../slices/studentApiSlice";
import { toast } from "react-toastify";

const UpdateStudent = () => {
  const { id: studentId } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { data: stud, isLoading } = useGetStudentByIdQuery(studentId);

  const navigate = useNavigate();

  const [updatedStudent, { isLoading: loadingUpdate }] =
    useUpdateStudentMutation();

  // useEffect(() => {
  //   if (stud) {
  //     setName(stud.name);
  //     setEmail(stud.email);
  //   }
  // }, [stud]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await updatedStudent({
        studentId,
        name,
        email,
      }).unwrap();
      toast.success("Updated successfully 😎!!");
      navigate("/studentsInfo");
    } catch (err) {
      toast.error(err?.data?.message + "🤦‍♂️" || err.error);
    }
  };

  return (
    <>
      <Container>
        <Link to="/studentsInfo" className="btn btn-light my-3">
          Go Back
        </Link>
      </Container>

      <FormContainer>
        <h1>Update Student</h1>

        {isLoading ? (
          <Loader />
        ) : (
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

            <Button type="submit" variant="primary" className="my-4">
              Update
            </Button>
          </Form>
        )}

        {loadingUpdate && <Loader />}
      </FormContainer>
    </>
  );
};

export default UpdateStudent;
