import React, { Component }  from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

class TimeAgo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const date = moment(this.props.time);
    const fomatTime = date.format('YYYY-MM-DD HH:mm');
    return (
      <time title={ fomatTime }>
        { date.fromNow() }
      </time>
    );
  }
}

TimeAgo.propTypes = {
  time: PropTypes.string.isRequired
};

export default TimeAgo;
