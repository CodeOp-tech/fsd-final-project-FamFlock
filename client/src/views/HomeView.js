import React from "react";
import "./HomeView.scss";

function HomeView() {
  return (
    <div>
      <h1>Anonymous Homepage</h1>
      Logo here?
      <p>followed by short description/one-liner about the website</p>
      <h2>Popular Destinations</h2>
      <div className="home-grid">
        <p>
          Barcelona <br />{" "}
          <img
            className="home-grid-image"
            src="https://cdn.theculturetrip.com/wp-content/uploads/2019/08/gettyimages-1025370110crop-1024x576.jpg"
          />{" "}
        </p>

        <p>
          Venice <br />{" "}
          <img
            className="home-grid-image"
            src="https://www.travelandleisure.com/thmb/ZGAXTExb0i7pJw3Mjm4wPnd7Iyo=/1800x1012/smart/filters:no_upscale()/venice-italy-VENICETG0521-cddab02114ae44f08ba49c8c3fc9158c.jpg"
          />{" "}
        </p>

        <p>
          London <br />
          <img
            src="https://www.sbs.ox.ac.uk/sites/default/files/London_0.jpg"
            width="300"
            height="300"
          />{" "}
        </p>

        <p>
          Paris <br />{" "}
          <img
            className="home-grid-image"
            src="https://viajes.nationalgeographic.com.es/medio/2022/07/13/paris_37bc088a_1280x720.jpg"
          />
        </p>
      </div>
      <h2>Plan a trip with us!</h2>
      <p>
        (maybe feature some previews of the website here with some links, but
        they all redirect to login or register)
      </p>
      <h2>Search over 200 destinations for group-friendly activities! </h2>
      <p>(link to/preview of yelp search?)</p>
    </div>
  );
}

export default HomeView;
