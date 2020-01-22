import React from 'react';
const Scroll = (props) => {
    return(
        <div style={{overflowY: 'scroll', border: '5px solid white', height: '800px', maxWidth: '1080px', margin: 'auto'}}>
            {props.children}
        </div>
    )
};

export default Scroll;