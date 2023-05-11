import React, { useState,useEffect } from "react";
import axios from "axios";
import ReactSpeedometer from "react-d3-speedometer";
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import Checkbox from '@mui/material/Checkbox';

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


function DeviceSpeedometer() {
let [telemetryData, setTelemetryData] = useState([]);
     
    
  const [devices, setDevices] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
    axios.get(`http://localhost:5000/gatewaydata/api/v1/name/getdevicenames/all`)
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
    setTelemetryData([]);
    axios.get(`http://localhost:5000/gatewaydata/api/v1/telemetrydata/${event.target.value}`)
	.then((response) => {
                    console.log(response.data);
                   let data = [];
                   setTelemetryData([]);
                   let datares = response.data;
                   const newdata = datares.map((item)=>{ 
                   return { device: event.target.value, resourcename: Object.keys(item), devvalue : Object.values(item)[0], units: Object.values(item)[1] };
                   })
                   setTelemetryData(newdata);
                    });
  }
  fetchData();
  };
   
       const fetchtelemetryDatarefresh = async(sd)=>{
            try{
	            let resourceName2 = ""; 
                    let value2 = "";
                   let data2= [];
                   setTelemetryData([]);
                    axios.get(`http://localhost:5000/gatewaydata/api/v1/telemetrydata/${sd}`)
                    .then((response) => {
                    console.log(response.data);
                    let datares2 = response.data;
                   const newdata2 = datares2.map((item)=>{ 
                   
                   return { device: sd, resourcename: Object.keys(item), devvalue : Object.values(item)[0], units: Object.values(item)[1]  };
                   })
                    setTelemetryData(newdata2);
                    });
                console.log(telemetryData);  
            } catch (error) {
                console.error(error);
            }
            };
   
   useEffect(() => {
  	 const interval = setInterval( ()=>{ 
            fetchtelemetryDatarefresh(selectdevice);
            }, 10000);
            return ()=>{
             clearInterval(interval);
            };
   
   },[selectdevice]);
   
   
      useEffect(() => {
    const fetchtelemetryData = async()=>{
            try{
	            let resourceName = ""; 
                    let value = "";
                   let data= [];
                   setTelemetryData([]);
                    axios.get(`http://localhost:5000/gatewaydata/api/v1/telemetrydata/${selectdevice}`)
                    .then((response) => {
                    console.log(response.data);
                    let datares = response.data;
                   const newdata = datares.map((item)=>{ 
                   
                   return { device: selectdevice, resourcename: Object.keys(item), devvalue : Object.values(item)[0], units: Object.values(item)[1]  };
                   })
                    setTelemetryData(newdata);
                    });
                console.log(telemetryData);  
            } catch (error) {
                console.error(error);
            }
            };
            fetchtelemetryData();
            
                    }, []);	



    return (
        <React.Fragment>
            <div className="firstwidgets">
            <div className="dropdownselect">
                <div className="selectdropdown">
                    <FormControl sx={{ m: 1, minWidth: 170 }} size="small">
                        <InputLabel id="demo-select-small">Select Device</InputLabel>
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
            <div className="speedmeter_wrapper">
               { telemetryData.map((telemetryData) => (
			<div key={telemetryData.device} >
			 <h2 className="text-center">{telemetryData.resourcename}</h2>
			 <div>
			 <span>{telemetryData.devvalue}</span>
			 <span style = {{margin: "0 10px" }}></span>
			 <span>{telemetryData.units}</span>
			 </div>
               		 <div className="dev_speed">
               		<ReactSpeedometer
               		minValue = {-50}
                        maxValue= {10000}
                        value = {parseFloat(telemetryData.devvalue)}
                        segments={10}
                        segmentColors={["#FF7D7D", "#FAEA48","#14C38E"]}
                        currentValueText={55 + "F"}
                        needleColor="black"
                        width={280}
                        height={150}
                        ringWidth={40}
                        needleHeightRatio={0.40}
                        valueTextFontSize={'12px'}
                        needleTransitionDuration={10000}
                        needleTransition="easeElastic"
                        labelFontSize={'11px'}
                        fluidWidth="true"
	                 />
			    </div> 
			</div>
	               ))}	
            	</div>
            </div>

            
        </React.Fragment>
    )
}
export default DeviceSpeedometer;
