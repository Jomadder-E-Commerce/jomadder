import React from 'react';

const SidebarText = ({text = ""}) => {
    return (
        <div className="text-2xl font-semibold mb-4 md:block hidden">
        {text}
      </div>
    );
};

export default SidebarText;