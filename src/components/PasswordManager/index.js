import {Component} from 'react'
import {v4} from 'uuid'

import PasswordItem from '../PasswordItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class PasswordManager extends Component {
  state = {
    passwordsList: [],
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    searchInput: '',
    onShowPassword: false,
  }

  deletePassword = passwordId => {
    const {passwordsList} = this.state

    this.setState({
      passwordsList: passwordsList.filter(
        password => password.id !== passwordId,
      ),
    })
  }

  onClickCheckbox = () => {
    this.setState(prevState => ({onShowPassword: !prevState.onShowPassword}))
  }

  onAddPassword = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordInput} = this.state
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newPassword = {
      id: v4(),
      website: websiteInput,
      username: usernameInput,
      password: passwordInput,
      initialClassName: initialBackgroundColorClassName,
    }

    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
    }))
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeWebsite = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  render() {
    const {
      websiteInput,
      passwordInput,
      usernameInput,
      searchInput,
      passwordsList,
      onShowPassword,
    } = this.state

    const filteredList = passwordsList.filter(each =>
      each.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    const passwordsUI = filteredList.map(eachPassword => (
      <PasswordItem
        key={eachPassword.id}
        passwordDetails={eachPassword}
        deletePassword={this.deletePassword}
        showPassword={onShowPassword}
      />
    ))
    const requiredPasswordsCount = filteredList.length

    return (
      <div className="app-container">
        <div className="img-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="logo"
          />
        </div>
        <div className="responsive-container">
          <div className="password-manager-container">
            <div className="password-form-and-img-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
                alt="password manager"
                className="password-manager-logo-sm"
              />
              <form className="form" onSubmit={this.onAddPassword}>
                <h1 className="heading">Add New Password</h1>
                <div className="input-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="input-image"
                  />
                  <input
                    type="text"
                    placeholder="Enter Website"
                    className="input"
                    value={websiteInput}
                    onChange={this.onChangeWebsite}
                  />
                </div>

                <div className="input-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    className="input-image"
                  />
                  <input
                    type="text"
                    placeholder="Enter Username"
                    className="input"
                    value={usernameInput}
                    onChange={this.onChangeUsername}
                  />
                </div>

                <div className="input-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                    className="input-image"
                  />
                  <input
                    type="password"
                    placeholder="Enter Password"
                    className="input"
                    value={passwordInput}
                    onChange={this.onChangePassword}
                  />
                </div>
                <div className="btn-container">
                  <button type="submit" className="add-btn">
                    Add
                  </button>
                </div>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
                alt="password manager"
                className="password-manager-logo-lg"
              />
            </div>
            <div className="password-output-container">
              <div className="passwords-header-container">
                <div className="your-passwords-container">
                  <h1 className="your-password">Your Passwords</h1>
                  <p className="passwords-length">{requiredPasswordsCount}</p>
                </div>
                <div className="input-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                    alt="search"
                    className="input-image"
                  />
                  <input
                    type="search"
                    placeholder="Search"
                    className="input"
                    value={searchInput}
                    onChange={this.onChangeSearchInput}
                  />
                </div>
              </div>
              <hr className="line" />
              <div className="show-passwords-container">
                <input
                  id="show"
                  type="checkbox"
                  onClick={this.onClickCheckbox}
                />
                <label htmlFor="show">Show Passwords</label>
              </div>

              <ul className="passwords-list">
                {requiredPasswordsCount !== 0 ? (
                  passwordsUI
                ) : (
                  <div className="no-passwords-container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                      alt="no passwords"
                      className="no-passwords-img"
                    />
                    <p className="no-password-heading">No Passwords</p>
                  </div>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
