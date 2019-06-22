import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import SquareButton from "../control-units/buttons/SquareButton";
import NumericalInput from "../control-units/inputs/NumericalInput";
import { default as btnState } from "../control-units/buttons/SquareButtonStateEnum";
import Oscillator from "../generators/Oscillator";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
    root: {
        width: 300,
    },
    slider: {
        padding: '22px 0px',
    },
});
  
const WaveGenerator = ({ classes, audioCtx }) => {
    const [generate, setGenerate] = useState(btnState.UNTOUCHED);
    const [freq, setFreq] = useState(440);
    const [waveType, setWaveType] = useState("sine");
    const [osc, setOsc] = useState(new Oscillator("sine", 440, audioCtx));
    
    useEffect(() => {
        if (generate === btnState.ACTIVE) {
            try {
                osc.start();
            } catch (err) {
                osc.stop();
                osc.start();
            }
        }
    }, [generate, osc, waveType])

    const handleButtonClick = () => {
        if (generate === btnState.UNTOUCHED) {
            setGenerate(btnState.ACTIVE);
        }    
        else if (generate === btnState.ACTIVE) {
            osc.stop();
            setGenerate(btnState.INACTIVE);
        }
        else if (generate === btnState.INACTIVE) {
            setGenerate(btnState.ACTIVE);
            setOsc(new Oscillator(waveType, freq, audioCtx));
        }
    };

    const handleInputChange = event => {
        const freq = Number(event.target.value);
        if (isNaN(freq)) return;
        if (generate === btnState.ACTIVE) osc.stop(0);
        setFreq(freq)
        setOsc(new Oscillator(waveType, freq, audioCtx));
    };

    const handleWaveSelectChange = event => {
        if (generate === btnState.ACTIVE) osc.stop(0);
        setWaveType(event.target.value);
        setOsc(new Oscillator(event.target.value, freq, audioCtx));
    };

    return (
        <React.Fragment>
            <h1>DC-SP</h1>
            <SquareButton 
                purpose={handleButtonClick} 
                buttonText={generate === btnState.ACTIVE ? "ON" : "OFF"} 
            />
            <FormControl className={classes.margin}>
                <InputLabel htmlFor="age-customized-select">Wave Type</InputLabel>
                <Select
                    value={waveType}
                    onChange={handleWaveSelectChange}
                >
                <MenuItem value={"sine"}>Sine</MenuItem>
                <MenuItem value={"square"}>Square</MenuItem>
                <MenuItem value={"sawtooth"}>Sawtooth</MenuItem>
                <MenuItem value={"triangle"}>Triangle</MenuItem>
                </Select>
            </FormControl>
            <NumericalInput handleInputChange={handleInputChange} value={freq} />
        </React.Fragment>
    )
};

export default withStyles(styles)(WaveGenerator);