import React from 'preact/compat';

import './index.css';


const FlagWidget = props => {
  const tagBodies = props.annotation ? 
  props.annotation.bodies.filter(b => b.purpose === 'tagging') : [];
  
  var state = tagBodies.length!=0;
  
  const setTag = value => () => {
    props.onAppendBody({ type: 'TextualBody', purpose: 'tagging', value: "flagged"});
    if(state==true){
      props.onRemoveBody(tagBodies[tagBodies.length-1]);
    }
    state = !state;
  }
  
  return (
    <div className="flag-widget">
        <button
          onClick={setTag()}>{state?"Unflag": "Flag"}
        </button>
    </div>
  )

}

export default FlagWidget;

