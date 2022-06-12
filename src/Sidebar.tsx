import React, { ReactElement } from 'react';
import {
    CssBaseline,
    Divider, Drawer, Hidden, IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from "@mui/material";
import createStyles from "@mui/styles/createStyles";
import { Theme} from "@mui/system";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ArticleIcon from '@mui/icons-material/Article';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../public/CHainGate_inverted.svg';
import {AuthInfo, clearUser} from "../lib/authInfo/reducers";
import Link from "./Link";
import {useRouter} from "next/router";
import makeStyles from '@mui/styles/makeStyles';
import Image from 'next/image'
import {ClassNameMap} from "@mui/styles";
import SwitchMode from "./SwitchMode";
import Box from "@mui/material/Box";

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        backgroundColor: theme.palette.primary.main,
        position: 'absolute',
        zIndex: 1000,
        borderRadius: 0,
        marginLeft: 0,
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    drawerPaper: {
        boxSizing: 'border-box',
        width: drawerWidth,
    },
    drawerPapertestMode: {
        boxSizing: 'border-box',
        width: drawerWidth,
        backgroundColor: 'lightcyan',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
            marginTop: '0',
        },
    },
    userItem: {
        backgroundColor: theme.palette.primary.main,
    },
}));

type Page = {
    uri: string,
    label: string,
    icon: ReactElement,
};

interface NavigationAction {
    label: string,
    icon: ReactElement,
    fn: () => void,
}

/**
 * Renders the sidebar
 * @constructor
 */
export default function Sidebar() {
    const dispatch = useAppDispatch();
    const classes: ClassNameMap = useStyles();
    const router = useRouter();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const currentUser: AuthInfo = useAppSelector((state) => state.internal.authInfo);
    const mode = useAppSelector((state) => state.internal.mode.mode);

    const handleSignout = () => {
        dispatch(clearUser());
        router.push('/login');
    };

    const handleApiDoc = () => {
        const swaggerDocUrl = "http://localhost:8000/api/public/swaggerui/"
        const win = window.open(swaggerDocUrl, "_blank")
        win?.focus();
    }

    const handleDoc = () => {
        const win = window.open('/doc', "_blank")
        win?.focus();
    }

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const closeDrawer = () => {
        setMobileOpen(false);
    };

    const pages : Page[] = [
        { uri: '/dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
        { uri: '/config', label: 'Configuration', icon: <SettingsIcon  /> },
    ];

    const secondaryPages : NavigationAction[] = [
        { fn: handleSignout, label: 'Ausloggen', icon: <ExitToAppIcon /> },
        { fn: handleApiDoc, label: 'Swagger Doc', icon: <ArticleIcon  /> },
        { fn: handleDoc, label: 'API Doc', icon: <ArticleIcon  /> },
    ];

    const drawer = (
        <div>
            <div className="logo-container">
                <Image height={142} width={230} src={logo} alt="Logo CHainGate" className="logo" />
            </div>
            <Divider />
            <List className={classes.userItem} style={{color: 'white'}}>
                <ListItem>
                    <ListItemIcon>
                        <AccountCircleIcon style={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText style={{overflow: 'hidden', textOverflow: "ellipsis"}}  primary={currentUser.firstName} />
                </ListItem>
            </List>
            <Divider />
            <List>
                {pages.map((page) => (
                    <Link href={page.uri} key={page.uri}>
                        <ListItem
                            key={page.uri}
                            onClick={closeDrawer}
                        >
                            <ListItemIcon>
                                {page.icon}
                            </ListItemIcon>
                            <ListItemText primary={page.label} />
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider />
            <List>
                {secondaryPages.map((page) => (
                    <ListItem button onClick={page.fn} key={page.label}>
                        <ListItemIcon>
                            {page.icon}
                        </ListItemIcon>
                        <ListItemText primary={page.label} />
                    </ListItem>
                ))}
            </List>
            <Box position='absolute' bottom={0}>
                <List>
                    <ListItem>
                        <SwitchMode/>
                    </ListItem>
                </List>
            </Box>
        </div>
    );

    return (
        <div className={classes.root}>
            <CssBaseline />
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                </Hidden>
                <Hidden smDown implementation="css">
                    <Drawer
                        classes={{
                            paper: mode == "main" ? classes.drawerPaper : classes.drawerPapertestMode,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
            </main>
        </div>
    );
}