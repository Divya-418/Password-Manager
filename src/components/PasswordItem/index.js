import './index.css'

const PasswordItem = props => {
  const {passwordDetails, showPassword} = props
  const {id, website, username, password, initialClassName} = passwordDetails

  const initial = username ? username[0].toUpperCase() : ''

  const onClickDelete = () => {
    const {deletePassword} = props

    deletePassword(id)
  }

  return (
    <li className="password-item">
      <div className="item-container">
        <div className={initialClassName}>
          <p className="initial">{initial}</p>
        </div>
        <div className="password-details-container">
          <p className="website-name">{website}</p>
          <p className="user-name">{username}</p>
          {showPassword ? (
            <p className="password">{password}</p>
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
              className="stars-img"
            />
          )}
        </div>
        <button
          type="button"
          className="delete-btn"
          testid="delete"
          onClick={onClickDelete}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
            className="delete-img"
          />
        </button>
      </div>
    </li>
  )
}

export default PasswordItem
