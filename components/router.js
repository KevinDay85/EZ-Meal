import React from 'react';

const Router = ({ children, selected }) => {
    return children.filter(({ props }) => props.id === selected)
}

export default Router;