import Link from "next/link"
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Fusszeile() {
  return (
    <div>
      <div className="fixed-bottom bg-black" style={{display: "flex", justifyContent:"right", opacity:0.8}}>
      <div className="footerButtons">
          <Link href="/datenschutz" className="datenschutzText paper-btn" style={{backgroundColor:"transparent", color:"grey", textDecoration:"none"}} >
            Adatvédelem
          </Link>
          <Link href="/impressum" className="impressumText paper-btn" style={{backgroundColor:"transparent", color:"grey", textDecoration:"none"}}>
            Impresszum
          </Link>
        </div>
      </div>
    </div>
  )
}
