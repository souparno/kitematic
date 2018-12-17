import $ from 'jquery';
import React from 'react/addons';
import Router from 'react-router';
import RetinaImage from 'react-retina-image';
import networkStore from '../stores/NetworkStore';
import numeral from 'numeral';
import classNames from 'classnames';

var ImageCard = React.createClass({
  mixins: [Router.Navigation],
  getInitialState: function () {
    return {
       tags: this.props.tags || [],
      // chosenTag: this.props.chosenTag || 'latest',
      // defaultNetwork: this.props.defaultNetwork || 'bridge',
      networks: networkStore.all()
      // searchTag: ''
    };
  },
  componentDidMount: function () {
  },
  componentWillUnmount: function () {
  },
  updateTags: function () {
  },
  updateNetworks: function () {
  },
  handleTagClick: function (tag) {
  },
  handleNetworkClick: function (network) {
  },
  handleClick: function () {
  },
  handleMenuOverlayClick: function () {
  },
  handleCloseMenuOverlay: function () {
  },
  handleTagOverlayClick: function () {
  },
  handleCloseTagOverlay: function () {
  },
  handleNetworkOverlayClick: function () {
  },
  handleCloseNetworkOverlay: function () {
  },
  handleDeleteImgClick: function (image) {
  },
  handleRepoClick: function () {
  },
  searchTag: function(event) {
  },

  focusSearchTagInput: function() {
  },

  render: function() {
    var name;
    if (this.props.image.namespace === 'library') {
      name = (
        <div>
          <div className="namespace official">official</div>
          <span className="repo">{this.props.image.name}</span>
        </div>
      );
    } else {
      name = (
        <div>
          <div className="namespace">{this.props.image.namespace}</div>
          <span className="repo">{this.props.image.name}</span>
        </div>
      );
    }
    var description;
    if (this.props.image.description) {
      description = this.props.image.description;
    } else if (this.props.image.short_description) {
      description = this.props.image.short_description;
    } else {
      description = 'No description.';
    }
    var logoStyle = {
      backgroundColor: this.props.image.gradient_start
    };
    var imgsrc;
    if (this.props.image.img) {
      imgsrc = `https://kitematic.com/recommended/${this.props.image.img}`;
    } else {
      imgsrc = 'https://kitematic.com/recommended/kitematic_html.png';
    }
    var tags;
    if (this.state.loading) {
      tags = <RetinaImage className="items-loading" src="loading.png"/>;
    } else if (this.state.tags.length === 0) {
      tags = <div className="no-items">No Tags</div>;
    } else {
      var tagDisplay = this.state.tags.filter(tag => tag.name.includes(this.state.searchTag)).map((tag) => {
        let t = '';
        if (tag.name) {
          t = tag.name;
        } else {
          t = tag;
        }
        let key = t;
        if (typeof key === 'undefined') {
          key = this.props.image.name;
        }
        if (t === this.state.chosenTag) {
          return <div className="item active" key={key} onClick={this.handleTagClick.bind(this, t)}>{t}</div>;
        } else {
          return <div className="item" key={key} onClick={this.handleTagClick.bind(this, t)}>{t}</div>;
        }
      });
      tags = (
        <div className="item-list tag-list">
          {tagDisplay}
        </div>
      );
    }

    let networkDisplay = this.state.networks.map((network) => {
      let networkName = network.Name;
      if (networkName === this.state.defaultNetwork) {
        return <div className="item active" key={networkName} onClick={this.handleNetworkClick.bind(this, networkName)}>{networkName}</div>;
      } else {
        return <div className="item" key={networkName} onClick={this.handleNetworkClick.bind(this, networkName)}>{networkName}</div>;
      }
    });
    let networks = (
      <div className="item-list network-list">
        {networkDisplay}
      </div>
    );

    var badge = null;
    if (this.props.image.namespace === 'library') {
      badge = (
        <span className="icon icon-badge-official"></span>
      );
    } else if (this.props.image.is_private) {
      badge = (
        <span className="icon icon-badge-private"></span>
      );
    }

    let create, overlay;
    if (this.props.image.is_local) {
      create = (
        <div className="actions">
          <div className="favorites">
            <span className="icon icon-tag"> {this.state.chosenTag}</span>
            <span className="text"></span>
          </div>
          <div className="more-menu" onClick={this.handleMenuOverlayClick}>
            <span className="icon icon-more"></span>
          </div>
          <div className="action" onClick={this.handleClick}>
            CREATE
          </div>
        </div>
      );
      overlay = (
        <div className="overlay menu-overlay">
          <div className="menu-item" onClick={this.handleTagOverlayClick.bind(this, this.props.image.name)}>
            <span className="icon icon-tag"></span><span className="text">SELECTED TAG: <span className="selected-item">{this.state.chosenTag}</span></span>
          </div>
          <div className="remove" onClick={this.handleDeleteImgClick.bind(this, this.props.image)}>
            <span className="btn btn-delete btn-action has-icon btn-hollow" disabled={this.props.image.inUse ? 'disabled' : null}><span className="icon icon-delete"></span>Delete Tag</span>
          </div>
          {this.props.image.inUse ? <p className="small">To delete, remove all containers<br/>using the above image</p> : null }
          <div className="close-overlay">
            <a className="btn btn-action circular" onClick={this.handleCloseMenuOverlay}><span className="icon icon-delete"></span></a>
          </div>
        </div>
      );
    } else {
      let favCount = (this.props.image.star_count < 1000) ? numeral(this.props.image.star_count).value() : numeral(this.props.image.star_count).format('0.0a').toUpperCase();
      let pullCount = (this.props.image.pull_count < 1000) ? numeral(this.props.image.pull_count).value() : numeral(this.props.image.pull_count).format('0a').toUpperCase();
      create = (
        <div className="actions">
          <div className="favorites">
            <span className="icon icon-favorite"></span>
            <span className="text">{favCount}</span>
            <span className="icon icon-download"></span>
            <span className="text">{pullCount}</span>
          </div>
          <div className="more-menu" onClick={this.handleMenuOverlayClick}>
            <span className="icon icon-more"></span>
          </div>
          <div className="action" onClick={this.handleClick}>
            CREATE
          </div>
        </div>
      );

      overlay = (
          <div className="overlay menu-overlay">
            <div className="menu-item" onClick={this.handleTagOverlayClick.bind(this, this.props.image.name)}>
              <span className="icon icon-tag"></span><span className="text">SELECTED TAG: <span className="selected-item">{this.state.chosenTag}</span></span>
            </div>
            <div className="menu-item" onClick={this.handleNetworkOverlayClick.bind(this, this.props.image.name)}>
              <span className="icon icon-link"></span><span className="text">DEFAULT NETWORK: <span className="selected-item">{this.state.defaultNetwork}</span></span>
            </div>
            <div className="menu-item" onClick={this.handleRepoClick}>
              <span className="icon icon-open-external"></span><span className="text">VIEW ON DOCKER HUB</span>
            </div>
            <div className="close-overlay">
              <a className="btn btn-action circular" onClick={this.handleCloseMenuOverlay}><span className="icon icon-delete"></span></a>
            </div>
          </div>
      );
    }

    let searchTagInputStyle = { outline: 'none', width: 'calc(100% - 30px)' };

    return (
      <div className="image-item">
        {overlay}
        <div className="overlay item-overlay tag-overlay">
          <p>
            <input
              ref="searchTagInput"
              style={searchTagInputStyle}
              type="text"
              placeholder="Filter image tag."
              onChange={this.searchTag}
            />
          </p>
          {tags}
          <div className="close-overlay" onClick={this.handleCloseTagOverlay}>
            <a className="btn btn-action circular"><span className="icon icon-delete"></span></a>
          </div>
        </div>
        <div className="overlay item-overlay network-overlay">
          <p>Please select an default network.</p>
          {networks}
          <div className="close-overlay" onClick={this.handleCloseNetworkOverlay}>
            <a className="btn btn-action circular"><span className="icon icon-delete"></span></a>
          </div>
        </div>
        <div className="logo" style={logoStyle}>
          <RetinaImage src={imgsrc}/>
        </div>
        <div className="card">
          <div className="info">
            <div className="badges">
              {badge}
            </div>
            <div className="name">
              {name}
            </div>
            <div className="description">
              {description}
            </div>
          </div>
          {create}
        </div>
      </div>
    );
  }
});

module.exports = ImageCard;
