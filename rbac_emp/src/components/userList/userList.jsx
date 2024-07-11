import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";

import { DELETE_USER } from "../../graphql/mutations";
import { GET_ALL_USERS, GET_PERMISSIONS } from "../../graphql/queries";
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
import ConfirmationDialog from "./confirmationDialog";
import { PERMISSIONS } from '../../../const';

import GridOnOutlinedIcon from '@mui/icons-material/GridOnOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';


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
    // alignItems: "right"
  },
  selectControl: {
    minWidth: "120px",
  },
  logoutbutton: {
    marginTop: "20px",
  },
  adminButton: {
    marginTop: "20px",
    marginRight: "5px",
  },
  snackbar: {
    marginBottom: "20px",
  },
};

const UserList = () => {
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [user, setUser] = useState([]);

  const { loading, error, data } = useQuery(GET_ALL_USERS);

  let accessPermissions = [];

  const getPermissions = useQuery(GET_PERMISSIONS, {
    variables: {
      role: localStorage.getItem('role')
    },
    // onCompleted(data){

    // }
  })
  const [deleteUser] = useMutation(DELETE_USER);

  useEffect(() => {
    if (data && data.getAllUsers) {
      setUser(data.getAllUsers);
    }
  }, [data]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography>Error: {error.message}</Typography>;



  const handleDeleteUser = async () => {
    // console.log("Hello")
    const email = localStorage.getItem('emailId');
    await deleteUser({
      variables: {
        email,
      },
    })
    setUser(user.filter((use) => use.email !== email))
    window.location.reload();
    // console.log(user)
  }


  if (deleteUser.loading) return <CircularProgress />;
  if (deleteUser.error) return <Typography>Error: {deleteUser.error.message}</Typography>;


  if (getPermissions.loading) return <CircularProgress />;
  if (getPermissions.error) return <Typography>Error: {getPermissions.error.message}</Typography>;
  if (getPermissions.data) {
    accessPermissions = getPermissions.data.getPermissions.permissions;
  }


  return (
    (accessPermissions.includes(PERMISSIONS.NO_ACCESS)) ?
      <>
        <h1>YOU DO NOT HAVE ACCESS TO THIS PAGE!</h1>
        <Button
          style={styles.logoutButton}
          variant="contained"
          color="primary"
          onClick={() => {
            localStorage.removeItem('role')
            localStorage.removeItem('userEmail')
            return (
              navigate('/')
            )
          }}
        >
          Logout
        </Button>

      </>
      :

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
                {(accessPermissions.includes(PERMISSIONS.DELETE)) ? (
                  <>
                    <TableCell style={styles.tableHeadCell}>Actions</TableCell>
                    {/* <TableCell style={styles.tableHeadCell}>Delete</TableCell> */}
                  </>
                ) : null
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {data.getAllUsers.map((user) => (
                (user.role !== "ROOT") ? (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.firstName}</TableCell>
                    <TableCell>{user.lastName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    {(accessPermissions.includes(PERMISSIONS.DELETE)) ? (

                      <>
                        <TableCell>
                          <Button onClick={() => {
                            localStorage.setItem('emailId', user.email)
                            return (
                              navigate('/employee')
                            )
                          }}>
                            <GridOnOutlinedIcon />
                          </Button>
                          {/* </TableCell>
                      <TableCell> */}
                          <Button onClick={() => {
                            localStorage.setItem('emailId', user.email);
                            // console.log(user.email)
                            setDialogOpen(true);

                            // handleDeleteUser();
                          }}>
                            <DeleteOutlinedIcon />
                          </Button>
                          <ConfirmationDialog
                            open={dialogOpen}
                            onClose={() => setDialogOpen(false)}
                            onConfirm={handleDeleteUser}
                          />
                        </TableCell>
                      </>
                    ) : null}
                  </TableRow>
                ) : null
              ))}
            </TableBody>
          </Table>

          {localStorage.getItem('role') === "ROOT" ?
            <Button
              style={styles.adminButton}
              variant="contained"
              color="secondary"
              onClick={() => {
                navigate('/manageroles');
              }}
            >
              Manage Roles
            </Button>
            : null}

          <Button
            style={styles.adminButton}
            variant="contained"
            color="secondary"
            onClick={() => {
              try {
                localStorage.setItem('emailId', localStorage.getItem('userEmail'))
                navigate('/employee');
              } catch (err) {
                console.error(err);
              }
            }}
          >
            Your Profile
          </Button>

          {(accessPermissions.includes(PERMISSIONS.CREATE)) ?
            <Button
              style={styles.adminButton}
              variant="contained"
              color="primary"
              onClick={() => {
                navigate('/register')
                
              }}
            >
              Add New Employee
            </Button>
            : null}
          <Button
            style={styles.logoutButton}
            variant="contained"
            color="primary"
            onClick={() => {
              localStorage.removeItem('role')
              localStorage.removeItem('userEmail')
              return (
                navigate('/')
              )
            }}
          >
            Logout
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
