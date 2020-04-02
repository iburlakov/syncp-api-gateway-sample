import React from 'react';

import fileImage  from '../../images/file.svg';

import {toEnUsLocaleString, toBytesString} from '../../components/helpers';

export default function FileItem({file}) {
    return (
        <div className='row hoverable'>
            <div className='col-md'>
                <img src={fileImage} alt='file' className='list-item-image' />
                <span className='px-3 text-dark'>{file.Filename}</span>
            </div>
            <div className='col-md-3'>
                {toEnUsLocaleString(file.LastWriteTimeUtc)}
            </div>
            <div className='col-md-2'>
                {toBytesString(file.Length)}
            </div>
        </div>
    );
}