import React, { Component }  from 'react';
import moment from 'moment';

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
  time: React.PropTypes.string.isRequired
};

export default TimeAgo;