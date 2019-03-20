import React from "react";
import "../../index.css";
import { Link } from "react-router-dom";
import logo from "../../images/tailMeLogo.png";

function ContactWalker(props) {
    return (
        <div className="walkerContact">
            <div className="walkerContact__logo">Contact
        </div>
        
        <img className="walkerContact__logo--image" src={logo} alt="tailME logo" ></img>
                
                    <div className="walkerContact__firstName">
                    
                        <label className="walkerContact__firstName--label">
                            First Name
        </label>
        
        
                        <input type="text" placeholder="Your first name here"
                            className="walkerContact__firstName--input">
                        </input>
                        
                    </div>
                    <div className="walkerContact__lastName">
                        <label className="walkerContact__lastName--label">
                            Last Name
        </label>
                        <input type="text" placeholder="Your last name here"
                            className="walkerContact__lastName--input">
                        </input>
                    </div>
                    <div className="walkerContact__userType">
                        <label className="walkerContact__userType--label">
                            What type of user are you?
        </label>
                        <select type="text" placeholder="User type"
                            className="walkerContact__userType--input">
                            <option value="dogWalker">Dog Walker</option>
                            <option value="petWalker">Pet Walker</option>
                            <option value="petOwner">Pet Owner</option>
                        </select>
                    </div>
                    <div className="walkerContact__textArea">
                        <label className="walkerContact__textArea--label">
                            Subject
        </label>
                        <textarea type="text" placeholder="Write us..."
                            className="walkerContact__textArea--input">
                        </textarea>
                    </div>
                    <Link className="walkerContact__link--button" to="/action_page.php">
                        submit
                    </Link>


                

        </div>
    );
}

export default ContactWalker;