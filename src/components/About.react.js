import React from 'react/addons';
import Router from 'react-router';
import RetinaImage from 'react-retina-image';


var Preferences = React.createClass({
  mixins: [Router.Navigation],
  getInitialState: function () {
	  return {};
  },
  handleGoBackClick: function () {
  },
  render: function () {
    return (
      <div className="preferences">
        <div className="about-content">
          <a onClick={this.handleGoBackClick}>Go Back</a>
          <div className="items">
            <div className="item">
              <RetinaImage src="cartoon-kitematic.png"/>
              <h4></h4>
              <p></p>
            </div>
          </div>
          <h3>Kitematic is built with:</h3>
          <div className="items">
            <div className="item">
              <RetinaImage src="cartoon-docker.png"/>
              <h4>Docker Engine</h4>
            </div>
            <div className="item">
              <RetinaImage src="cartoon-docker-machine.png"/>
              <h4>Docker Machine</h4>
              <p></p>
            </div>
          </div>
          <h3>Third-Party Software</h3>
          <div className="items">
            <div className="item">
              <h4>VirtualBox</h4>
              <p></p>
            </div>
          </div>
          <div className="items">
            <div className="item">
              <h4>Electron</h4>
              <p></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Preferences;