import React from 'react';
import {Link} from 'react-router-dom';

import fileImage  from '../../images/file.svg';

export default function FileItem({file}) {
    return (
        <div className='row hoverable'>
            <div className='col-md'>
                <img src={fileImage} className='list-item-image' />
                <span className='px-3 text-dark'>{file.Filename}</span>
            </div>
            <div className='col-md-2'>
                {file.LastWriteTimeUtc}
            </div>
            <div className='col-md-2'>
                {file.Length}
            </div>
        </div>
    );
}