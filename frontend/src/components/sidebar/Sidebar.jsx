import { useLocation, useNavigate } from "react-router-dom";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faPlus,
    faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

import { logout } from '../../api/api'

export default function Sidebar({ changeState }) {
    const { pathname } = useLocation();
    const currentPage = pathname.slice(1)===''?'home':pathname.slice(1)

    let navigate = useNavigate();
    return (
        <SideNav
            onSelect={(selected) => {
                if (selected === "home") selected = "";
                navigate(`/${selected}`);
            }}
            onToggle={(sidebar_open) => {
                changeState(sidebar_open);
            }}
            className="bg-blue position-fixed"
        >
            <SideNav.Toggle />

            <SideNav.Nav defaultSelected={currentPage} className='d-flex flex-column' style={{height: 'calc(100% - 64px)'}}>
                <NavItem eventKey="home">
                    <NavIcon>
                        <FontAwesomeIcon icon={faHome} size={"1x"} />
                    </NavIcon>
                    <NavText>Home</NavText>
                </NavItem>

                <NavItem eventKey="new">
                    <NavIcon>
                        <FontAwesomeIcon icon={faPlus} size={"1x"} />
                    </NavIcon>
                    <NavText>Create Contact</NavText>
                </NavItem>

                <NavItem eventKey="" onClick={logout} className="mt-auto">
                    <NavIcon>
                        <FontAwesomeIcon icon={faSignOutAlt} size={"1x"} />
                    </NavIcon>
                    <NavText>Logout</NavText>
                </NavItem>
            </SideNav.Nav>
        </SideNav>
    );
}
