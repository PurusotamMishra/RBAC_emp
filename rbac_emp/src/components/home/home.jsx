// import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, CircularProgress, Typography } from '@mui/material';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { GET_ALL_ROLES, GET_ALL_USERS } from '../../graphql/queries';
import { useQuery } from '@apollo/client';


const Home = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState('');
    const [user, setUser] = useState('');
    const [userEmail, setuserEmail] = useState('');

    const handleChangeRole = (event) => {
        setRole(event.target.value);
        localStorage.setItem('role', event.target.value);
    };

    const handleChangeUser = (e) => {
        setUser(e.target.value);

        // localStorage.setItem('userEmail', e.target.value);
        setuserEmail(e.target.value);
        localStorage.setItem('emailId', e.target.value);
    }
    // console.log(role)

    const allRoles = useQuery(GET_ALL_ROLES);
    const allUsers = useQuery(GET_ALL_USERS);

    if (allRoles.loading) return <CircularProgress />;
    if (allRoles.error) return <Typography>Error: {allRoles.error.message}</Typography>;
    if (allUsers.loading) return <CircularProgress />;
    if (allUsers.error) return <Typography>Error: {allUsers.error.message}</Typography>;
    // console.log(allUsers.data.getAllUsers)


    (localStorage.getItem('userEmail')) ?
        navigate('/getall')
        : null

    return (
        <div>
            <Box sx={{ minWidth: 120, margin: '10px' }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Roles</InputLabel>
                    <Select

                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={role}
                        label="Role"
                        onChange={handleChangeRole}
                    >
                        {Object.entries(allRoles.data.getAllRoles).map(([key, val]) => (
                            <MenuItem key={key} value={val.role} > {val.role} </MenuItem>
                        ))}
                    </Select>

                </FormControl>
            </Box>
            <Box sx={{ minWidth: 120, margin: '10px' }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Users</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={user}
                        label="User"
                        onChange={handleChangeUser}
                    >
                        {Object.entries(allUsers.data.getAllUsers).map(([key, val]) => (
                            (val.role === role) ?
                                <MenuItem key={key} value={val.email} > {val.firstName} </MenuItem>
                                : null
                        ))}
                    </Select>

                </FormControl>
                <Button onClick={() => {
                    localStorage.setItem('userEmail', userEmail)
                    navigate('/getall')
                }}>
                    Done
                </Button>
            </Box>
        </div>
    )
}

export default Home