import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import FormContainer from "../components/FormContainer";
import { useUpdateStudentProfileMutation } from "../../slices/studentApiSlice";
import { Form, Button } from "react-bootstrap";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { setStudentInfo } from "../../slices/authSlice";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { studentInfo } = useSelector((state) => state.auth);

  const [updateStudentProf, { isLoading }] = useUpdateStudentProfileMutation();

  useEffect(() => {
    setName(studentInfo.name);
    setEmail(studentInfo.email);
  }, [studentInfo.setName, studentInfo.setEmail]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("passwords do not match");
    } else {
      try {
        const res = await updateStudentProf({
          _id: studentInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setStudentInfo({ ...res }));
        console.log(res);
        navigate("/");
        toast.success("updated successfully 😎!!");
      } catch (err) {
        toast.error(err?.data?.message + "🤦‍♂️" || err.error);
      }
    }
  };

  return (
    <FormContainer>
      <h1>Update</h1>

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
          Update
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ProfileScreen;
