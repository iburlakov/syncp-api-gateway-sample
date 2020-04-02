import React from 'react';

import Loading from '../loading';
import BackItem from './backItem';
import SyncpointItem from './syncpointItem';
import FolderItem from './folderItem';
import FileItem from './fileItem';

export default function List({cache, folderId}) {
    if (folderId) {
        if (cache.folders && cache.folders[folderId]) {
            return (
                <>
                    <BackItem folder={cache.folders[folderId]} />

                    {!!cache.folders[folderId] && !!cache.folders[folderId].Folders &&
                        cache.folders[folderId].Folders.map((item, i) => 
                            <FolderItem key={item.FolderId} folder={item} />
                        )
                    }
    
                    {!!cache.folders[folderId] && !!cache.folders[folderId].Files && 
                        cache.folders[folderId].Files.map((item, i) => 
                            <FileItem key={item.FileId} file={item} />
                        )
                    }
                </>
            )
        }
    }
    else
    {
        if (cache.syncpoints) {
             // syncpoints
             return (
                <>
                    {cache.syncpoints.map((item, i) =>
                        <SyncpointItem key={item.Id} syncpoint={item} />
                    )}
                </>
            );
        }
    }

    return (
        <div className="row">
            <div className='col-md'>
                <Loading text='Loading...' />
            </div>
        </div>
    );
}