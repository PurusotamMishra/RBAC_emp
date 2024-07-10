import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../../graphql/mutations";
import { useNavigate } from "react-router-dom";

import {
    Button,
    TextField,
    Typography,
    Container,
    Grid,
    Paper,
    Select,
    MenuItem,
} from "@mui/material";

const paperStyle = {
    marginTop: "50px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
};

const formStyle = {
    width: "100%",
    marginTop: "10px",

};

const submitButtonStyle = {
    margin: "25px 0 20px",
};

const registerLinkStyle = {
    textDecoration: "none",
    color: "#1976d2",
};

const flex2 = {
    width: "100%", // Adjust as needed
    marginTop: "10px",
    display: "flex",
    gap: "10px"
};

const Register = () => {
    const navigate = useNavigate();

    const [registerUser, { loading, error, data }] = useMutation(REGISTER_USER);




    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            const response = await registerUser({
                variables: {
                    registerInput: {
                        id: formData.id,
                        firstName: formData.firstname,
                        lastName: formData.lastname,
                        email: formData.email,
                        phone: formData.phno,
                        salary: parseInt(formData.salary),
                        department: formData.department,
                    },
                },
            });
            // console.log(response);
            navigate('/getall')
            // console.log("Registration response:", response);
        } catch (err) {
            console.error("Error registering user:", err.message);
        }
    };

    // const [inputErrors, setInputErrors] = useState({
    //     email: "",
    // });


    // const validateField = (fieldName, value) => {
    //     switch (fieldName) {
    //         case "email":
    //             const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    //             if (!emailRegex.test(value)) {
    //                 setInputErrors({ ...inputErrors, email: "Invalid email address" });
    //             } else {
    //                 setInputErrors({ ...inputErrors, email: "" });
    //             }

    //             break;
    //         default: ;
    //     }
    // };
    const [formData, setFormData] = useState({
        id: "",
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

    return (
        <Container component="main" maxWidth="xs">

            <Paper style={paperStyle} elevation={3}>
                <Typography component="h2" variant="h5">
                    REGISTER
                </Typography>
                <form style={formStyle} onSubmit={handleSubmit} >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="id"
                        label="id "
                        name="id"
                        autoFocus
                        value={formData.id}
                        onChange={handleChange}
                    />
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
                                required
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


            </Paper>

        </Container>

    );

};

export default Register;