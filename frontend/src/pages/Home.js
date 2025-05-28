import { Col, Container, Row } from 'react-bootstrap';
import FeaturedCard from '../components/FeaturedCard';
import OutlineButton from '../components/OutlineButton';
import CTABillboard from '../assets/images/call-to-action.jpg';
import './css/Home.css'
import { useEffect, useState } from 'react';
import Landing from '../components/Landing';
import ShopItemCard from '../components/ShopItemCard';

function Home() {
    const [hitmen, setHitmen] = useState();
    const [products, setProducts] = useState();
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState(null);

    useEffect (() => {
        const _user = JSON.parse(localStorage.getItem("loggedInUser"));
        const _cart = JSON.parse(localStorage.getItem("userCart"));

        if (_user) setUser(_user);
        if (_cart) setCart(_cart);
    }, []);

    return (
        <div className="home-container">
           
            <div className='landing-hero-section'>
                <Landing/>
               
            </div>

            <Container className='landing-cta-section'>
                <Row className='cta-rows-container'>
                    <Col md="8" className='cta-image-row'>
                        <div className='cta-image-container'>
                            <img className='cta-image' src={CTABillboard}/>
                        </div>
                    </Col>
                    <Col md="4" className='cta-text-row'>
                        <h2 className='cta-heading'>HEY, YOU</h2>
                        <p className='cta-text'>Welcome to the Internet's worst-kept secret. Whether it's your boss, your ex, or that guy who double parked in your spot... We “fix” problems. You just send the name. We handle the rest.</p>
                        <h2 className='cta-heading'>ALREADY PART OF THE UNDERGROUND ELITE?</h2>
                        <p className='cta-text'>Already part of the underground elite? Sign in to access your hit history, view progress, or upgrade to Premium Discreet&trade;.</p>
                        <div className='cta-button-container'>
                            <OutlineButton buttonLabel={user? "Shop Now" : "Log In"} buttonLink={user ? "/shop":"/log-in"}/>
                        </div>
                    </Col>
                </Row>
                <hr className='hitmen-divider'/>
                <Row className='featured-row'>
                    <h3 id='featured-hitmen-title'>Featured Hitmen</h3>
                    {hitmen ? hitmen.map((index) =>
                        <Col sm='6' md='3'>
                            <FeaturedCard
                                description={index.description}
                                image={index.image}
                                name={index.name}
                                price={index.price}
                            />
                        </Col>
                    ):
                    
                    <Col sm = '6' md='3'>
                        <FeaturedCard/>
                    </Col> }
                </Row>
                <hr className='products-divider'/>
                <Row className='featured-row'>
                    <h3 id='featured-products-title'>Featured Products</h3>
                    {products ? products.map((index) =>
                        <Col sm='3'>

                            {/* this shop item is not working yet */}

                            <ShopItemCard
                                productImage={index.image}
                                productName={index.name}
                                productPrice={index.price}
                                productRating={index.rating}
                            />
                        </Col>
                    ):
                    <Col sm = '6' md = '3'>
                        <FeaturedCard/>
                    </Col> }
                </Row>
            </Container>
        </div>
    )
}

export default Home;