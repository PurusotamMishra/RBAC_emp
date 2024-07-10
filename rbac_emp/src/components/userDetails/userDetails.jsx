import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { GET_USER_PROFILE , GET_PERMISSIONS} from "../../graphql/queries";
import { UPDATE_USER_DETAILS } from "../../graphql/mutations";
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
  FormControl,
  TextField,
  FormLabel
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
    marginRight: "5px",
  },
  adminButton: {
    marginTop: "20px",
    marginRight: "5px",
  },
  empInput: {
    display: "grid",
    gridTemplateColumns: '1fr 4fr',
    alignItems: "center",
    gap: "15px",
    marginTop: '10px'
  },

};

const UserDetails = () => {

  const navigate = useNavigate();
  const [toShow, setToShow] = useState(false);
  const [empData, setEmpData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    salary: 0,
    department: "",
    role: "",
  });

  const { email = localStorage.getItem('emailId') } = useParams();
  // Query to fetch user profile

  const { loading, error, data } = useQuery(GET_USER_PROFILE, {
    variables: {
      email, // Retrieve token from storage
    },
    onCompleted: (data) => {
      setEmpData({
        // ...empData,
        id: data.getUserProfile.id,
        firstName: data.getUserProfile.firstName,
        lastName: data.getUserProfile.lastName,
        email: data.getUserProfile.email,
        phone: data.getUserProfile.phone,
        salary: data.getUserProfile.salary,
        department: data.getUserProfile.department,
        role: data.getUserProfile.role,
      })
    },
    fetchPolicy: "network-only", // Ensure latest data is fetched
  });

  let accessPermissions = [];

  const getPermissions = useQuery(GET_PERMISSIONS, {
    variables: {
      role: localStorage.getItem('role')
    },
    // onCompleted(data){

    // }
  })

  const [updateUserProfile] = useMutation(UPDATE_USER_DETAILS);



  if (loading) return <CircularProgress />; // Show loading indicator

  if (error) {
    // console.log(localStorage.getItem('token'))
    console.error("Error fetching user profile:", error);
    return <Typography>Error fetching user profile</Typography>;
  }

  if (!data || !data.getUserProfile) {
    return <Typography>User profile not found</Typography>;
  }

  if (updateUserProfile.loading) return <CircularProgress />; // Show loading indicator
  if (updateUserProfile.error) return <Typography>Error: {updateUserProfile.error.message}</Typography>;



  if (getPermissions.loading) return <CircularProgress />;
  if (getPermissions.error) return <Typography>Error: {getPermissions.error.message}</Typography>;
  if (getPermissions.data) {
    accessPermissions = getPermissions.data.getPermissions.permissions;
  }


  // update users
  const handleChange = (e) => {
    setEmpData({ ...empData, [e.target.name]: e.target.value });

  }
  const handleUpdateUsers = async (e) => {
    e.preventDefault();
    // console.log(empData);
    try {
      const res = await updateUserProfile({
        variables: {
          updatedDetails: {
            firstName: empData.firstName,
            lastName: empData.lastName,
            email: empData.email,
            phone: empData.phone,
            salary: parseInt(empData.salary),
            department: empData.department,
            role: empData.role
          },
        },
      })
      setToShow(false);
      // console.log(res);
    } catch (err) {
      console.error("update:", err)
    }

    // console.log(res);


  }
  return (
    <Container style={styles.root} component="main" maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Welcome to User Profile
      </Typography>
      <Paper style={styles.paper} elevation={3}>

        {(!toShow) ? (
          <>
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
              style={styles.adminButton}
              variant="contained"
              color="secondary"
              onClick={() => {
                localStorage.removeItem('emailId')
                // localStorage.removeItem('userEmail')
                return (
                  navigate('/getall')
                )
              }}
              >
              All Employees
            </Button>

            {(accessPermissions.includes(import.meta.env.VITE_PERMISSIONS.UPDATE)) ?
            <Button
              style={styles.logoutButton}
              variant="contained"
              color="primary"
              onClick={() => {
                // {
                  //   Object.entries(data.getUserProfile).map(([key, value]) => (
                    //     setEmpData({ ...empData, [key]: value })
                //   ))
                // }
                // console.log(empData);
                // console.log(data);
                setToShow(true);

              }}
            >
              Edit Details
            </Button>
            : null }

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
        ) :
          <form onSubmit={handleUpdateUsers} >
            <div style={styles.empInput}>
              <FormLabel>EMP Id</FormLabel>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="id"
                name="id"
                autoFocus
                value={empData.id}
                onChange={handleChange}
              />
            </div>

            <div style={styles.empInput}>
              <FormLabel>First Name</FormLabel>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="firstname"
                name="firstName"
                autoFocus
                value={empData.firstName}
                onChange={handleChange}
              />
            </div>

            <div style={styles.empInput}>
              <FormLabel>Last Name</FormLabel>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="lastname"
                name="lastName"
                autoFocus
                value={empData.lastName}
                onChange={handleChange}
              />
            </div>

            <div style={styles.empInput}>
              <FormLabel> Email Id </FormLabel>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                name="email"
                autoComplete="email"
                value={empData.email}
                onChange={handleChange}
              />
            </div>

            <div style={styles.empInput}>
              <FormLabel>Phone No.</FormLabel>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="phone"
                name="phone"
                autoFocus
                value={empData.phone}
                onChange={handleChange}
              />
            </div>

            <div style={styles.empInput}>
              <FormLabel>Salary</FormLabel>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="salary"
                name="salary"
                type="number"
                autoFocus
                value={empData.salary}
                onChange={handleChange}
              />
            </div>

            <div style={styles.empInput}>
              <FormLabel>Department</FormLabel>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="department"
                name="department"
                autoFocus
                value={empData.department}
                onChange={handleChange}
              />
            </div>

            <div style={styles.empInput}>
              <FormLabel>Role</FormLabel>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="role"
                name="role"
                autoFocus
                value={empData.role}
                onChange={handleChange}
              />
            </div>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Update Details
            </Button>

          </form>
        }

      </Paper>
    </Container>

  )
};
// };
export default UserDetails
