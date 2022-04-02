import React,{FC} from "react";
import "./App.css";
import {NavbarDesktop} from "../navbar/NavbarDesktop";
import {NavbarMobile} from "../navbar/NavbarMobile";
import {Search} from "../sections/Search";
import { isMobile } from "react-device-detect";

const App:FC = () => {
    const ResponsiveNav: FC = () => {
        if (isMobile){
            return <NavbarMobile/>
        }
        else{
            return <NavbarDesktop/>
        }
        }
    return (
        <div className="App">
            <Search/>
        </div>
    );
}

export default App;