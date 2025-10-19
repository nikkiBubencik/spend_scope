import NavIcon from '../NavIcon/NavIcon';
import './Header.css';

interface HeaderProps {
  toggleSidebar: () => void; // function that takes no args, returns void
}

function Header({ toggleSidebar }: HeaderProps){
    function clearStorage(){
        window.localStorage.clear();
    }

    return(
        <div className="header-container">
            <h1>Spend Scope</h1>
            {/* temporary button to clear local storage */}
            {/* <button onClick={clearStorage}>Clear LocalStorage</button> */}
            <NavIcon toggleSidebar={toggleSidebar}/>
        </div>
    )
}

export default Header;