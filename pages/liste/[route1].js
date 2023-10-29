import Image from 'next/image'
import Link from 'next/link'
import {useRouter} from 'next/router'
import jsonRoute1 from '../../jsondb/Route'
import { MapIcon } from '@heroicons/react/24/solid'
import { ClockIcon } from '@heroicons/react/24/solid'


export default function RoutenListe() {

    const router = useRouter()
    const {route1} = router.query
    const picture = jsonRoute1.route1.find((a) => a.url === route1)

    if(picture) {

  return (
    <div>
      <div className="bildDecoration">
        <div className="urlBild">

            <div className="firstBlock">
            <Link href={picture.strecke}>
                <Image className='border border-4 border-white shadow' src={picture.karte} alt={picture.name} width={360} height={270} />
            </Link>
            <h4 style={{color: "black", width:"auto"}} className="titles">{picture.title}
                  <span style={{ marginRight: "10px" }}></span>...
                  <MapIcon style={{width:"20"}}/>{picture.distance} 
                  <span style={{ marginRight: "10px" }}></span>
                  <ClockIcon style={{width:"20"}}/> {picture.time}</h4>
            </div>

            <div className='cardBody'>

                  <div className="firstBlock">
                  <Image src={picture.bild1} alt={picture.name} width={360} height={270} ></Image>
                  <h5 className="text" style={{width:"350px", padding:"10px"}}>{picture.beschreibung1}</h5>
                  </div>
                 

                  <Image src={picture.bild2} alt={picture.name} width={330} height={320} ></Image>
                  <p className="text" style={{ width:"350px", padding:"10px"}}>{picture.beschreibung2}</p>
                  <Image src={picture.bild4} alt={picture.name} width={300} height={300} ></Image>
                  <p><br/></p>
                  <Image src={picture.bild3} alt={picture.name} width={300} height={300} ></Image>
                  <p><br/></p>
                  {picture.bild5 && (
                      <div>
                        <Image src={picture.bild5} alt={picture.name} width={300} height={300} />
                        <p><br /></p>
                      </div>
                    )}  

                    {picture.bild6 && (
                      <div>
                        <Image src={picture.bild6} alt={picture.name} width={300} height={300} />
                        <p><br /></p>
                      </div>
                    )}            
              </div>
                
                <div className='backDiv'>
                  <Link href="../routen" className="linkButton">zurück</Link>
                </div>
        </div>
    </div>
    </div>
  ) 
    }
}