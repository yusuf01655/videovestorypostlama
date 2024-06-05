// Detail.js
import React from 'react';
import styles from './Detail.css';

class Detail extends React.Component {
  render() {
    const { title, description, image } = this.props;
    return (
      <div className={styles.detail}>
        <h2>{title}</h2>
        <img src={image} alt={title} />
        <p>{description}</p>
      </div>
    );
  }
}

export default Detail;