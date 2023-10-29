import Image from 'next/image'
import Link from "next/link"
import jsonRoute1 from '../jsondb/Route'
import { MapIcon } from '@heroicons/react/24/solid'
import { ClockIcon } from '@heroicons/react/24/solid'



export default function Route1() {


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };


  return (
    
       <div className="bilderMap">

{jsonRoute1.route1.map((map) => (
                <div key={map.id} className="einzelBild">
                    <Link href={`/liste/${map.url}`}>
                        <Image variant="top" src={map.bild1} width={180} height={100} alt="Skizze" className="image-width-100"/>
                    </Link>   
                  <h5>{map.title}
                  <span style={{ marginRight: "10px" }}></span>...
                  <MapIcon style={{width:"20"}}/>{map.distance} 
                  <span style={{ marginRight: "10px" }}></span>
                  <ClockIcon style={{width:"20"}}/> {map.time}</h5>  
                </div> 
            ))}

          <div>
            {/* "Nach oben scrollen-Link" */}
            <Link href="#" onClick={scrollToTop} className="scroll-to-top-button" >hinauf</Link> 
          </div>
   
    </div>
  )
}