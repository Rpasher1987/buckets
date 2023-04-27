const LogoutButton = () => {
  const logout = (e) => {
    e.preventDefault();
    fetch('api/sessions', safeCredentials({
      method: 'DELETE',
    }))
    .then(handleErrors)
    .then(data => {
      if(data.success) {
        const params = new URLSearchParams(window.location.search);
        const redirect_url = params.get('redirect_url') || '/';
        window.location = redirect_url;
      }
    })
    .catch(error => {
      console.log(error);
    });
  };

  return (
    <li className="nav-item">
      <button className="btn btn-sm btn-dark" onClick={logout}><small>Logout</small></button>
    </li>
  );
};