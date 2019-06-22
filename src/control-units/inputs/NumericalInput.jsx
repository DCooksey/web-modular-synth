import React from "react";
import Input from '@material-ui/core/Input';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    root: {
        width: 250,
    },
    input: {
        width: 42,
        color: "#7fffd4"
    },
});

const NumericalInput = ({ classes, handleInputChange, value }) => (
    <React.Fragment>
        <Input 
            onChange={handleInputChange} 
            value={value} 
            InputProps={{
                classes: classes.input
            }}
        />
    </React.Fragment>
);

export default withStyles(styles)(NumericalInput);