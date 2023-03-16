import { useState } from "react";
import classNames from "classnames";
import './Menu.css';

const Menu = () => {
    // New User vars
    const [firstName, setFirst]   = useState('');
    const [lastName, setLast]     = useState('');
    const [points, setPoints]     = useState(-1);
    const [userIDC, setIDC]       = useState(-1);
    // Delete User vars
    const [userID, setID]         = useState(-1);
    // Search User vars
    const [firstNameS, setFirstS] = useState('');
    const [lastNameS, setLastS]   = useState('');
    // Banner vars
    const [message, setMessage]   = useState('');
    const [success, setSuccess]   = useState(false);
    const [cVisible, setCBanner]  = useState(false);
    const [sVisible, setSBanner]  = useState(false);
    const [dVisible, setDBanner]  = useState(false);

    // Support functions
    function wait(delay) {
        return new Promise(res => setTimeout(res, delay));
    }

    function resetVars() {
        setFirst('');
        setLast('');
        setPoints(-1);
        setIDC(-1);
        setFirstS('');
        setLastS('');
        setID(-1);

        // Kill banners too
        setCBanner(false);
        setSBanner(false);
        setDBanner(false);
    }

    function badInput() {
        console.log("Invalid inputs!");
        setMessage("Inputs empty or invalid");
        setSuccess(false);
    }

    return (
        <div className="menu">
            <h2>New User</h2>
            {/* Stop freaking reloading */}
            <form className="vform" onSubmit={(e) => e.preventDefault()}>
                <label>Last Name:</label>
                <input 
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLast(e.target.value)}
                />
                <label>First Name:</label>
                <input 
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirst(e.target.value)}
                />
                <label>Points (int over -1):</label>
                <input 
                    type="text"
                    required
                    value={points}
                    onChange={(e) => setPoints(e.target.value)}
                />
                <label>ID (positive int):</label>
                <input 
                    type="text"
                    required
                    value={userIDC}
                    onChange={(e) => setIDC(e.target.value)}
                />
                <button
                    value="Create User"
                    onClick={async () => {
                        setCBanner(false);
                        await wait(100);

                        if (firstName && lastName && points >= 0 && userIDC > 0) {
                            const toSend   = { firstName, lastName, points, userIDC };
                            const response = await fetch("/create", {
                                method: "POST",
                                headers: {
                                    'Content-Type' : 'application/json'
                                },
                                body: JSON.stringify(toSend)
                            });
    
                            /* Check success */
                            if (response.ok) {
                                console.log("User successfully created");
                                setMessage("User successfully created");
                                setSuccess(true);
                            } else if (response.status == 422) {
                                badInput();
                            } else {
                                console.log("Failed to create new user");
                                setMessage("Failed to create new user");
                                setSuccess(false);
                            };
                        } else {
                            badInput();
                        };
    
                        /* Reset vars & display banner */
                        resetVars();
                        setCBanner(true);
                    }
                }>Create User</button>
            </form>
            <div className={classNames({
                banner: true,
                success: success,
                failure: !success,
                visible: cVisible
            })}>{message}</div>
            <h2>Search User</h2>
            {/* Stop freaking reloading */}
            <form className="vform" onSubmit={(e) => e.preventDefault()}>
                <label>Last Name:</label>
                <input 
                    type="text"
                    required
                    value={lastNameS}
                    onChange={(e) => setLastS(e.target.value)}
                />
                <label>First Name:</label>
                <input 
                    type="text"
                    required
                    value={firstNameS}
                    onChange={(e) => setFirstS(e.target.value)}
                />
                <button
                    value="Search"
                    onClick={async () => {
                        setSBanner(false);
                        await wait(100);
                        
                        if (firstNameS && lastNameS) {
                            const toSend   = { firstNameS, lastNameS };
                            const response = await fetch("/search", {
                                method: "POST",
                                headers: {
                                    'Content-Type' : 'application/json'
                                },
                                body: JSON.stringify(toSend)
                            });
    
                            /* Check success */
                            if (response.ok) {
                                console.log("User successfully created");
                                setMessage("User successfully created");
                                setSuccess(true);
                            } else if (response.status == 404) {
                                console.log("Failed to find user");
                                setMessage("Failed to find user");
                                setSuccess(false);
                            } else {
                                console.log("Couldn't contact server");
                                setMessage("Couldn't contact server");
                                setSuccess(false);
                            };
                        } else {
                            badInput();
                        }
    
                        /* Reset vars & display banner */
                        resetVars();
                        setSBanner(true);
                    }
                }>Search</button>
            </form>
            <div className={classNames({
                banner: true,
                success: success,
                failure: !success,
                visible: sVisible
            })}>{message}</div>
            <h2>Remove User</h2>
            {/* Stop freaking reloading */}
            <form className="vform" onSubmit={(e) => e.preventDefault()}>
                <label>ID (positive int):</label>
                <input 
                    type="text"
                    required
                    value={userID}
                    onChange={(e) => setID(e.target.value)}
                />
                <button
                    value="Delete User"
                    onClick={async () => {
                        setDBanner(false);
                        await wait(100);

                        if (userID > 0) {
                            const toSend   = { userID };
                            const response = await fetch("/delete", {
                                method: "POST",
                                headers: {
                                    'Content-Type' : 'application/json'
                                },
                                body: JSON.stringify(toSend)
                            });
    
                            /* Check success */
                            if (response.ok) {
                                console.log("User successfully deleted");
                                setMessage("User successfully deleted");
                                setSuccess(true);
                            } else if (response.status == 404) {
                                console.log("ID not found");
                                setMessage("ID not found");
                                setSuccess(false);
                            } else {
                                console.log("Couldn't contact server");
                                setMessage("Couldn't contact server");
                                setSuccess(false);
                            };
                        } else {
                            badInput();
                        }
    
                        /* Reset vars & display banner */
                        resetVars();
                        setDBanner(true);
                    }
                }>Delete User</button>
            </form>
            <div className={classNames({
                banner: true,
                success: success,
                failure: !success,
                visible: dVisible
            })}>{message}</div>
        </div>
    );
}
 
export default Menu;