import React, { useState, useEffect } from 'react';

function TestDeprecatedReactAPIs(props) {
  const [state, setState] = useState(initialState);

  componentWillReceiveProps(nextProps) { // Noncompliant: deprecated lifecycle method
    // Some code here...
  }

  componentWillUpdate(nextProps, nextState) { // Noncompliant: deprecated lifecycle method
    // Some code here...
  }

  render() {
    return <div>Hello World</div>;
  }
}
