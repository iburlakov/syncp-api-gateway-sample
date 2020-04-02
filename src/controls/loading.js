import React from 'react';

export default function Loading({text}) {
    return (
        // <div class="d-flex justify-content-center">
        //     <div class="spinner-border" role="status">
        //         <span class="sr-only">Loading...</span>
        //     </div>
        // </div>
        <div className='d-flex justify-content-center align-items-center' >
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <span className='px-2'>{text}</span>
            
        </div>
    );
}