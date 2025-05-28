import { Link, NavLink } from 'react-router-dom';
import './css/Navbar.css';
import SmallLogo from '../assets/images/logo_hit_me_up8x.png';
import OutlineButton from './OutlineButton';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import EmptyCart from '../assets/glyphs/EmptyCart.svg';
import FullCart from '../assets/glyphs/FullCart.svg';
import Cart from '../pages/Cart';
import App from '../App';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function Navbar() {
    
const navigate = useNavigate();


    const [user, setUser] = useState(null);
    const [cart, setCart] = useState(null);

    const navHeading = [{
        value: '/',
        label:"HOME"
    },{
        value: '/shop',
        label:"SHOP"
    },{
        value: '/about',
        label:"ABOUT"
    },{
        value: '/product',
        label:"Admin"
    }]

    useEffect(() => {
        const _user = JSON.parse(localStorage.getItem("loggedInUser"));
        const _cart = JSON.parse(localStorage.getItem("userCart"));

        if (_user) setUser(_user);
        if (_cart) setCart(_cart);
    }, []);

    async function CheckCredentials() {
        try {
            const _user = await axios.get('http://localhost:5000/api/users/logged');
            if (_user) setUser(_user);
        } catch (error) {
            console.log(error);
        }
    }

    ///logout function
       async function LogOut() {
    try {
        await axios.get('http://localhost:5000/api/users/logout', {
            withCredentials: true,
        });

        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("userCart");

        setUser(null);
        setCart(null);

        // ✅ Go to home page
        navigate('/');
    } catch (error) {
        console.error("Logout failed", error);
    }
}

    useEffect(() => {
        CheckCredentials();
    }, []);

    return (
        <div className="navbar-container">
            <Link className='logo-link' to='/'>
                <img className='logo-image' src={SmallLogo} alt="Logo"/>
            </Link>

            <div className="center-buttons">
                {navHeading.map((_heading) => (
                    <NavLink 
                        key={_heading.value}
                        to={_heading.value}
                        className="navbar-link"
                        style={({ isActive }) => ({
                            fontWeight: isActive ? '800' : 'normal'
                        })}
                    >
                        {_heading.label}
                    </NavLink>
                ))}
            </div>

            {user ? 
            <div className='user-nav-buttons'>
                <button className='logout-button' onClick={LogOut}>
                    Logout
                </button>
                <Link to='/cart'>
                    <img src={cart ? FullCart : EmptyCart} alt='Cart'/>
                </Link>
            </div>
            :
            <Link to='/log-in' id='entry-button-link'>
                <Button id='entry-button'>
                    LOG IN/SIGN UP
                </Button>
            </Link>
            }
        </div>
    )
}

export default Navbar;
