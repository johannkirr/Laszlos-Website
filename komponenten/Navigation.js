import { useState, useEffect } from 'react';
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Navigation() {

   const [scrollColor, setScrollColor] = useState('transparent');
   const [linkColor, setLinkColor] = useState('black');

  useEffect(() => {
    function handleScroll() {
      const colorLink = window.pageYOffset > 130 && window.innerWidth >= 800 ? 'white' : 'black';
      const color = window.pageYOffset > 130 && window.innerWidth >= 800 ? 'black' : 'transparent';
      setScrollColor(color);
      setLinkColor(colorLink);
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (


     <nav className='shadow sticky-top' style={{backgroundColor: scrollColor}}>
      <div className="linkDiv">

      <div className="link">
        <Link href="/" className="navbarButton1 paper-btn text-decoration-none" style={{color: linkColor}}>
          Kezdődik
        </Link>
      </div>
      <div className="link">
        <Link href="/gedichte" className=" navbarButton1 paper-btn text-decoration-none" style={{color: linkColor}}> 
          Költészet
        </Link>
      </div>
      <div className="link">
        <Link href="/routen" className=" navbarButton2 paper-btn text-decoration-none" style={{color: linkColor}}> 
           Képtár
        </Link>
      </div>
    </div>
    
      
    </nav>
 

    
  )
}
