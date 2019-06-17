import React from "react";
import Slider from '@material-ui/lab/Slider';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    root: {
        width: 250,
      },
      input: {
        width: 42,
      },
});

const Fader = ({ classes, handleSliderChange, handleInputChange, handleBlur, value }) => {
    const handleSliderChange = value => { // move these upward
        setValue(value);
    };

    const handleInputChange = event => {
        setValue(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleBlur = () => {
        if (value < 0) {
        setValue(0);
        } else if (value > 100) {
        setValue(100);
        }
    };

    return (
        <div className={classes.root}>
            <Typography id="input-slider" gutterBottom>
                Frequency
            </Typography>
            <Grid container spacing={2} alignItems="center">
            <Grid item xs>
                <Slider
                    value={typeof value === 'number' ? value : 0}
                    onChange={handleSliderChange}
                    aria-labelledby="input-slider"
                />
            </Grid>
            <Grid item>
                <Input
                    className={classes.input}
                    value={value}
                    margin="dense"
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    inputProps={{
                    step: 1,
                    min: 0,
                    max: 22000,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                }}
              />
            </Grid>
          </Grid>
        </div>
    )
};

export default withStyles(styles)(Fader);