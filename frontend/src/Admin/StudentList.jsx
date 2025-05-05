import { FaTrash, FaEdit } from "react-icons/fa";
import { Table, Button, Container, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { toast } from "react-toastify";
import { useNavigate, useRouteLoaderData, Link } from "react-router-dom";
import { useGetAllStudentQuery } from "../../slices/studentApiSlice";
import Loader from "../components/Loader";
import { useGetStudentByNameMutation } from "../../slices/studentApiSlice";
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDeleteStudentMutation } from "../../slices/studentApiSlice";

const StudentList = () => {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [name, setName] = useState("");
  const [studentToDelete, setStudentToDelete] = useState(null);
  const reload = useRouteLoaderData();

  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = (student) => {
    setStudentToDelete(student);
    setShow(true);
  };

  const handleClose2 = () => setShow2(false);
  const handleShow2 = (student) => {
    setStudentToDelete(student);
    setShow(true);
  };

  const [getStudentByName, { data: searchedStudent, isLoading: studentLoad }] =
    useGetStudentByNameMutation();

  const {
    data: students,
    isLoading,
    refetch,
    error,
    isSuccess,
    isFetching,
  } = useGetAllStudentQuery();

  const [deleteStudent] = useDeleteStudentMutation();
  const deleteHandler = async (id) => {
    try {
      await deleteStudent(id).unwrap();
      toast.success("student deleted 👊✌️ !!!");
      handleClose();
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess, refetch]);

  useEffect(() => {
    if (students) {
      refetch();
    }
  }, [students, refetch]);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (name.trim()) {
        try {
          await getStudentByName({ name }).unwrap();
        } catch (err) {
          toast.error("Student not found!");
        }
      }
    }, 500); // délai de 500ms

    return () => clearTimeout(delayDebounce);
  }, [name, getStudentByName]);

  useEffect(() => {
    if (deleteHandlerOne) {
      refetch();
    }
  }, [refetch]);

  const deleteHandlerOne = async (id) => {
    try {
      await deleteStudent(id).unwrap();
      toast.success("student deleted 👊✌️ !!!");
      handleClose2();
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Container className="mt-4">
        <h1>Students</h1>
        <div className="d-flex justify-content-between">
          <LinkContainer to="/studentsInfo/create">
            <Button>Create student</Button>
          </LinkContainer>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button
              onClick={() => {
                students;
                navigate("/studentsInfo");
                refetch();
                setName("");
              }}
              variant="outline-primary"
            >
              refresh
            </Button>
          </Form>
        </div>
      </Container>
      {studentLoad && <Loader />}
      {searchedStudent ? (
        <Container>
          <Table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr key={searchedStudent._id}>
                <td>{searchedStudent._id}</td>
                <td>{searchedStudent.name}</td>
                <td>{searchedStudent.email}</td>
                <td>
                  <LinkContainer
                    to={`/studentsInfo/${searchedStudent._id}/update`}
                  >
                    <Button variant="light" className="btn-sm">
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => handleShow2(searchedStudent)}
                  >
                    <FaTrash />
                  </Button>
                </td>
                <>
                  <Modal show={show2} onHide={handleClose2}>
                    <Modal.Header closeButton>
                      <Modal.Title>Student</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      {studentToDelete && (
                        <>
                          Do you want to delete{" "}
                          <strong>{studentToDelete.name}</strong> with the ID of{" "}
                          <strong>{studentToDelete._id}</strong>?
                        </>
                      )}
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose2}>
                        Close
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => deleteHandlerOne(studentToDelete._id)}
                      >
                        Delete
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </>
              </tr>
            </tbody>
          </Table>
        </Container>
      ) : isLoading ? (
        <Loader />
      ) : (
        <Container>
          <Table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td>{student._id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>
                    <LinkContainer to={`/studentsInfo/${student._id}/update`}>
                      <Button variant="light" className="btn-sm">
                        <FaEdit />
                      </Button>
                    </LinkContainer>

                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => handleShow(student)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      )}
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Student</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {studentToDelete && (
              <>
                Do you want to delete <strong>{studentToDelete.name}</strong>{" "}
                with the ID of <strong>{studentToDelete._id}</strong>?
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => deleteHandler(studentToDelete._id)}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </>
  );
};

export default StudentList;
