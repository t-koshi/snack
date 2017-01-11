import React, { Component } from 'react';
import Modal from 'react-modal';
import { Link, withRouter } from 'react-router';
import { merge, union } from 'lodash';
import { connect } from 'react-redux';
import { editProfile } from '../../actions/user_actions';

class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: this.props.currentUser.firstname,
      lastname: this.props.currentUser.lastname,
      avatarFile: null,
      avatarUrl: this.props.currentUser.img_url
    };

    this._handleSubmit = this._handleSubmit.bind(this);
    this._enterField = this._enterField.bind(this);
    this._updateFile = this._updateFile.bind(this);
  }

  render() {
    return (
      <section className="edit-profile group">
        <form className="group"
          onSubmit={ this._handleSubmit }>
          <div className="left">
            <label> First name
              <input type="text"
                onChange={ this._enterField("firstname") }
                value={ this.state.firstname }>
              </input>
            </label>

            <label>Last name
              <input type="text"
                onChange={ this._enterField("lastname") }
                value={ this.state.lastname }>
              </input>
            </label>
          </div>

          <div className="right">
            <label >Profile photo
              <div className="upload-wrapper">
                <img className="icon1"
                  src={ this.state.avatarUrl } />
                <input type="file"
                  onChange={ this._updateFile }>
                </input>
              </div>
            </label>
          </div>
          <section className="buttons group">
            <input type="submit" value="Save Changes"/>
            <button onClick={ this.props.closeModal }>Cancel</button>
          </section>
        </form>
      </section>
    );
  }

  _handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("user[firstname]", this.state.firstname);
    formData.append("user[lastname]", this.state.lastname);

    if (this.state.avatarFile) {
      formData.append("user[avatar]", this.state.avatarFile);
    }

    this.props.editProfile(formData).then(() =>
      this.props.closeModal());
  }

  _enterField(field){
    return (e) => this.setState({
      [field]: e.target.value
    });
  }

  _updateFile(e){
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();

    fileReader.onloadend = function () {
      this.setState({ avatarFile: file, avatarUrl: fileReader.result });
    }.bind(this);

    if (file) {
      fileReader.readAsDataURL(file);
    }
  }
}

const mapStateToProps = ((state, ownProps) => {
  return {
    currentUser: state.session.currentUser,
    currentChannel: state.currentChannel.currentChannel,
  };
});

const mapDispatchToProps = (dispatch) => {
  return {
    editProfile: (formData) => dispatch(editProfile(formData))
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfile));
