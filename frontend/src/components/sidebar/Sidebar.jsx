import { useState } from "react";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSearch,
    faBookmark,
    faUser,
    faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";



export default function Sidebar({ changeState }) {
    const [error, setError] = useState("")
    const history = useNavigate()
    const { pathname } = useLocation();
    const currentPage = pathname.slice(1)===''?'search':pathname.slice(1)

    const handleLogout = () => {

    }

    let navigate = useNavigate();
    return (
        <SideNav
            onSelect={(selected) => {
                if (selected === "search") selected = "";
                navigate(`/${selected}`);
            }}
            onToggle={(sidebar_open) => {
                changeState(sidebar_open);
            }}
            className="bg-blue"
        >
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected={currentPage} className='d-flex flex-column' style={{height: 'calc(100% - 64px)'}}>
                <NavItem eventKey="setting">
                    <NavIcon>
                        <FontAwesomeIcon icon={faUser} size={"1x"} />
                    </NavIcon>
                    <NavText>
                        username
                    </NavText>
                </NavItem>
                <NavItem eventKey="search">
                    <NavIcon>
                        <FontAwesomeIcon icon={faSearch} size={"1x"} />
                    </NavIcon>
                    <NavText>search</NavText>
                </NavItem>
                <NavItem eventKey="bookmark">
                    <NavIcon>
                        <FontAwesomeIcon icon={faBookmark} size={"1x"} />
                    </NavIcon>
                    <NavText>bookmark</NavText>
                </NavItem>
                <NavItem eventKey="" onClick={handleLogout} className="mt-auto">
                    <NavIcon>
                        <FontAwesomeIcon icon={faSignOutAlt} size={"1x"} />
                    </NavIcon>
                    <NavText>Logout</NavText>
                </NavItem>
            </SideNav.Nav>
        </SideNav>
    );
}
