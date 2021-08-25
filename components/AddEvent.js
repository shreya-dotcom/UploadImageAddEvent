import React from 'react'
import { Avatar, Button, Grid, Paper, TextField } from '@material-ui/core'
import AddBoxIcon from '@material-ui/icons/AddBox';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { useState } from 'react';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useHistory } from 'react-router-dom';
import UploadImage from "..//components//UploadImage";
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import * as Yup from 'yup';


import moment from 'moment';

var today = moment().toDate();





const Add_Event = () => {
    const paperStyle = { padding: '20px 20px', width: 800, height: 460, margin: "30px auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '' }
    const btnStyle = { margin: '10px 5px 10px auto', display: 'flex', justify: 'space-between', alignItems: 'right' }
    const formStyle = { textAlign: 'center' }
    const initialValues = {
        eventName: '',
        eventType: '',
        eventDescription: '',
        eventVenue: '',
        eventDate: '',
        startTime: '',
        endTime: ''
    }
    
    const handleImage = () => {
        // history.push('/UploadImage')
    }

    let history = useHistory();
    const onCreate = (values, props) => {
        event.preventDefault();
        const event = {
            eventName: values.eventName,
            eventType: values.eventType,
            eventDescription: values.eventDescription,
            eventVenue: values.eventVenue,
            eventDate: values.eventDate,
            startTime: values.startTime,
            endTime: values.endTime
        }

        console.log(Event)
            // axios.post("http://localhost:8081/admin/AddEvent",event)
            .then((response) => {
                var resp = response.status;
                console.log(response.data)
                console.log(response.status)
                if (response == 200) {
                    alert("Events are created");
                    history.push('/');
                }
            })

            .catch((error) => {
                if (error.status.response == 400) {
                    console.log(error.response.data.message);
                    alert("Event already exist")
                    props.resetForm()
                }
                else
                    alert("Something went wrong")
                console.log(error)
            });


    }


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

                <Formik initialValues={initialValues} eventSchema={eventSchema} onSubmit={onCreate}>

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
                                <Button onClick={handleImage} type='create' variant='contained'  color='primary' style={btnStyle}
                                
                                >Create Event</Button>
                              
                            </Grid>

                        </Form>
                    )}
                </Formik>

            </Paper>
            
        </Grid>
    )
}


export default Add_Event;