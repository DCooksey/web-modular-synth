import React from "react";
import PropTypes from 'prop-types';
import Button from "@material-ui/core/Button/Button";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    button: {
        //   color: "white",
        //   backgroundColor: "black"
        background: 'linear-gradient(45deg, #150c0e 30%, #213765 90%)',
        borderRadius: 3,
        border: 1,
        color: 'white',
        height: 48,
        padding: '0 30px'
    },
});

const SquareButton = ({ classes, purpose, buttonText = "" }) => (
    <Button
        variant={"contained"}
        onClick={purpose}
        className={classes.button}
    >
        {buttonText}
    </Button>
);

SquareButton.propTypes = { purpose: PropTypes.func, buttonText: PropTypes.string };
export default withStyles(styles)(SquareButton);