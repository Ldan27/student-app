import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../slices/studentApiSlice";
import FormContainer from "../components/FormContainer";
import { Form, Button } from "react-bootstrap";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { setStudentInfo } from "../../slices/authSlice";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { studentInfo } = useSelector((state) => state.auth);

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (studentInfo) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [studentInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setStudentInfo({ ...res }));
      console.log(res);
      navigate("/");
      toast.success("you've been logged in 🤩!!");
    } catch (err) {
      toast.error(err?.data?.message + "🤦‍♂️" || err.error);
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>

      <Form onSubmit={submitHandler}>
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
        {isLoading && <Loader />}

        <Button type="submit" variant="primary" className="my-4">
          Sign In
        </Button>
      </Form>
    </FormContainer>
  );
};

export default LoginScreen;
