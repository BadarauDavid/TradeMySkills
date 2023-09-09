import videoBg from "../video/-60.1 bgVideo.mp4";
import countriesIcon from "../photo/icons/countries.png";
import professionalsIcon from "../photo/icons/businessman.png";
import customersIcon from "../photo/icons/customer-service.png";

export default function MainPage() {
  return (
    <div className="homePage">
      <video src={videoBg} autoPlay loop muted />
      <h1 className="slogan">Every Service Is NOW More Accesible Than Ever</h1>
      <button className="post-offer">
        {" "}
        <a className="post-a" href="/post-offer">
          POST Your Ads NOW FOR FREE
        </a>{" "}
      </button>
      <h1 className="achievementsSoFar">Achievements So Far..</h1>
      <div className="achievements">
        <div className="achievement-group">
          <img src={countriesIcon} alt="Countries" className="icon" />
          <h1 className="countriesNumber">3</h1>
          <h1 className="countriesString">Countries</h1>
        </div>

        <div className="achievement-group">
          <img src={professionalsIcon} alt="Professionals" className="icon" />
          <h1 className="workersNumber">+9,000</h1>
          <h1 className="workersString">Professionals and Businesses</h1>
        </div>

        <div className="achievement-group">
          <img src={customersIcon} alt="Customers" className="icon" />
          <h1 className="customersNumber">+80,000</h1>
          <h1 className="customersString">Satisfied Clients</h1>
        </div>
      </div>

      <div className="partnersMedia">
        <h1 className="partnersMediaTitle">Partners & Media:</h1>
      </div>
      
    </div>
  );
}