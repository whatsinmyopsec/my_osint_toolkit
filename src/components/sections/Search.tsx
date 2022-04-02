import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, IconButton, Input } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { scroller } from "react-scroll";
import { useDencrypt } from "use-dencrypt-effect";

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundImage: "url(" + "https://smonk.club/2022/04/02/DistantButteryLimpkin.png" + ")",
        backgroundBlendMode: "overlay",
        backgroundSize: "cover",
    },
    header: {
        fontFamily: "Raleway",
        color: "white",
        paddingTop: "20px",
    },
    subtitle: {
        fontFamily: "Raleway",
        color: "white",
        fontSize: "18px",
    },
    expandButton: {
        marginTop: "20px",
        color: "white",
        zIndex: 2,
    },
});

const options = ['Domain', 'Hash', 'IP'];
const headerValues = ['FILE HASH', 'IP ADDRESS', 'DOMAIN'];
const ariaLabel = { 'aria-label': 'description' };
export const Search: React.FC = () => {
    const classes = useStyles();
   
    const { result, dencrypt } = useDencrypt();

    const handleExpandClick = () => {
        scroller.scrollTo("results", {
            duration: 1500,
            delay: 100,
            smooth: true,
        });
    };

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            dencrypt(headerValues[i]);

            i = i === headerValues.length - 1 ? 0 : i + 1;
        }, 2000);
        return () => clearInterval(interval);
    }, [dencrypt]);

    
    return (
        <div id="seach">
            
            <Grid justifyContent="center" alignItems="center" container className={classes.root}>
            <Typography variant="h1" className={classes.header}>
                    Search <b style={{ color: "#c71585" }}>{result}</b>
                </Typography>
            <Input defaultValue="Hello world" inputProps={ariaLabel} />           
                
                <IconButton
                    className={classes.expandButton}
                    onClick={handleExpandClick}
                >
                    <ExpandMore fontSize="large" />
                </IconButton>
            </Grid>
        </div>
    );
};