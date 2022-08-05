import React from "react";
import "./HomeView.scss";

function HomeView() {
  return (
    <div className="home-view">
      <img
        src="https://64.media.tumblr.com/50b3e1f6dfa32c5f704592cddea46e05/d95c29482615fc08-fb/s1280x1920/b78dc0cef2003278aabae6f6337216e8d0ddcb4e.pnj"
        width="400"
        height="400"
      />
      <h2>Plan a trip with us!</h2>
      <div className="home-feature-1">
        <h2>Plan trips for your group, to any destination</h2>
        <img
          src="https://64.media.tumblr.com/440ff63800e420b8b67912ee6b7a8c52/d95c29482615fc08-3a/s2048x3072/8a175252e7a47a1b3c7b064ac37389546823920d.pnj"
          width="500"
          height="400"
        />
      </div>
      <div className="home-feature-2">
        <img
          src="https://64.media.tumblr.com/471d35189c25fac33facd2bab6c82a31/dae72e0549a3185c-48/s2048x3072/8f69b4cd16dff518e8844a3b167042926b3aa63a.pnj"
          width="500"
          height="400"
        />
        <h2>Use a personalized map to track your group's itinerary</h2>
      </div>
      <div className="home-feature-3">
        <h2>Chat with group members and vote, to make important decisions</h2>
        <img
          src="https://64.media.tumblr.com/887016a28eb65719268bc44bc8685166/d95c29482615fc08-4e/s1280x1920/267e403abd9cf8776cf5961a5b7a37813b840d97.pnj"
          width="500"
          height="400"
        />
      </div>
      <div className="home-feature-4">
        <img
          src="https://64.media.tumblr.com/8e24c0b9ebc283dd074449ba8849bb9e/d95c29482615fc08-b1/s2048x3072/097e973216ef34fedf38b8a1ec44af74064217ab.pnj"
          width="500"
          height="400"
        />
        <h2>Search over 200 destinations for group-friendly activities! </h2>
      </div>
      <h2>Log in or Register to continue!</h2>

      <h2>Our users have planned trips to:</h2>
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
    </div>
  );
}

export default HomeView;
