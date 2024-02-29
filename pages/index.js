import { useState, useEffect } from 'react';
import Image from "next/image";
import Berg from '../public/bilder/Berg.jpg'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Home() {

  const [hidden, setHidden] = useState(true)

    useEffect(() => {
        function handleScroll() {
          if(window.scrollY > 10 && window.innerWidth > 800)
            setHidden(false);
          else {
            setHidden(true)
          }
        }

        window.addEventListener('scroll', handleScroll);
            return () => {
                window.removeEventListener('scroll', handleScroll)
            };
        },[]);



  return (
    <div className="indexBody">

      <div className="BergBild">
        <Image className='Berg1' src={Berg} width={850} height={120} alt={'Berg'}/>
      </div>
   
   <div>
    <div className="containter shadow shadow-5">

    <h1>Sziasztok zarándokok</h1>
     <p className={`pText ${hidden && 'hidden'}`}> 
     Engedje meg, hogy bemutatkozzam. Laszlo Földessy vagyok, és a Nitra régióban születtem. Ez az otthonom és az ősaimé. Szeretetem 
     ez a régió és annak fejlődése olyannyira meghatározott, hogy sok verset írtam róla.
     <br/>
     <br/>
     Szabad adomány ellenében elérhetővé teszem tudásomat csoportok és egyéni utazók számára, hogy elkalauzoljam Önöket ezen a 
     lenyűgöző régió történelmi útján. Részletes ismeretekkel a múltból és a terület kulturális és vallási vonatkozásainak mély megértésével 
     segítek belevetni magukat az elmúlt korszakokba és felfedezni az örökség szépségét. Már kérdeztek maguktól arról, hogy miért létezik egy 
     magyar kisebbség ebben a régióban, vagy hogy miért veszítette el Attila hun király 440. évben és hogyan befolyásolta politikai és 
     kulturális tájképét? Tehát, ha szeretnének felfedezni Nitrat és környékét, elmélyedni a lenyűgöző történelemben, és megismerni Magyarország 
     jelentős szerepét a régióban, akkor nem csak nagy örömmel kísérlek el, hanem ez az én kötelességem is, mint nitrai születésű magyar.
      <br/>
      <br/>
      Alig várom, hogy találkozhassunk.
      <br/>
      <br/>
      <br/>
      <br/>
     </p>
   </div>

   </div>

   </div>
  )
}



   

