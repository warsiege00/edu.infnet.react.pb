import React from 'react';
import { Button } from "@material-tailwind/react";
import { PlusIcon } from '@heroicons/react/solid'; 

const FAB = ({ onClick }) => {
    return (
        <Button
            className='rounded-full'
            onClick={onClick}
        >
            <PlusIcon className="h-5 w-5" />
        </Button>
    );
};

export default FAB;