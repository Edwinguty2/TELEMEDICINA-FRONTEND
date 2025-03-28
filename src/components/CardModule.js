import React from 'react';
import { Link } from 'react-router-dom';

const CardModule = ({ title, description, link, icon }) => {
  return (
    <div className="card-module">
      <div className="card-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      <Link to={link}>Ir a {title}</Link>
    </div>
  );
};

export default CardModule;
