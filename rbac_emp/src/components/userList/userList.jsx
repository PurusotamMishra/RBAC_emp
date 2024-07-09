// // import React from 'react'

// const UserList = () => {
//   return (
//     <div>UserList</div>
//   )
// }

// export default UserList

import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";

// import { UPDATE_USER_DETAILS } from "./graphql/mutations";
import { DELETE_USER } from "../../graphql/mutations";
// import { REGISTER_USER } from "../../graphql/mutations";
import { GET_ALL_USERS } from "../../graphql/queries";
// import { GET_USER_PROFILE } from "../../graphql/queries";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Button,
  FormControl,
  Snackbar,
} from "@mui/material";

const styles = {
  root: {
    marginTop: "100px",
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

  tableHeadCell: {
    fontWeight: "bold",
  },
  selectControl: {
    minWidth: "120px",
  },
  logoutbutton: {
    marginTop: "20px",
  },
  adminButton: {
    marginTop: "20px",
    marginLeft: "5px",
  },
  snackbar: {
    marginBottom: "20px",
  },
};

const UserList = () => {
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { loading, error, data } = useQuery(GET_ALL_USERS);

  // const [updateUserDetails] = useMutation();



  if (loading) return <CircularProgress />;
  if (error) return <Typography>Error: {error.message}</Typography>;




  return (
    <Container style={styles.root}>
      <Typography variant="h4" gutterBottom>
        All Employee List
      </Typography>
      <Paper style={styles.paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={styles.tableHeadCell}>Id</TableCell>
              <TableCell style={styles.tableHeadCell}>First Name</TableCell>
              <TableCell style={styles.tableHeadCell}>Last Name</TableCell>
              <TableCell style={styles.tableHeadCell}>Email</TableCell>
              {/* View  */}
              {/* Delete */}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.getAllUsers.map((user) => (
              (user.role !== "SUPER_ADMIN") ? (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                </TableRow>
              ) : null
            ))}
          </TableBody>
        </Table>
        <Button
          style={styles.logoutButton}
          variant="contained"
          color="primary"
          // onClick={handleLogout}
        >
          Logout
        </Button>
        <Button
          style={styles.adminButton}
          variant="contained"
          color="secondary"
          onClick={() => {
            try {
              navigate('/employee');
            } catch (err) {
              console.error(err);
            }
          }}
        >
          Your Profile
        </Button>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMessage}
          style={styles.snackbar}
        />
      </Paper>

    </Container>
  );
};

export default UserList;
