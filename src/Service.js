import React from 'react';
import ReactDOM from 'react-dom';

function Service() {
    fetch('http://localhost:8280/modelgr2music/g/A/30/0.8')
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
}

export default Service