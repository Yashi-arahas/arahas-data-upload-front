import React from 'react';
import PropTypes from 'prop-types';
import './CircularProgressBar.css';

const CircularProgressBar = ({ percentage }) => {
    return (
        <div className='circular-progress-bar'>
            <svg viewBox='0 0 36 36'>
                <path className='circle-bg' d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0-31.831' />
                <path className='circle' strokeDasharray={`${percentage}, 100`} d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0-31.831' />
                <text x='18' y='20.35' className='percentage'>{`${percentage}%`}</text>
            </svg>
        </div>
    );
};

CircularProgressBar.propTypes = {
    percentage: PropTypes.number.isRequired,
};

export default CircularProgressBar;
