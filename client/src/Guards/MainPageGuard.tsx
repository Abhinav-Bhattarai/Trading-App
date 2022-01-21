import React from 'react';

const MainPageGuard: React.FC<{ authStatus: boolean | null }> = ({ authStatus, children }) => {
    let jsx = null;
    if (authStatus === true) {
        jsx = children
    }
    
    return (
        <React.Fragment>
            { jsx }
        </React.Fragment>
    )
};

export default MainPageGuard;
