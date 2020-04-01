import axios from 'axios';

class SyncpClient {
  constructor () {
    this.client = axios.create ({
      baseURL: process.env.REACT_APP_API_HOST,
    });
  }

  handleError (err) {
    console.log (
      `ERROR ${err.response.config.method} ${err.response.config.url} -> ${err.response.status}:${err.response.statusText} -> ${JSON.stringify (err.response.data)}`
    );
    throw err;
  }

  getSyncpoints (accessToken) {
    return this.client
      .get (
        'syncpoint/syncpoints.svc?include=children,capability,metadata,&includeType=1,2,3,4,5,6,7,8,9',
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then (response => response.data)
      .catch (this.handleError);
  }

  getContent (accessToken, syncpointId, paretnFolderId) {
    return this.client
      .get (
        `/sync/folder.svc/${syncpointId}/folder/${paretnFolderId}?include=active`,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then (response => response.data)
      .catch (this.handleError);
  }

  createLink (accessToken, syncpointId, virtualPath) {
    return this.client
      .post (
        `syncpoint/links.svc`,
        [
          {
            SyncPointId: syncpointId,
            VirtualPath: virtualPath,
          },
        ],
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then (response => {
        console.log (response.status);
        console.log (response.statusText);

        return response;
      })
      .then (response => response.data)
      .catch (this.handleError);
  }
}

export default new SyncpClient ();
