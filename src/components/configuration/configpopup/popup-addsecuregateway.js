import React from "react";
import TextField from '@mui/material/TextField';
import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import Button from '@mui/material/Button';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';

function PopupAddSecuregateway() {

    //Device Service Name Dropdown
    const [servicename, setdeviceservice] = React.useState('');
    const deviceservicehandleChange = (event) => {
        setdeviceservice(event.target.value);
    };

    //Protocol Dropdown
    const [protocol, setprotocol] = React.useState('');
    const protocolhandleChange = (event) => {
        setprotocol(event.target.value);
    };

    //Authentication Method Dropdown
    const [authmethod, setauthmethod] = React.useState('');
    const authmethodhandleChange = (event) => {
        setauthmethod(event.target.value);
    };


    return (
        <React.Fragment>
            <form id="Gateway-details" className="Gatewayforms">

                <FormControl fullWidth variant="outlined">
                    <TextField id="standard-basic" label="Gateway Name" variant="standard" required />
                </FormControl>

                <FormControl fullWidth variant="outlined">
                    <TextField id="standard-basic" label="Gateway Description" variant="standard" />
                </FormControl>

                <FormControl fullWidth variant="outlined">
                    <TextField id="standard-basic" label="Labels" variant="standard" />
                </FormControl>

                <FormControl fullWidth variant="outlined">
                    <TextField id="standard-basic" label="Location" variant="standard" />
                </FormControl>

                <FormControl fullWidth variant="outlined" required>
                    <InputLabel id="demo-simple-select-label">Device Service Name</InputLabel>
                    <Select variant="standard" labelId="demo-simple-select-label" value={servicename} label="Device Service Name" onChange={deviceservicehandleChange} required >
                        <MenuItem value=""> <em>None</em> </MenuItem>
                        <MenuItem value={10}>Device Reset</MenuItem>
                        <MenuItem value={20}>Device Modbus</MenuItem>
                        <MenuItem value={30}>Device MQTT</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth variant="outlined">
                    <TextField id="standard-basic" label="Gateway Profile Name" variant="standard" required />
                </FormControl>

                <FormControl fullWidth variant="outlined" required>
                    <InputLabel id="demo-simple-select-label">Protocol</InputLabel>
                    <Select variant="standard" labelId="demo-simple-select-label" value={protocol} label="Protocol" onChange={protocolhandleChange} required >
                        <MenuItem value=""> <em>None</em> </MenuItem>
                        <MenuItem value={10}>Modbus TCP</MenuItem>
                        <MenuItem value={20}>Modbus UDP</MenuItem>
                        <MenuItem value={30}>MQTT</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth variant="outlined">
                    <TextField id="standard-basic" label="IP Address" variant="standard" required />
                </FormControl>

                <FormControl fullWidth variant="outlined">
                    <TextField id="standard-basic" label="Port No" variant="standard" required />
                </FormControl>

                <FormControl fullWidth variant="outlined">
                    <TextField id="standard-basic" label="Certificate Path/Key Path" variant="standard" required />
                </FormControl>

                <FormControl fullWidth variant="outlined" required>
                    <InputLabel id="demo-simple-select-label">Authentication Method</InputLabel>
                    <Select variant="standard" labelId="demo-simple-select-label" value={authmethod} label="Authentication Method" onChange={authmethodhandleChange} required >
                        <MenuItem value=""> <em>None</em> </MenuItem>
                        <MenuItem value='509'>X:509</MenuItem>
                        <MenuItem value='Symmetric'>Symmetric</MenuItem>
                    </Select>
                    {authmethod === '509' &&
                        <div id="showThisDiv" style={{ marginTop: '10px' }}>
                            <Button variant="contained" className="authbtn">Generate Certificate</Button>
                        </div>}

                    {authmethod === 'Symmetric' &&
                        <div id="showThisDiv" style={{ marginTop: '10px' }}>
                            <Button variant="contained" className="authbtn">Generate Key</Button>
                        </div>}
                </FormControl>

                

                <div className="formbtnblock">
                    <Button variant="contained" color="primary" type="Submit" className="cusbutnrest">
                        Reset
                    </Button>
                    <Button variant="contained" color="primary" type="Submit" className="cusbtnsubmit">
                        Configure
                    </Button>
                </div>
            </form>
        </React.Fragment>
    )
}
export default PopupAddSecuregateway;