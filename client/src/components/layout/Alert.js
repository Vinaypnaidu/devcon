import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({alerts}) => alerts !== null && alerts.length > 0 && alerts.map(alert => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
    </div>
));

Alert.propTypes = {
 alerts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
 alerts: state.alert //initial state of alert, sending that as an array to Alert
 //accessing the state of the alert reducer
});

export default connect(mapStateToProps)(Alert);
