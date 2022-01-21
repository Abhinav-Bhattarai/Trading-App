import React from 'react';

const LandingPageGuard: React.FC<{ authStatus: boolean | null }> = ({ authStatus, children }) => {
    let jsx = null;
    if (authStatus === false) {
        jsx = children
    }
    
    return (
        <React.Fragment>
            { jsx }
        </React.Fragment>
    )
};

export default LandingPageGuard;
