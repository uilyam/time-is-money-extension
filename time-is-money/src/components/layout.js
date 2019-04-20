import React from 'react';

export default ({ children }) => (
  <section className="section" style={{ padding: 20 }}>
    <div className="container is-fluid">
      <div className="columns is-vcentered" style={{ display: 'flex', height: 300 }}>
        <div className="column">
          { children }
        </div>
      </div>
    </div>
  </section>
);