// Timeline.js

import React from 'react';
import TimelineItem from './TimelineItem';
import './TimelineStyle.css'; // Import your CSS for styling

const Timeline = ({ items, reversed }) => {
  return (
    <div className={`timeline ${reversed ? 'reversed' : ''}`}>
      {items.map((item, index) => (
        <TimelineItem key={index} data={item} />
      ))}
    </div>
  );
};

Timeline.defaultProps = {
  reversed: false, // Option to display timeline in reverse order
};

export default Timeline;
