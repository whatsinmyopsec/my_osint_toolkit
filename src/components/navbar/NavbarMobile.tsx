import React, { useState } from "react";
import { Link } from "react-scroll";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import { createBrowserHistory } from "history";
import {
    List,
    ListItem,
    ListItemText,
    Divider,
    Typography,
} from "@material-ui/core";


const history = createBrowserHistory();


const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    navItems: {
        color: "white",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        textTransform: "uppercase",
    },
    navActiveItem: {
        color: "rgb(27,163,251)",
        borderRadius: 25,
    },
});

export const NavbarMobile: React.FC = () => {
    const classes = useStyles();
    const [isOpen, setMenuOpen] = useState(false);
    const [active, setActive] = useState(false);

    const handleState = (to: any) => {
        if (to === "home") {
            setActive(true);
            history.push("/");
        } else {
            setActive(false);
            history.push(`/${to}`);
        }
        setMenuOpen(false);
    };

    var burgerStyle = {
        bmBurgerButton: {
            position: "fixed",
            width: "36px",
            height: "30px",
            left: "36px",
            top: "36px",
        },
        bmBurgerBars: {
            transition: "background-color 0.5s ease-in-out",
            background: active ? "#653a96" : "rgb(101, 58, 150)",
        },

        bmCrossButton: {
            height: "24px",
            width: "24px",
        },
        bmCross: {
            background: "#bdc3c7",
        },
        bmMenuWrap: {
            position: "fixed",
            width: "200px",
        },
        bmMenu: {
            background: "#373a47",
            padding: "2.5em 1.5em 0",
            fontSize: "1.15em",
        },
        bmMorphShape: {
            fill: "#373a47",
        },
        bmItemList: {
            color: "#b8b7ad",
        },
        bmItem: {
            display: "inline-block",
        },
        bmOverlay: {
            background: "rgba(0, 0, 0, 0.3)",
        },
    };

    const handleMenu = (state: any) => {
        setMenuOpen(state.isOpen);
    };

    return (
        <Menu styles={burgerStyle} isOpen={isOpen} onStateChange={handleMenu}>
            <BrowserRouter>
                <Typography variant={"h5"} style={{ textAlign: "center" }}>
                    Tony Power Chimney Cleaning
				</Typography>
                <Divider></Divider>
                <List className={classes.navItems} component="nav">
                    <Link
                        activeClass={classes.navActiveItem}
                        onSetActive={handleState}
                        to="home"
                        spy={true}
                        smooth={true}
                        duration={500}
                    >
                        <ListItem
                            button
                            style={{ borderRadius: 25, textAlign: "center" }}
                            onClick={handleState}
                        >
                            <ListItemText primary="Home" />
                        </ListItem>
                    </Link>
                    </List>
            </BrowserRouter>
        </Menu>
    );
};