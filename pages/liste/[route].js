import Image from 'next/legacy/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import jsonRoute from '../../jsondb/Route'
import { MapIcon } from '@heroicons/react/24/solid'
import { ClockIcon } from '@heroicons/react/24/solid'
import { BackwardIcon } from '@heroicons/react/24/solid'
import { useEffect } from 'react'

export default function RoutenListe() {
    const router = useRouter()
    const { route } = router.query
    const picture = jsonRoute.route.find((a) => a.url === route)
   
    

    if (picture) {
        return (
            <div className="body-zurück">
                <div className="bildDecoration">
                    
                       <div className='cardBody'>
                    
                            <p style={{ width: "100%", paddingTop: "20px", paddingBottom:"0px", paddingLeft:"20px", fontFamily: "Pacifico, cursive", fontSize: "26px" }}>{picture.title1}</p>
                            <p className="text" style={{ width: "100%", padding: "20px", fontFamily: "Open Sans, sans-serif" }}>{picture.beschreibung1}</p>
                            <Image src={picture.bild1} alt={picture.name} layout="responsive" width={360} height={270} />   
                         

                            <p style={{ width: "100%", paddingTop: "20px", paddingBottom:"0px", paddingLeft:"20px", fontFamily: "Pacifico, cursive", fontSize: "26px" }}>{picture.title2}</p>
                            <p className="text" style={{ width: "100%", padding: "20px", fontFamily: "Open Sans, sans-serif" }}>{picture.beschreibung2}</p>
                            <Image src={picture.bild2} alt={picture.name} layout="responsive" width={330} height={320} />
                            
                            <p style={{ width: "100%", paddingTop: "20px", paddingBottom:"0px", paddingLeft:"20px", fontFamily: "Pacifico, cursive", fontSize: "26px" }}>{picture.title3}</p>
                            <p className="text" style={{ width: "100%", padding: "20px", fontFamily: "Open Sans, sans-serif" }}>{picture.beschreibung3}</p>
                            <Image src={picture.bild3} alt={picture.name} layout="responsive" width={300} height={300} />

                            <p style={{ width: "100%", paddingTop: "20px", paddingBottom:"0px", paddingLeft:"20px", fontFamily: "Pacifico, cursive", fontSize: "26px" }}>{picture.title4}</p>
                            <p className="text" style={{ width: "100%", padding: "20px", fontFamily: "Open Sans, sans-serif" }}>{picture.beschreibung4}</p>
                            <Image src={picture.bild4} alt={picture.name} layout="responsive" width={300} height={300} />
                            <p></p>
                            {picture.bild5 && (
                                <div>
                                    <Image src={picture.bild5} alt={picture.name} layout="responsive" width={300} height={300} />
                                    <p><br /></p>
                                </div>
                            )}
                            {picture.bild6 && (
                                <div>
                                    <Image src={picture.bild6} alt={picture.name} layout="responsive" width={300} height={300} />
                                    <p><br /></p>
                                </div>
                            )}
                        </div>

                        
                        <div style={{ display: "flex", alignItems: "center", justifyContent:"space-around" }}>
                            <div style={{ width: "20%", maxWidth: "100%", textAlign:"center" }}>
                                <Image src={picture.laszlo} alt={picture.name} layout="responsive" width={200} height={200} />
                                <span className='kontakt' style={{ display: "block" }}>Kontakt:</span>                               
                                <h3 className='name'>{picture.kontakt}</h3>                              
                                <span className='email' style={{ display: "block" }}><Link href={`mailto:${picture.Email}`}>{picture.Email}</Link></span>
                                <span className='tel' style={{ display: "block" }}>{picture.tel}</span>                               
                            </div>
                            <div style={{ width: "50%", maxWidth: "100%" }}>
                            <Link href={picture.strecke} passHref target="_blank" rel="noopener noreferrer">    
                                <Image className='border border-4 border-white shadow' src={picture.karte} alt={picture.name} layout="responsive" width={360} height={270} />     
                            </Link>

                                <div style={{ justifyContent: "center" }}>
                                    <h4 style={{ color: "black", marginBottom: "5px", marginRight:"10px" }}>
                                        {picture.title}
                                    </h4>
                                    <p style={{ color: "black", marginBottom: "5px" }}>
                                        <MapIcon style={{ width: "30" }} /> {picture.distance}
                                        <span style={{ marginRight: "10px" }}></span>
                                        <ClockIcon style={{ width: "30" }} /> {picture.time}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className='backDiv'>
                            <Link href="../routen" className="linkButton">zurück<BackwardIcon style={{ width: "22" }} /></Link>
                        </div>
                    
                </div>
            </div>
        )
    }
}
