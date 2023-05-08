import React from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';

function CreateDatarule(){

    //set state for dialog box//
    const [opendatarule, Createdatarule] = React.useState(false);

    //use theme for responsive screen//
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    //Handle dialog box open//
    const handleClickOpen = () => {
        Createdatarule(true);
    };

    //Handle dialog Box close//
    const handleClose = () => {
        Createdatarule(false);
    };

    return(
        <React.Fragment>
            <Button variant="text" onClick={handleClickOpen} className="edgebtn">
                <AddIcon/> Create Data Rule
            </Button>
            <Dialog fullScreen={fullScreen} open={opendatarule} onClose={handleClose} aria-labelledby="responsive-dialog-title">
                <DialogTitle>
                    Create Data Rule
                 </DialogTitle>  
                 <DialogContent>
                    <DialogContentText>
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when x 
                    </DialogContentText>
                </DialogContent>  
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}
export default CreateDatarule;