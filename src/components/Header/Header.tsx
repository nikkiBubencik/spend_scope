import './Header.css';

function Header(){
    function clearStorage(){
        window.localStorage.clear();
    }

    return(
        <div className="header-container">
            <h1>Spend Scope</h1>
            {/* temporary button to clear local storage */}
            <button onClick={clearStorage}>Clear LocalStorage</button>
        </div>
    )
}

export default Header;