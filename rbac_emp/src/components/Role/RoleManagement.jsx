import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Container,
  Snackbar,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import UpdateIcon from "@mui/icons-material/Update";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_ROLES } from "../../graphql/queries";
import {
  UPDATE_PERMISSIONS_MUTATION,
  CREATE_ROLE_MUTATION,
  DELETE_ROLE_MUTATION,
} from "../../graphql/mutations";

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
    // textAlign: "center",
  },
  tableCell: {
    color: "#000000",
    // textAlign: "center",
  },
  selectControl: {
    minWidth: "120px",
  },
  addbutton: {
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

const RoleManagement = () => {
  const { loading, error, data } = useQuery(GET_ALL_ROLES);
  const [updatePermissions] = useMutation(UPDATE_PERMISSIONS_MUTATION);
  const [createRole] = useMutation(CREATE_ROLE_MUTATION);
  const [deleteRole] = useMutation(DELETE_ROLE_MUTATION);

  const [permissions, setPermissions] = useState({});
  const [open, setOpen] = useState(false);
  const [newRoleName, setNewRoleName] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);
  const [roles, setRoles] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    if (data && data.getAllRoles) {
      const initialPermissions = data.getAllRoles.reduce((acc, role) => {
        acc[role.role] = role.permissions.reduce(
          (rolePermAcc, perm) => {
            rolePermAcc[perm] = true;
            return rolePermAcc;
          },
          {
            NO_ACCESS: false,
            READ: false,
            CREATE: false,
            EDIT: false,
            UPDATE: false,
            DELETE: false,
          }
        );
        return acc;
      }, {});
      setPermissions(initialPermissions);
      setRoles(data.getAllRoles);
    }
  }, [data]);

  const handlePermissionChange = (role, event) => {
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [role]: {
        ...prevPermissions[role],
        [event.target.name]: event.target.checked,
      },
    }));
  };

  const handleUpdatePermissions = async (role) => {
    const selectedPermissions = Object.keys(permissions[role]).filter(
      (key) => permissions[role][key]
    );
    try {
      await updatePermissions({
        variables: {
          updatePermissions: { role, permissions: selectedPermissions },
        },
      });
      setSnackbar({
        open: true,
        message: "Permissions updated successfully",
        severity: "success",
      });
    } catch (error) {
      console.error(error);
      setSnackbar({
        open: true,
        message: "Failed to update permissions",
        severity: "error",
      });
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddRole = async () => {
    try {
      const { data } = await createRole({ variables: { name: newRoleName } });
      const newRole = data.createRole;
      console.log("handleRole ==> ", { data, newRole });

      setRoles((prevRoles) => [...prevRoles, newRole]);

      setPermissions((prevPermissions) => ({
        ...prevPermissions,
        [newRole.role]: {
          NO_ACCESS: false,
          READ: false,
          CREATE: false,
          EDIT: false,
          UPDATE: false,
          DELETE: false,
        },
      }));

      setNewRoleName("");
      handleClose();
      setSnackbar({
        open: true,
        message: "Role created successfully",
        severity: "success",
      });
    } catch (error) {
      console.error(error);
      setSnackbar({
        open: true,
        message: "Failed to create role",
        severity: "error",
      });
    }
  };

  const handleOpenDeleteDialog = (role) => {
    setRoleToDelete(role);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setRoleToDelete(null);
    setDeleteDialogOpen(false);
  };

  const handleConfirmDeleteRole = async () => {
    try {
      await deleteRole({ variables: { name: roleToDelete } });
      setRoles(roles.filter((role) => role.role !== roleToDelete));
      setSnackbar({
        open: true,
        message: "Role deleted successfully",
        severity: "success",
      });
      handleCloseDeleteDialog();
    } catch (error) {
      console.error(error);
      setSnackbar({
        open: true,
        message: "Failed to delete role",
        severity: "error",
      });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ open: false, message: "", severity: "success" });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log("rolesroles ", roles);

  return (
    <Container styles={styles.root}>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Role</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="New Role Name"
            type="text"
            fullWidth
            value={newRoleName}
            onChange={(e) => setNewRoleName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddRole} color="primary">
            Add Role
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete Role</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the role "{roleToDelete}"?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDeleteRole} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      <Paper style={styles.paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={styles.tableHeadCell}>Role Name</TableCell>
              <TableCell style={styles.tableHeadCell}>Permissions</TableCell>
              <TableCell style={styles.tableHeadCell}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.role}>
                <TableCell style={styles.tableCell}>{role.role}</TableCell>
                <TableCell>
                  <FormGroup row>
                    {[
                      "NO_ACCESS",
                      "READ",
                      "CREATE",
                      "EDIT",
                      "UPDATE",
                      "DELETE",
                    ].map((permission) => (
                      <FormControlLabel
                        key={permission}
                        control={
                          <Checkbox
                            checked={
                              permissions[role.role]
                                ? permissions[role.role][permission]
                                : false
                            }
                            onChange={(e) =>
                              handlePermissionChange(role.role, e)
                            }
                            name={permission}
                          />
                        }
                        label={
                          permission.charAt(0).toUpperCase() +
                          permission.slice(1)
                        }
                      />
                    ))}
                  </FormGroup>
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleUpdatePermissions(role.role)}
                  >
                    <UpdateIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleOpenDeleteDialog(role.role)}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button
          style={styles.addbutton}
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
        >
          <AddIcon /> Add Role
        </Button>
      </Paper>
    </Container>
  );
};

export default RoleManagement;
