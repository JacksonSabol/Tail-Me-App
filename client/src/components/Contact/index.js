import React from "react";
import "../../index.css";
import { Link } from "react-router-dom";
import logo from "../../images/tailMeLogo.png";

function Contact(props) {
    return (
        <div className="Contact">
            <div className="Contact__logo">Contact
        </div>

            <img className="Contact__logo--image" src={logo} alt="tailME logo" ></img>

            <div className="Contact__firstName">

                <label className="Contact__firstName--label">
                    First Name
        </label>


                <input type="text" placeholder="Your first name here"
                    className="Contact__firstName--input">
                </input>

            </div>
            <div className="Contact__lastName">
                <label className="Contact__lastName--label">
                    Last Name
        </label>
                <input type="text" placeholder="Your last name here"
                    className="Contact__lastName--input">
                </input>
            </div>
            <div className="Contact__userType">
                <label className="Contact__userType--label">
                    What type of user are you?
        </label>
                <select type="text" placeholder="User type"
                    className="Contact__userType--input">
                    <option value="blank"></option>
                    <option value="petWalker">Pet Walker</option>
                    <option value="petOwner">Pet Owner</option>
                </select>
            </div>
            <div className="Contact__textArea">
                <label className="Contact__textArea--label">
                    Subject
        </label>
                <textarea type="text" placeholder="Write us..."
                    className="Contact__textArea--input">
                </textarea>
            </div>
            <Link className="Contact__link--button" to="/action_page.php">
                submit
                    </Link>




        </div>
    );
}

export default Contact;