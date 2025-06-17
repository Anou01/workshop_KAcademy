import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { consts } from '../utils';
import { fetchUserProfile } from '../api/users';
import { Alert, Button, Card, Col, Container, Row, Spinner, ListGroup } from 'react-bootstrap';

function HomePage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError]=useState<string | null>(null)
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const navigate = useNavigate();

  useEffect(() => {

    const checkAuthAndFetchProfile = async ()=>{
        const token = localStorage.getItem(consts.AUTH_TOKEN);
        const user = localStorage.getItem(consts.USER_KEY) as any;

        console.log("token-->", token)
        console.log("user-->", user)

        if(!token || !user){
          navigate('/login');
        }

        const userInfo = JSON.parse(user);

        console.log("userInfo-->", userInfo)
        
        try{
          const profileData = await fetchUserProfile(userInfo.id);
          console.log("profileData==>", profileData)
          setUserProfile(profileData.data)
        }
        catch(err:any){
            setError(err.message || "Failed to load user profile");
        }finally{
          setIsLoading(false)
        }
    }

    checkAuthAndFetchProfile();

  },[navigate])

  const handleLogout = () => {
    localStorage.removeItem(consts.AUTH_TOKEN);
    localStorage.removeItem(consts.USER_KEY);
    navigate('/login');
  };


  if (isLoading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }





  return ( 
    <Container className="my-5">
    <Row className="mb-4">
      <Col>
        <div className="d-flex justify-content-between align-items-center">
          <h1>Welcome, {userProfile?.firstName || 'User'}</h1>
          <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
        </div>
        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      </Col>
    </Row>


    {userProfile && (
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body className="text-center">
              {userProfile.profileImage ? (
                <img 
                  src={`http://localhost:5000/uploads/${userProfile.profileImage}`} 
                  alt="Profile" 
                  className="rounded-circle mb-3" 
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                />
              ) : (
                <div 
                  className="bg-secondary rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                  style={{ width: '150px', height: '150px' }}
                >
                  <span className="text-white fs-1">
                    {userProfile.firstName} {userProfile.lastName}
                  </span>
                </div>
              )}
              <h3>{userProfile.firstName} {userProfile.lastName}</h3>
              <p className="text-muted">@{userProfile.username}</p>
              <Button variant="primary" onClick={() => navigate('/profile/edit/'+userProfile.id)}>
                Edit Profile
              </Button>
            </Card.Body>
          </Card>
          
          <Card>
            <Card.Header>Account Information</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>Join Date:</strong> {new Date(userProfile.createdAt).toLocaleDateString()}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>User ID:</strong> {userProfile.id}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        
        <Col md={8}>
          <Card className="mb-4">
            <Card.Header>Personal Information</Card.Header>
            <Card.Body>
              <Row>
                <Col md={6} className="mb-3">
                  <label className="text-muted d-block">Full Name</label>
                  <div>{userProfile.firstName} {userProfile.lastName}</div>
                </Col>
                <Col md={6} className="mb-3">
                  <label className="text-muted d-block">Username</label>
                  <div>{userProfile.username}</div>
                </Col>
              </Row>
              
              <Row>
                {/* <Col md={6} className="mb-3">
                  <label className="text-muted d-block">Email</label>
                  <div>{userProfile.email || 'Not provided'}</div>
                </Col> */}
                <Col md={6} className="mb-3">
                  <label className="text-muted d-block">Phone</label>
                  <div>{userProfile.phone}</div>
                </Col>
              </Row>
              
              <Row>
                <Col md={6} className="mb-3">
                  <label className="text-muted d-block">Gender</label>
                  <div>{userProfile.gender}</div>
                </Col>
                <Col md={6} className="mb-3">
                  <label className="text-muted d-block">Date of Birth</label>
                  <div>{new Date(userProfile.dateOfBirth).toLocaleDateString()}</div>
                </Col>
              </Row>
              
              <Row>
                <Col className="mb-3">
                  <label className="text-muted d-block">Address</label>
                  <div>{userProfile.address}</div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          
          <Card>
            <Card.Header>Recent Activity</Card.Header>
            <Card.Body>
              <div className="text-center py-5">
                <p className="text-muted">No recent activity to display</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    )}
  </Container>

  )
}

export default HomePage
