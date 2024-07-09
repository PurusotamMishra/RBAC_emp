// // import React from 'react'

// const UserDetails = () => {
//   return (
//     <div>UserDetails</div>
//   )
// }

// export default UserDetails;

// import React from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_PROFILE } from "../../graphql/queries";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Typography,
  CircularProgress,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  // TableHead,
  TableRow,
} from "@mui/material";

const styles = {
  root: {
    marginTop: "50px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  paper: {
    padding: "16px",
    maxWidth: "600px",
    margin: "auto",
    marginTop: "20px",
  },
  logoutButton: {
    marginTop: "20px",
  },
  adminButton: {
    marginTop: "20px",
    marginLeft: "5px",
  },
};

const UserDetails = () => {
  const navigate = useNavigate();
  const { email = "rockson.depty@company.net" } = useParams();
  // Query to fetch user profile

  const { loading, error, data } = useQuery(GET_USER_PROFILE, {
    variables: {
      email, // Retrieve token from storage
    },
    fetchPolicy: "network-only", // Ensure latest data is fetched
  });



  if (loading) return <CircularProgress />; // Show loading indicator

  if (error) {
    console.log(localStorage.getItem('token'))
    console.error("Error fetching user profile:", error);
    return <Typography>Error fetching user profile</Typography>;
  }

  if (!data || !data.getUserProfile) {
    return <Typography>User profile not found</Typography>;
  }



  // const isAdmin = (data.getUserProfile.role === "ADMIN" || data.getUserProfile.role === "SUPER_ADMIN");
  
  return (
    <Container style={styles.root} component="main" maxWidth="md">
      {/* {!isAdmin && ( */}
        <Typography variant="h4" align="center" gutterBottom>
          Welcome to your Dashboard
        </Typography>
      {/* )} */}
      {/* {isAdmin && ( */}
        <Typography variant="h4" align="center" gutterBottom>
          Welcome to your Profile Admin
        </Typography>
      {/* )} */}
      <Paper style={styles.paper} elevation={3}>
        <TableContainer>
          <Table>
            <TableBody>
            <TableRow>
                <TableCell component="th" scope="row">
                  <Typography fontWeight="bold">Emp ID: </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">
                    {data.getUserProfile.id}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography fontWeight="bold">First Name: </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">
                    {data.getUserProfile.firstName}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography fontWeight="bold">Last Name: </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">
                    {data.getUserProfile.lastName}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography fontWeight="bold">Email: </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">
                    {data.getUserProfile.email}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography fontWeight="bold">Phone No: </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">
                    {data.getUserProfile.phone}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography fontWeight="bold">Salary: </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">
                    {data.getUserProfile.salary}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography fontWeight="bold">Department: </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">
                    {data.getUserProfile.department}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography fontWeight="bold">Role: </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">
                    {data.getUserProfile.role}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Button
          style={styles.logoutButton}
          variant="contained"
          color="primary"
          onClick={ () => {
            return (
              navigate('/getall')
            )
          }}
        >
          Logout
        </Button>
        {/* {isAdmin && (
          <Button
            style={styles.adminButton}
            variant="contained"
            color="secondary"
            onClick={() => navigate("/admin")}
          >
            Admin Dashboard
          </Button>
        )} */}
      </Paper>
    </Container>

  )
};

export default UserDetails;
