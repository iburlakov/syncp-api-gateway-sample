import React from 'react';
import {Link} from 'react-router-dom';

import folderImage  from '../../images/folder.svg';

export default function FolderItem({folder}) {
    const folderUrl = `/browser/${folder.SyncpointId}/${folder.FolderId}`;

    return (
        <div className='row hoverable'>
            <div className='col-md'>
                <Link className='text-dark' to={folderUrl}>
                    <img src={folderImage} alt='folder' className='list-item-image' />
                    <span className='px-3'>{folder.Name}</span>
                </Link>
            </div>
            <div className='col-md-3'>
                -
            </div>
            <div className='col-md-2'>
                -
            </div>
        </div>
    );
}