import React, { useState } from "react";
import { Link } from "react-scroll";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Router } from "react-router-dom";
import {
	AppBar,
	Toolbar,
	List,
	ListItem,
	ListItemText,
} from "@material-ui/core";

import { createBrowserHistory } from "history";

const history = createBrowserHistory();


const useStyles = makeStyles({
	root: {
		flexGrow: 1,
	},
	navBar: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		transition: "background-color 0.5s ease-in-out",
		height: "5%",
	},
	navItems: {
		display: "flex",
		flexDirection: "row",
		paddingLeft: "30px",
		textTransform: "uppercase",
	},
	navActiveItem: {
		color: "rgb(101, 58, 150)",
		borderRadius: 25,
	},
});

export const NavbarDesktop: React.FC = () => {
	const classes = useStyles();
	const [active, setActive] = useState(false);

	const handleState = (to: any) => {
		if (to === "home") {
			setActive(true);
			history.push("/");
		} else {
			setActive(false);
			history.push(`/${to}`);
		}
	};

	return (
		<Paper className={classes.root}>
			<AppBar
				elevation={active ? 0 : 5}
				className={classes.navBar}
				style={
					active
						? { backgroundColor: "transparent" }
						: { backgroundColor: "#e3e3e3" }
				}
			>
				<Toolbar>
					<Router history={history}>
						<List
							className={classes.navItems}
							component="nav"
							style={active ? { color: "white" } : { color: "#575757" }}
						>
							<Link
								activeClass={classes.navActiveItem}
								onSetActive={handleState}
								to="search"
								spy={true}
								smooth={true}
								duration={500}
							>
								<ListItem button style={{ borderRadius: 25 }}>
									<ListItemText primary="Search" />
								</ListItem>
							</Link>

							
						</List>
					</Router>
				</Toolbar>
			</AppBar>
		</Paper>
	);
};