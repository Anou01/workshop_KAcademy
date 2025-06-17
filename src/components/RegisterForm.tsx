import React, { FC } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface RegisterFormData {
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  phone: string;
  address: string;
  username: string;
  password: string;
  confirmPassword: string;
  image?: FileList;
}

const RegisterForm: FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    try {
      await registerUser(data);
      toast.success("Register Success");
      setTimeout(() => {
        navigate("/login");
      }, 900);
    } catch (error) {
      toast.warning("Register Failed");
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Header as="h4" className="text-center">
              Create Account
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-4 text-center">
                  <div
                    className="bg-secondary rounded-circle d-flex align-items-center justify-content-center mx-auto"
                    style={{ width: "150px", height: "150px" }}
                  >
                    <span className="text-white">No Image</span>
                  </div>
                  <Form.Label htmlFor="image" className="btn btn-outline-primary">
                    Choose Profile Picture
                  </Form.Label>
                  <Form.Control
                    type="file"
                    id="image"
                    className="d-none"
                    accept="image/*"
                    {...register("image")}
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="firstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter first name"
                        {...register("firstName", { required: "Please enter First Name" })}
                        isInvalid={!!errors.firstName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.firstName?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="lastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter last name"
                        {...register("lastName", { required: "Please enter Last Name" })}
                        isInvalid={!!errors.lastName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.lastName?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="gender">
                      <Form.Label>Gender</Form.Label>
                      <Form.Select
                        {...register("gender", { required: "Please select gender" })}
                        isInvalid={!!errors.gender}
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.gender?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="dateOfBirth">
                      <Form.Label>Date of Birth</Form.Label>
                      <Form.Control
                        type="date"
                        {...register("dateOfBirth", { required: "Please enter Date of Birth" })}
                        isInvalid={!!errors.dateOfBirth}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.dateOfBirth?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3" controlId="phone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Enter phone number"
                    {...register("phone", {
                      required: "Please enter phone number",
                      pattern: {
                        value: /^[0-9+-]+$/,
                        message: "Please enter a valid phone number",
                      },
                    })}
                    isInvalid={!!errors.phone}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter your address"
                    {...register("address", { required: "Please enter address" })}
                    isInvalid={!!errors.address}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.address?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Choose a username"
                    {...register("username", { required: "Please enter username" })}
                    isInvalid={!!errors.username}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Create a password"
                        {...register("password", {
                          required: "Please enter password",
                          minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters",
                          },
                        })}
                        isInvalid={!!errors.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="confirmPassword">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Confirm your password"
                        {...register("confirmPassword", {
                          required: "Confirm password is required",
                          validate: (value) =>
                            value === watch("password") || "Passwords do not match",
                        })}
                        isInvalid={!!errors.confirmPassword}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.confirmPassword?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-grid gap-2 mt-4">
                  <Button variant="primary" type="submit" size="lg">
                    Register
                  </Button>
                </div>
              </Form>

              <div style={{ height: 10 }}></div>
              <p style={{ textAlign: "center" }}>
                ທ່ານມີບັນຊີລະບໍ ? <a href="/login">ເຂົ້າສູ່ລະບົບ</a>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterForm;
