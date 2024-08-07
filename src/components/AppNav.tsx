import { useEffect, useState, UIEvent } from 'react';

import { Link } from "react-router-dom"
import "../styles/global/nav.css"


export default function AppNav() {

    //delay is a number, value is a generic


    const [lastScrollTop, setLastScrollTop] = useState<number>(0);
    const [scrollDirection, setScrollDirection] = useState<number>(0); // 'up' or 'down'
    

    // 1000 / 60 This is the default value that we will use
    //TODO: double check tomorrow

    const eventDebounce = (cb: any, delay: number = 1000 / 60) => {
        let timeout = setTimeout(cb, delay);

        return () => {
            clearTimeout(timeout);
        
            timeout = setTimeout(() => {
                cb();
            }, timeout)
        }
    }

    const handleScroll = (): void => {
        const scrollTop = window.scrollY;
    
        if (scrollTop > lastScrollTop) {
            console.log('down')
          setScrollDirection(-1);
        } else if (scrollTop < lastScrollTop) {
            console.log('up')
          setScrollDirection(1);
        }
        setLastScrollTop(scrollTop);
      };
    
      useEffect(() => {
        window.addEventListener('scroll', eventDebounce(handleScroll));
        return () => {
          window.removeEventListener('scroll', eventDebounce(handleScroll));
        };
      }, [lastScrollTop]);



    return (
        <header className={"header-nav".concat(" ", scrollDirection === 1 ? "" : "hide")}>
            <div className='header-nav__logo' aria-roledescription="logo">
              <img src='https://beascout.scouting.org/wp-content/uploads/2022/06/BSALogo-1.png' alt="Official logo of the Boy Scouts of America"/>
              <h1 className='header-nav__title'>Boy Scout Troop 227<span>American Legion Post 205</span></h1>
            </div>
            <nav>
                <ul>
                    <li>
                        <Link to={`/`}>Home</Link>
                    </li>
                    <li>
                        <Link to={`/projects`}>Projects</Link>
                    </li>
                </ul>
            </nav>
        </header>
        
    )
    
    
}

