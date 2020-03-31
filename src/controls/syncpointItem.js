import React from 'react';
import {Link} from 'react-router-dom';


export default function SyncpointItem({syncpoint}) {
    return (
        <Link to={`/browser/${syncpoint.Id}/${syncpoint.RootFolderId}`}>{syncpoint.Name}</Link>
    );
}