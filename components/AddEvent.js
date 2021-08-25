import {React,Fragment} from 'react'
import { Avatar, Button, Grid, Paper, TextField } from '@material-ui/core'
import AddBoxIcon from '@material-ui/icons/AddBox';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import Snackbar from '@material-ui/core/Snackbar';
import axios from 'axios';
import { useState } from 'react';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useHistory } from 'react-router-dom';
import UploadImage from "..//components//UploadImage";
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import * as Yup from 'yup';



const Add_Event = () => {
    const paperStyle = { padding: '20px 20px', width: 800, height: 460, margin: "30px auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '' }
    // const btnStyle = { margin: '10px 5px 10px auto', display: 'flex', justify: 'space-between', alignItems: 'right' }
    const formStyle = { textAlign: 'center' }
    const marginTop = { margin: '8px 0' }
    const initialValues = {
        eventName: '',
        eventType: '',
        eventDescription: '',
        eventVenue: '',
        eventDate: '',
        startTime: '',
        endTime: ''
    }

    const [success, setSuccess] = useState(false);
    const [mesg, setMesg] = useState('');
    const [open, setOpen] = useState(false);

    const handleImage = () => {
        // history.push('/UploadImage')
    }

    let history = useHistory();
    const onSubmit = (values, props) => {
        // event.preventDefault();
        const Event = {
            eventName: values.eventName,
            eventType: values.eventType,
            eventDescription: values.eventDescription,
            eventVenue: values.eventVenue,
            startTime: values.startTime,
            endTime: values.endTime
        }

        console.log(Event)
            // axios.post("http://localhost:8081/admin/AddEvent",Event)
            .then((response) => {
                var resp = response.status;
                console.log(response.data)
                console.log(response.status)
                if (response == 200) {
                    setSuccess(true);
                    setMesg(response.data.message);
                    setOpen(true);
                }
            })

            .catch((error) => {
                if (error.status.response == 400) {
                    console.log(error.response.data.message);
                    //  alert("Email already exist")
                    setOpen(true);
                    setMesg(error.response.data.message);
                    props.resetForm()
                }
                else {
                    //    alert("Something went wrong");
                    setOpen(true);
                    setMesg("Something went wrong");

                    console.log(error)
                }
            });


    }

    const handleClose = (event, reason) => {
        if (success) {
            setOpen(false);
            history.push('/');
        }
        else {
            setOpen(false);

        }
    };


    const eventSchema = Yup.object().shape({
        eventName: Yup.string()
            .matches(/[a-zA-Z][a-zA-Z\s]+/, "Event Name must be alphabetical..")
            .required,
        eventType: Yup.string().required,
        eventDescription: Yup.string().required,
        eventVenue: Yup.string().required
    });



    return (
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddBoxIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Add Events</h2>

                </Grid>

                <Formik initialValues={initialValues} eventSchema={eventSchema} onSubmit={onSubmit}>

                    {(props) => (
                        <Form style={formStyle}>

                            <div class="container">
                                <Grid container spacing={3}>

                                    <Grid item xs={6} sm={6}>

                                        <Field as={TextField} fullWidth label='Name' name='eventName' value={props.values.eventName}
                                            required error={props.errors.eventName && props.touched.eventName}
                                            onInput={props.handleChange}
                                            pattern="[Aa-Zz]"
                                            helperText={<ErrorMessage name='eventName' />}
                                            onChange={props.handleChange} placeholder="Enter the name of event" required />
                                    </Grid>

                                    <Grid item xs={6}>

                                        <Field as={TextField} fullWidth label='Type' name='eventType' value={props.values.eventType}
                                            onChange={props.handleChange} placeholder="Enter the type of Event" required />


                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field as={TextField} id="standard-textarea" fullWidth label='Description' name='eventDescription' value={props.values.eventDescription}
                                            onChange={props.handleChange} placeholder="Enter the Description of Event" multiline required />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Field as={TextField} fullWidth label='Venue' name='eventVenue' value={props.values.eventVenue}
                                            onChange={props.handleChange} placeholder="Enter the Venue of Event" required />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <Field as={TextField} fullWidth label='Start Date and Time' name='startTime' value={props.values.startTime}
                                            id="datetime-local" type="datetime-local" defaultValue="Default Value"
                                            defaultValue="2021-08-24T10:30" min="2021-08-24"

                                            InputLabelProps={{
                                                shrink: true,
                                            }}

                                            onChange={props.handleChange} placeholder="Enter the start time" required />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <Field as={TextField} fullWidth label='End Date and Time' name='endTime' value={props.values.endTime}
                                            id="datetime-local" type="datetime-local" defaultValue="Default Value"
                                            defaultValue="2021-08-24T10:30" min="today"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}

                                            onChange={props.handleChange} placeholder="Enter the end time" required />

                                    </Grid>


                                </Grid>
                            </div>
                            <Grid container justify="flex-end">
                                {/* <Button type='create' variant='contained'  color='primary' style={btnStyle} */}


                                {/* >Create Event</Button> */}
                                <Button type='submit' color='primary' variant="contained" disabled={props.isSubmitting}
                                    style={marginTop} >{props.isSubmitting ? "Loading" : "Create"}</Button>

                            </Grid>

                        </Form>
                    )}
                </Formik>

            </Paper>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={mesg}
                action={
                    <Fragment>

                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </Fragment>
                }
            />
        </Grid>
    )
}


export default Add_Event;
