import React from 'react';
import {Link} from 'react-router-dom';

import backImage  from '../../images/arrow-up.svg';

export default function BackItem(folder) {
    const backUrl = folder.ParentFolderId
        ? `/browser/${folder.SyncpointId}/${folder.ParentFolderId}`
        : `/browser`;

    return (
        <div className='row hoverable'>
            <div className='col-md'>
                <Link className='text-dark' to={backUrl}>
                    <img src={backImage} className='back-image' />
                    <span className='px-3'>...</span>
                </Link>
            </div>
        </div>
    );
}