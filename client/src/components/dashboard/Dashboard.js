import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import { deleteAccount, getCurrentProfile } from '../../actions/profile';

const Dashboard = ({ getCurrentProfile, deleteAccount, auth:{user}, profile: {profile, loading} }) => {
    useEffect(() => {
        getCurrentProfile();
    }, []); //empty brackets to make sure that the function runs only once
    return loading && profile === null ? <Spinner/> : <Fragment> 
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
                Welcome {user && user.name}
            </p>
            {profile !== null ? <Fragment> <DashboardActions/>
            <Experience experience={profile.experience}></Experience><Education education={profile.education}></Education>
            <div className='my-2'>
                <button onClick={() => deleteAccount()} className="btn btn-danger">Delete My Account</button>
            </div>
            </Fragment> : 
            <Fragment>
                <p>You have not setup a profile, please add some info.</p>
                <Link to='/create-profile' className="btn btn-primary my-1">Create Profile</Link>
            </Fragment> }
        </Fragment> ;
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});


export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
