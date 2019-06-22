import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import SquareButton from "../control-units/buttons/SquareButton";
import NumericalInput from "../control-units/inputs/NumericalInput";
import { default as btnState } from "../control-units/buttons/SquareButtonStateEnum";
import Oscillator from "../generators/Oscillator";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import Oscilloscope from "oscilloscope";
// import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        width: 300,
    },
    // slider: {
    //     padding: '22px 0px',
    // },
    card: {
        minWidth: 200,
        backgroundColor: "#373741"
    },
    select: {
        paddingTop: "7px",
        color: "#7fffd4"
    },
    numInput: {
        color: "#7fffd4"
    },
    icon: {
        fill: "#ff6951"
    },
    title: {
        color: "#FFFFFF",
        float: "left"
    }
});

const WaveGenerator = ({ classes, audioCtx }) => {
    const [generate, setGenerate] = useState(btnState.UNTOUCHED);
    const [freq, setFreq] = useState(440);
    const [waveType, setWaveType] = useState("sine");
    const [osc, setOsc] = useState(new Oscillator("sine", 440, audioCtx));
    // const canvas = useRef(null);
    // const scope = new Oscilloscope(osc);

    useEffect(() => {
        if (generate === btnState.ACTIVE) {
            try {
                osc.start();
            } catch (err) {
                osc.stop();
                osc.start();
            }
        }
    }, [generate, osc, waveType]);

    const handleButtonClick = () => {
        if (generate === btnState.UNTOUCHED || generate === btnState.INACTIVE) {
            setGenerate(btnState.ACTIVE);
            setOsc(new Oscillator(waveType, freq, audioCtx));
        } else if (generate === btnState.ACTIVE) {
            osc.stop();
            setGenerate(btnState.INACTIVE);
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

    // const handleSliderChange = (render, handle, value, un, percent) => {
    //     debugger;
    //     setFreq(value);
    // };

    return (
        <React.Fragment>
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Oscillator
                    </Typography>
                    <div>
                        <SquareButton
                            purpose={handleButtonClick}
                            buttonText={generate === btnState.ACTIVE ? "⏽" : "⭘"}
                        />
                    </div>
                    <FormControl className={classes.margin}>
                        <Select
                            value={waveType}
                            onChange={handleWaveSelectChange}
                            className={classes.select}
                            inputProps={{
                                classes: {
                                    icon: classes.icon,
                                },
                            }}
                        >
                            <MenuItem value={"sine"}>Sine</MenuItem>
                            <MenuItem value={"square"}>Square</MenuItem>
                            <MenuItem value={"sawtooth"}>Sawtooth</MenuItem>
                            <MenuItem value={"triangle"}>Triangle</MenuItem>
                        </Select>
                    </FormControl>
                    <NumericalInput className={classes.numInput} handleInputChange={handleInputChange} value={freq} />
            {/* <Nouislider range={{ min: [0], max: [22000] }} start={[freq]} onSlide={handleSliderChange} connect /> */}
                </CardContent>
            </Card>
        </React.Fragment>
    )
};

export default withStyles(styles)(WaveGenerator);