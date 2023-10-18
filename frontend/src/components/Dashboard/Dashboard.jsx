import { useEffect, useState } from 'react';

import ConnectPhantom from 'src/components/ConnectPhantom';
import GifsGrid from 'src/components/GifsGrid';
import GifForm from 'src/components/GifForm';

import { getGifList } from 'src/api/gifs';

const Dashboard = () => {
  const [connected, setConnected] = useState(false);
  const [gifsList, setGifsList] = useState([]);

  const getGifs = async () => {
    try {
      const data = await getGifList();
      setGifsList(data);
    } catch (error) {
      setGifsList(null);
      console.error('Error in getGifList:', error);
    }
  };

  useEffect(() => {
    if (connected) {
      console.log('Fetching GIF list...');
      getGifs();
    }
  }, [connected]);

  return (
    <div className={connected ? 'authed-container' : 'container'}>
      <div className='header-container'>
        <p className='header'>🖼 GIF Portal</p>
        <p className='sub-text'>View your GIF collection in the metaverse ✨</p>
        {!connected && (
          <ConnectPhantom connected={connected} setConnected={setConnected} />
        )}
        {connected && (
          <div className='connected-container'>
            <GifForm gifsList={gifsList} getGifs={getGifs} />
            <GifsGrid gifsList={gifsList} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
