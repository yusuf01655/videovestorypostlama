// TimelineItem.js

import React from 'react';
import './TimelineStyle.css'; // Import your CSS for styling

const TimelineItem = ({ data }) => {
  const { icon, title, subtitle, content } = data;

  return (
    <div className="timeline-item">
      <div className="timeline-icon">{icon}</div>
      <div className="timeline-content">
        {title && <h3>{title}</h3>}
        {subtitle && <p className="timeline-subtitle">{subtitle}</p>}
        {content && <p>{content}</p>}
      </div>
    </div>
  );
};

export default TimelineItem;
