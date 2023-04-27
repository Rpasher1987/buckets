import React from 'react';
import ReactDOM from 'react-dom';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

import '@src/home.scss';

const LogoutButton = ({ authenticated }) => {
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
    authenticated && (
      <li className="nav-item">
        <button className="btn btn-sm btn-dark" onClick={logout}><small>Logout</small></button>
      </li>
    )
  );
};


const Navbar = () => {
  const [authenticated, setAuthenticated] = React.useState(false);

  React.useEffect(() => {
    fetch('/api/authenticated')
      .then(handleErrors)
      .then(data => {
        setAuthenticated(data.authenticated);
      })
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom fixed-top">
      <div className="container">
        <a className="navbar-brand" href="/">CG Advisor Network</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/"><small>Overview</small></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/"><small>Models</small></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/"><small>UMA Strategies</small></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/"><small>Methodology</small></a>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="/" tabIndex="-1" aria-disabled="true"><small>Updates</small></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/"><small>FAQ</small></a>
            </li>
          </ul>
          <div className="text-right">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#myNavbar">
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>
        <div className="collapse navbar-collapse flex-grow-1 text-right" id="myNavbar">
          <ul className="navbar-nav ms-auto flex-nowrap">
            <LogoutButton authenticated={authenticated} />
          </ul>
        </div>
      </div>
    </nav>
  );
};





const Footer = props => {
  return(
    <div className="container-fluid bg-dark mt-auto">
      <footer className="py-2 my-2 d-flex flex-wrap justify-content-center">
        <ul className="d-flex list-unstyled mb-0">
          <li className="nav-item navFoot me-3"><a href="main.php" target="_top" className="nav-link px-2 text-muted bi bi-house-fill"></a></li>
          <li className="nav-item navFoot me-3"><a href="https://cgadvisornetwork.com/" className="nav-link px-2 text-muted bi bi-building"></a></li>
          <li className="nav-item navFoot me-3"><a href="https://www.linkedin.com/company/cg-advisor-network" className="nav-link px-2 text-muted bi bi-linkedin"></a></li>
          <li className="nav-item navFoot me-3"><a href="https://www.facebook.com/CGFinancialServices/" className="nav-link px-2 text-muted bi bi-facebook"></a></li>
          <li className="nav-item navFoot me-3"><a href="mailto:rasher@cgadvisornetwork.com" className="nav-link px-2 text-muted bi bi-envelope"></a></li>
        </ul>
        <div className="text-muted">
          <p className="text-center text-muted">&copy; 2022 CG Advisor Network</p>
          <p className="text-center"><small><em>ADVISOR USE ONLY: Not intended for the public</em></small></p>
          <p>
            <small>
              <em>
                Advisory services are offered through Capital Asset Advisory Services, LLC, a Registered Investment Advisor doing business as CG Advisory Services. Securities are offered through Geneos Wealth Management, Inc. Member <a href="https://www.finra.org/#/" target="_blank">FINRA</a>/<a href="https://www.sipc.org/" target="_blank">SIPC.</a>
                Historical performance cannot guarantee future performance due to variations in market conditions over time. Investing involves the risk of loss, including loss of principal. Different types of investments involve varying degrees of risk, and there can be no assurance that any specific investment will be profitable for a clients investment portfolio.
                The topics discussed in this material are for general financial education and are not intended to provide specific investment advice or recommendations. The information is from publicly available sources believed to be reliable; however, we cannot assure the accuracy or completeness of these materials. Capital Asset Advisory Services & Geneos Wealth Management do not provide tax or legal services. Individuals are encouraged to consult their own financial, legal or tax advisor regarding their specific financial situation before acting on any information provided.
              </em>
            </small>
          </p>
        </div>
      </footer>
    </div>
  )
}



// ... (imports and other components)

const Layout = (props) => {
  const { centered = false } = props;

  return (
    <div className='d-flex flex-column min-vh-100'>
      <Navbar />
        <div className={`main-content${centered ? ' centered' : ''}`}>
          <div className='container'>
            <div className='row'>
              <div className='col-12'>
                <div className="content">
                  {props.children}
                </div>
              </div>
            </div>
          </div>
        </div>
      <Footer />
    </div>
  )
}

export default Layout;



             