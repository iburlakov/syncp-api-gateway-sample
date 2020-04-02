import React from 'react';
import {Link} from 'react-router-dom';

import {toBytesString} from '../../components/helpers';

import folderImage  from '../../images/folder.svg';

export default function SyncpointItem({syncpoint}) {
    return (
        <div className='row hoverable'>
            <div className='col-md'>
                <Link className='text-dark' to={`/browser/${syncpoint.Id}/${syncpoint.RootFolderId}`}>
                    <img src={folderImage} className='list-item-image' />
                    <span className='px-3'>{syncpoint.Name}</span>
                </Link>
            </div>
            <div className='col-md-3'>
                -
            </div>
            <div className='col-md-2'>
                {toBytesString(syncpoint.SyncpointSize)}
            </div>
        </div>
    );
}