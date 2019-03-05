import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "../index.css";
import logo from "../images/tailMeLogo.png";
import Footer from "../components/Footer";
import Background from "../images/splashImage_01.jpg";
import Icon from "../images/walkIconLight.png";
// import certificationIcon from "../images/certificationIcon.png";
import imagesIcon from"../images/imagesIcon.png";
import inviteIcon from "../images/inviteIcon.png";
// import logoutIcon from "../images/logoutIcon.png";
import mapIcon from "../images/mapIcon.png";
import profileIcon from "../images/profileIcon.png";
import scheduleIcon from "../images/scheduleIcon.png";
import walkIcon from "../images/walkIcon.png";


class splashWalker extends Component {
    render() {
        return (
            <div className="walkersplash">
                <div className="walkersplash__nav">
                    <a className="walkersplash__nav--userregistration"  href="/user/Login">
                        owner log in
                        </a>
                
                    <a className="walkersplash__nav--walkerauthentification" href="/walker/signup">
                        walker sign up
                    </a>
                    <a className="walkersplash__nav--walkerregistration" href="/user/LoginWalker">
                        walker log in
                    </a>
                    </div>
                <div className="walkersplash__bg">
                    <img className="walkersplash__bg--icon" src={Icon} alt="dog icon"></img>
                    <div className="walkersplash__bg--headingT">T</div>
                    <div className="walkersplash__bg--headinga">a</div>
                    <div className="walkersplash__bg--headingi">i</div>
                    <div className="walkersplash__bg--headingl">l</div>
                    <div className="walkersplash__bg--headingm">M</div>
                    <div className="walkersplash__bg--headinge">e</div>
                    <div className="walkersplash__bg--subheadingA">The place for independent DOG walkers </div>
                    <div className="walkersplash__bg--subheadingB">to manage their clients </div>
                    <div className="walkersplash__bg--imageshadow">
                        <img className="walkersplash__bg--image" src={Background} alt="open field"></img>
                    </div>
                </div>
                <div className="walkersplash__grid">
                    <img className="walkersplash__grid--logo" src={logo} alt="tailME logo" ></img>
                    <div className="walkersplash__grid--text">TailMe is a service for professional dog walkers. We are dedicated to helping them providing a premium experience to their clients through 
                         better and easier management of their business. We want to see all  puppies happy and well exercised. Here at TailMe we 
                         know the challenges of running a small business, that you love, and we strive to facilitate that by keeping those schedules filled and 
                         your clientele satisfied. To that end we've developed a tool that allows you to intake chosen users, interact with them  more meaningfully, 
                         manage accounts with greater effeciency and, if you choose, grow your business.  Join us and together we will help keep more healthy tails wagging!</div>
                    {/* <div className="walkersplash__grid--profile"> */}
                    <img className="walkersplash__grid--profileIcon" src={profileIcon} alt="profile icon"></img>
                    <div className="walkersplash__grid--profileText">
                    Create and maintain your profile. Theme it to your business. Define your services.  It's up to you!
                    </div>
                    {/* </div> */}
                    {/* <div className="walkersplash__grid--walk"> */}
                    <img className="walkersplash__grid--walkIcon" src={walkIcon} alt="walk icon"></img>
                    <div className="walkersplash__grid--walkText">
                    Manage your daily walk schedule. Check in, check out, keep your clients informed.
                    </div>
                    {/* </div>
                    <div className="walkersplash__grid--schedule"> */}
                    <img className="walkersplash__grid--scheduleIcon" src={scheduleIcon} alt="schedule icon"></img>
                    <div className="walkersplash__grid--scheduleText">
                    Keep your schedule organized and full. Fill open slots and give your clients better service.
                    </div>
                    {/* </div>
                    <div className="walkersplash__grid--invite"> */}
                    <img className="walkersplash__grid--inviteIcon" src={inviteIcon} alt="invite icon"></img>
                    <div className="walkersplash__grid--inviteText">
                    Invite new clients. You decide who you want to schedule
                    </div>
                    {/* </div>
                    <div className="walkersplash__grid--map"> */}
                    <img className="walkersplash__grid--mapIcon" src={mapIcon} alt="map icon"></img>
                    <div className="walkersplash__grid--mapText">
                    Plot your route or send clients notifications where you are. Customize the information you want to share.
                    </div>
                    {/* </div>
                    <div className="walkersplash__grid--images"> */}
                    <img className="walkersplash__grid--imagesIcon" src={imagesIcon} alt="images icon"></img>
                    <div className="walkersplash__grid--imagesText">
                    Maintain a gallery of images. Send them to clients, use them for promotion or just enjoy cute pictures of puppies!
                    </div>
                    {/* </div> */}

                    <div className="walkersplash__footer">
                        <Footer />
                    </div>
                </div>
            </div>

        )
    }
}
export default splashWalker