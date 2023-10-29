import Navigation from "./Navigation";
import Fusszeile from "./Fusszeile";


export default function Layout({children}) {
  return (
    <div>
      <Navigation/>
        <div className="container">
            {children}
        </div>
      <Fusszeile/>
    </div>
  )
}
