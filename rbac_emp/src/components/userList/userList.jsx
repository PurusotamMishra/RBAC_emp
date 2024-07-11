import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";

import { DELETE_USER, REGISTER_USER } from "../../graphql/mutations";
import { GET_ALL_USERS, GET_PERMISSIONS } from "../../graphql/queries";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
  DialogTitle,
  Dialog,
  DialogActions,
  DialogContent,
  TextField
} from "@mui/material";
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

const formStyle = {
  width: "100%",
  marginTop: "10px",

};

const submitButtonStyle = {
  margin: "25px 0 20px",
};

// const registerLinkStyle = {
//   textDecoration: "none",
//   color: "#1976d2",
// };

const flex2 = {
  width: "100%", // Adjust as needed
  marginTop: "10px",
  display: "flex",
  gap: "10px"
};

const UserList = () => {

  const navigate = useNavigate();

  !localStorage.getItem('userEmail') ? navigate('/') : null


  // const [snackbarOpen, setSnackbarOpen] = useState(false);
  // const [snackbarMessage, setSnackbarMessage] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);
  const [user, setUser] = useState([]);

  const { loading, error, data } = useQuery(GET_ALL_USERS);

  let accessPermissions = [];

  const getPermissions = useQuery(GET_PERMISSIONS, {
    variables: {
      role: localStorage.getItem('role')
    },
  })
  const [deleteUser] = useMutation(DELETE_USER);
  const [registerUser] = useMutation(REGISTER_USER);

  const handleSubmit = async (e) => {

    e.preventDefault();
    try {
      const response = await registerUser({
        variables: {
          registerInput: {
            firstName: formData.firstname,
            lastName: formData.lastname,
            email: formData.email,
            phone: formData.phno,
            salary: parseInt(formData.salary),
            department: formData.department,
          },
        },
      });
      const newUser = response.data.registerUser;
      console.log(newUser);
      setUser((prevUser) => [...prevUser, newUser]);
      handleRegisterDialogClose();
      setFormData([]);

    } catch (err) {
      console.error("Error registering user:", err.message);
    }
  };


  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phno: "",
    salary: 0,
    department: "",
    role: "EMP", // Default role selection
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    //validateField(e.target.name, e.target.value)
  }


  useEffect(() => {
    if (data && data.getAllUsers) {
      setUser(data.getAllUsers);
    }
  }, [data]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography>Error User: {error.message}</Typography>;



  const handleDeleteUser = async () => {
    const email = localStorage.getItem('emailId');
    await deleteUser({
      variables: {
        email,
        isActive: false,
      },
    })
    setUser(user.filter((use) => use.email !== email))
  }


  if (deleteUser.loading) return <CircularProgress />;
  if (deleteUser.error) return <Typography>Error: {deleteUser.error.message}</Typography>;


  if (getPermissions.loading) return <CircularProgress />;
  if (getPermissions.error) return <Typography>Error: {getPermissions.error.message}</Typography>;
  if (getPermissions.data) {
    accessPermissions = getPermissions.data.getPermissions.permissions;
  }
  const handleRegisterDialogClose = () => {
    setRegisterDialogOpen(false);
  }
  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
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

          {/* Register Dialog */}
          <Dialog
            open={registerDialogOpen}
            onClose={handleRegisterDialogClose}
          >
            <DialogTitle>
              REGISTER
            </DialogTitle>
            <DialogContent>
              <form style={formStyle} onSubmit={handleSubmit} >
                <div style={flex2}>
                  <div style={{ flex: 1 }}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="firstname"
                      label="First Name"
                      name="firstname"
                      autoFocus
                      value={formData.firstname}
                      onChange={handleChange}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      id="lastname"
                      label="Last Name"
                      name="lastname"
                      autoFocus
                      value={formData.lastname}
                      onChange={handleChange}
                    />
                  </div>
                </div>


                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="phno"
                  label="Phone no"
                  name="phno"
                  autoFocus
                  value={formData.phno}
                  onChange={handleChange}
                />
                <div style={flex2}>
                  <div style={{ flex: 1 }}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="salary"
                      label="Salary "
                      name="salary"
                      type="number"
                      autoFocus
                      value={formData.salary}
                      onChange={handleChange}
                    />
                  </div>
                  <div style={{ flex: 1 }}>

                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="department"
                      label="Department"
                      name="department"
                      autoFocus
                      value={formData.department}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={submitButtonStyle}
                >
                  Submit
                </Button>
              </form>
            </DialogContent>

          </Dialog>

          
          {/* Delete Dialog */}
          <Dialog
            open={deleteDialogOpen}
            onClose={handleDeleteDialogClose}
          >
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
              Are you sure you want to delete this user?
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteDialogClose} color="secondary" >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // onConfirm();
                  handleDeleteUser();
                  // onClose();
                  handleDeleteDialogClose();
                }}
                color="primary"
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>

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
                    </>
                  ) : null
                  }
                </TableRow>
              </TableHead>
              <TableBody>
                {user.map((emp) => (
                  (emp.role !== "ROOT") ? (
                    (emp.isActive !== false) ?
                      <TableRow key={emp.id}>
                        <TableCell>{emp.id}</TableCell>
                        <TableCell>{emp.firstName}</TableCell>
                        <TableCell>{emp.lastName}</TableCell>
                        <TableCell>{emp.email}</TableCell>
                        {(accessPermissions.includes(PERMISSIONS.DELETE)) ? (

                          <>
                            <TableCell>
                              <Button onClick={() => {
                                localStorage.setItem('emailId', emp.email)
                                return (
                                  navigate('/employee')
                                )
                              }}>
                                <GridOnOutlinedIcon />
                              </Button>
                              <Button onClick={() => {
                                localStorage.setItem('emailId', emp.email);
                                // console.log(user.email)
                                setDeleteDialogOpen(true);
                                // handleDeleteUser();
                              }}>
                                <DeleteOutlinedIcon />
                              </Button>
                            </TableCell>
                          </>
                        ) : null}
                      </TableRow>
                      : null
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
              <>
                <Button
                  style={styles.adminButton}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setRegisterDialogOpen(true);

                  }}
                >
                  Add New Employee
                </Button>
              </>
              : null}
            <Button
              style={styles.logoutButton}
              variant="contained"
              color="primary"
              onClick={() => {
                localStorage.clear();
                return (
                  navigate('/')
              )
              }}
            >
              Logout
            </Button>


            {/* <Snackbar
              open={snackbarOpen}
              autoHideDuration={6000}
              onClose={() => setSnackbarOpen(false)}
              message={snackbarMessage}
              style={styles.snackbar}
            /> */}
          </Paper>

        </Container>
    );
};

export default UserList;
