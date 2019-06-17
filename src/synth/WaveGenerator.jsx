import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import SquareButton from "../control-units/buttons/SquareButton";
import Fader from "../control-units/sliders/Fader";
import { default as btnState } from "../control-units/buttons/SquareButtonStateEnum";
import Oscillator from "../generators/Oscillator";

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
    const [osc, setOsc] = useState(new Oscillator("sine", 440, audioCtx));
    
    useEffect(() => {
        if (generate === btnState.ACTIVE) {
            osc.start();
        }
        else if (generate === btnState.INACTIVE) {
            osc.stop();
        }
    }, [generate])

    const handleButtonClick = () => {
        if (generate === btnState.UNTOUCHED) {
            setGenerate(btnState.ACTIVE);
        } 
        else if (generate === btnState.ACTIVE) {
            setGenerate(btnState.INACTIVE);
        }
        else if (generate === btnState.INACTIVE) {
            setGenerate(btnState.ACTIVE);
            setOsc(new Oscillator("sine", 440, audioCtx));
        }
    };

    return (
        <React.Fragment>
            <h1>DC-SP</h1>
            <SquareButton 
                purpose={handleButtonClick} 
                buttonText={generate === btnState.ACTIVE ? "ON" : "OFF"} 
            />
        </React.Fragment>
    )
};

export default withStyles(styles)(WaveGenerator);