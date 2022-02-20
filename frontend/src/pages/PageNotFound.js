import React from 'react';

const PageNotFound = () => {
    document.title = "404 Error - Task App"
    return (
        <div className="container my-3">
            <div className="my-2 p-3 border rounded-3 shadow-sm">
                <h1 className="fw-bold">404 - page Not Found</h1>
                <p className="text-muted fw-bold">This page doesn't exist on this server!</p>
            </div>
        </div>
    );
};

export default PageNotFound;