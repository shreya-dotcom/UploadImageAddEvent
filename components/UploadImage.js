import React, { Component } from 'react'
import { Dialog } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PublishSharpIcon from '@material-ui/icons/PublishSharp';
import axios from 'axios';
import { Button, Grid } from '@material-ui/core'
// import Snack from 'Snackbar';


export default function UploadImage(props) {

    const [notify, setNotify] = React.useState({ isOpen: false, mesg: '' });
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [fileName, setFileName] = React.useState(null);


    const hiddenFileInput = React.useRef(null);
    const event = 'past';
    const [pevent, setPevent] = React.useState([])
    const { past, setPast } = props;


    React.useEffect(() => {
        axios.get('')

            .then(res => {
                console.log(res)
                console.log(res.data[0].event_id)
                setPevent(res.data)

            })
            .catch(err => {
                console.log(err)

            })
    }, [event])





    const handleChange = (event) => {
        // setEventName(event.target.value);
        const evid = event.target.value;
        localStorage.setItem('eventId', JSON.stringify(evid));


    };



    const handleClose = () => {
        setPast({
            isOpen: false
        });
        setFileName(null);
    };


    const handleSubmit = () => {
        const fd = new FormData();
        const file = JSON.parse(localStorage.getItem("files"));
        fd.append('file', selectedFile);
        console.log({ selectedFile })
        const dataId = JSON.parse(localStorage.getItem("eventId"));

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        console.log(dataId);

        axios({
            url: `${dataId}`,
            method: 'post',
            data: fd,
            config
        })
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                    // alert("Remainders sent successfully")
                    setNotify({
                        isOpen: true,
                        mesg: "Image Added successfully!"
                    })
                    setFileName(null);
                }

            })
            .catch(err => {
                console.log(err)
                setNotify({
                    isOpen: true,
                    mesg: "Something went wrong!"
                })

            })


    };


    const fileSelectedHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        localStorage.setItem('files', JSON.stringify(event.target.files[0]));
        setFileName(event.target.files[0].name);
        console.log({ fileName })
    }
    const handleClick = event => {
        hiddenFileInput.current.click();
    };



    return (
        <Dialog
            fullWidth={true}

            open={past.isOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="add image">Upload</DialogTitle>
            <DialogContent>
                <Grid
                    container
                    direction="row"
                    alignItems="center"
                >
                    <Button onClick={handleClick} color="primary" variant="contained" style={{ marginLeft: 100, marginTop: 25 }}>Upload Image<PublishSharpIcon /></Button>
                    &nbsp;&nbsp;{fileName}
                    <input
                        type="file"
                        ref={hiddenFileInput}
                        onChange={fileSelectedHandler}
                        style={{ display: 'none' }} />

                </Grid>

            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Ok
                </Button>
            </DialogActions>
            {/* <Snack
                notify={notify}
                setNotify={setNotify}
            /> */}

        </Dialog>
    )
}