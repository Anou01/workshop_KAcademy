
import React, { FC } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";
import { consts } from "../utils";
import { toast } from "react-toastify";

const LoginForm: FC = () => {
  // status
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  //Logic

  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      const response = await loginUser(data);
      console.log("Login successful:", response);

      // Store token in localStorage or context
      localStorage.setItem(consts.AUTH_TOKEN, response.token);
      localStorage.setItem(consts.USER_KEY, JSON.stringify(response.user));
      // Redirect user to dashboard or home page
      toast.success("Login Success!");  

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err: any) {
    } finally {
    }
  };
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Header as="h4" className="text-center">
              Sign In
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="enter username"
                    {...register("username", {
                      required: "please Enter username",
                    })}
                    isInvalid={!!errors.username}
                  />
                  <Form.Control.Feedback type="invalid">
                    ກະລຸນາປ້ອນ Username
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="enter password"
                    {...register("password", {
                      required: "please Enter password",
                    })}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    ກະລຸນາປ້ອນ password
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button type="submit">Sign In</Button>
                </div>
              </Form>

              <div style={{ height: 10 }}></div>

              <p className="text-center">
                Have you got an Account ? <a href="/register">Sign up</a>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
