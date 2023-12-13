import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

import './Navigation.css';


const ESC_KEY_CODE = 'Escape';

export const NavigationMenu = (props) => {
    const {
        navOpen,
        navIsAnimating,
        closeNav,
    } = props;
    const keyPressHandler = ({ key }) => {
        if (key === ESC_KEY_CODE && navOpen) {
            closeNav();
        }
    };
    React.useEffect(() => {
        window.addEventListener('keydown', keyPressHandler);
        return () => {
            window.removeEventListener('keydown', keyPressHandler);
        };
    }, [navOpen]);
    const classes = `${navOpen ? ' active' : ''}${navIsAnimating ? ' is-animating' : ''}`;
    return (
        <div className={`navigation-menu${classes}`}>
            <div className="wrap">
                <div className="cols">
                    <div className="col col-left col-text">
                        <p className='text'> Wunderfauks is an integrated creative agency focusing on new and innovative experiences. From the likes of creative expression to a campaign execution, communication and creative implementation, Wunderfauks provides tailored bulls-eye solutions that focus on results over activities.</p>
                        <p className='text1'> With digital as our strong suit, we have a dynamic team comprising of multi-disciplinary individuals with their own think tanks of interesting ideas and concepts to suit any need, logic and aspiration.</p>
                        <p className='copyright'>© 2023</p>
                    </div>
                    <div className="col col-right col-links">
                        <div className="social-icons">
                            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <FaFacebookF />
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <FaInstagram />
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <FaLinkedinIn />
                            </a>
                        </div>
                        <ul className="links">
                            <li className="link">
                                <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Navigates to"
                                >
                                    WORK
                                </a>
                            </li>
                            <li className="link">
                                <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Navigates to"
                                >
                                    SERVICES
                                </a>
                            </li>
                            <li className="link">
                                <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Navigates to"
                                >
                                    APPROACH
                                </a>
                            </li>
                            <li className="link">
                                <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Navigates to"
                                >
                                    CAREERS
                                </a>
                            </li>
                            <li className="link">
                                <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Navigates to"
                                >
                                    SME INITIATIVE
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const Header = (props) => {
    const {
        navOpen,
        navIsAnimating,
        toggleNavHandler,
    } = props;
    const headerStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    };
    const logoStyle = {
        position: 'absolute',
        top: '20px',
        left: '20px',
        width: '200px',
        height: 'auto',
    };
    return (
        <header
            className="header"
            style={headerStyle}
        >
            <div className="wrap">
                <button
                    className={`nav-button${navIsAnimating ? ' is-animating' : ''}${navOpen ? ' active' : ''}`}
                    type="button"
                    aria-label="Toggle Navigation"
                    onClick={event => toggleNavHandler(event)}
                >
                    <span className={`short-line${navOpen ? ' cross' : ''}`}></span>
                    <span className={`long-line${navOpen ? ' cross' : ''}`}></span>
                </button>

                <a href='#'> <img
                    src="/wunderfauks.png"
                    alt="Logo"
                    className="logo"
                    style={logoStyle}
                /> </a>
            </div>
        </header>
    );
};

class App extends React.Component {
    state = {
        navOpen: false,
        navIsAnimating: false,
    };

    toggleNav = (event) => {
        event.preventDefault();
        const { navOpen } = this.state;
        if (event) event.preventDefault();
        this.setState({
            navIsAnimating: true,
        });
        if (navOpen) document.body.classList.remove('circular-animation');
        if (!navOpen) document.body.classList.add('circular-animation');
        setTimeout(() => {
            this.setState({
                navIsAnimating: false,
                navOpen: !navOpen,
            });
            document.body.classList.remove('circular-animation');
        }, 500);
    };


    openNav = (event) => {
        if (event) event.preventDefault();
        document.body.classList.add('nav-open');
        this.setState({
            navOpen: true,
        });
    };

    closeNav = () => {
        document.body.classList.remove('nav-open');
        this.setState({
            navOpen: false,
        });
    };

    render() {
        const {
            navOpen,
            navIsAnimating,
        } = this.state;
        return (
            <div className="layout">
                <Header
                    navOpen={navOpen}
                    toggleNavHandler={event => this.toggleNav(event)}
                    navIsAnimating={navIsAnimating}
                />
                <NavigationMenu
                    navOpen={navOpen}
                    navIsAnimating={navIsAnimating}
                    closeNav={event => this.closeNav(event)}
                    toggleNavHandler={event => this.toggleNav(event)}
                />

            </div>
        );
    }
}


