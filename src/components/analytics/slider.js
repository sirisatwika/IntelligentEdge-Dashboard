import React, { useState, useEffect } from "react";
import axios from "axios";
// import Box from '@mui/material/Box';
// import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import '../analytics/analytics.css';

import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import Checkbox from '@mui/material/Checkbox';



//For Multiple select options configurations

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

function SliderSizes() {


   const [devices, setDevices] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
    axios.get(`http://localhost:5000/api/v1/gateway/name/getdevicenames/all`)
		.then(response =>{
		//console.log(response.data);
		setDevices(response.data); 
		})
  }
  fetchData();
  },[]);
  
  const [selectdevice, setdevice] = React.useState('CarbondioxideSensor');
  

    //Selct device Dropdown
  const devicehandleChange = (event) => {
    setdevice(event.target.value);
  
    const fetchData = async () => {
    let ch =[];
	axios.get(`http://localhost:5000/api/v1/gateway/data/minmax/${event.target.value}`)
		    .then((response) => {
		      console.log(response.data);
		      const resvalues = Object.values(response.data);
		      console.log(resvalues);
		      ch.push({device:event.target.value, min: resvalues[0][0],max: resvalues[0][1]})
		        setDataval(ch);
		    });
	 }
  fetchData();
  };

    let [dataval, setDataval] = useState([]);
	useEffect(() => {
    const minmaxval = () =>{
    	let ch =[];
	axios.get(`http://localhost:5000/api/v1/gateway/data/minmax/${selectdevice}`)
		    .then((response) => {
		      console.log(response.data);
		      const resvalues = Object.values(response.data);
		      console.log(resvalues);
		      ch.push({device:selectdevice, min: resvalues[0][0],max: resvalues[0][1]})
		        setDataval(ch);
		        console.log(ch);
		    });
		    console.log(dataval);
    }
    minmaxval();
    },[]);
    

    return (
        <div className="sliderwrapper">
            <div className="dropdownselect">
                <div className="selectdropdown">
                    <FormControl sx={{ m: 1, minWidth: 170 }} size="small">
                        <InputLabel id="demo-select-small">Select </InputLabel>
                        <Select labelId="demo-select-small" id="demo-select-small" value={selectdevice} label="Select Device" onChange={devicehandleChange}>
                         {devices.map(item =>(
              	<MenuItem key={item} value={item}>
              	{item}
              	</MenuItem>
              ))}   
                         </Select>
                    </FormControl>
                </div>
            </div>

            <div className="r_slider">
                <div className="r_sliderblock">
                
                { dataval.map((dataval) => (
	            <div key={dataval.device} >
	            <h3>{dataval.device}</h3>
                    
                    <div className="r_slidervalues">
                        <p>Min value</p>
                        <Slider min = {-100} max = {10000} defaultValue={dataval.min} aria-label="Default" valueLabelDisplay="on" />
                    </div>
                    
                    <div className="r_slidervalues">
                        <p>Max value</p>
                        <Slider min = {-100} max = {10000} defaultValue={dataval.max} aria-label="Default" valueLabelDisplay="on" />
                    </div>
                    
                </div> ))}
                
                </div> 
            </div>
        </div>
    );
}
export default SliderSizes;
