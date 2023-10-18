import { useState } from 'react';
import PropTypes from 'prop-types';
import { createGifAccount, sendGif } from 'src/api/gifs';

const GifForm = ({ gifsList, getGifs }) => {
  const [gifLink, setGifLink] = useState('');

  const preventSubmit = (event) => {
    event.preventDefault();
    sendGifLink();
  };

  const onInputChange = (event) => {
    const { value } = event.target;
    setGifLink(value);
  };

  const sendGifLink = async () => {
    if (gifLink.length) {
      try {
        await sendGif(gifLink);
        await getGifs();
        setGifLink('');
      } catch (error) {
        console.error('Error sending gif link:', error);
      }
    }
  };

  const initializeAccount = async () => {
    await createGifAccount();
    await getGifs();
  };

  if (!gifsList) {
    return (
      <button
        className='cta-button submit-gif-button'
        onClick={initializeAccount}
      >
        Initialize your GIF Program Account
      </button>
    );
  }

  return (
    <form onSubmit={preventSubmit}>
      <input
        type='text'
        placeholder='Enter gif link'
        value={gifLink}
        onChange={onInputChange}
      />
      <button
        type='submit'
        className='cta-button submit-gif-button'
        disabled={!gifLink}
      >
        Submit
      </button>
    </form>
  );
};

GifForm.propTypes = {
  gifsList: PropTypes.array.isRequired,
  getGifs: PropTypes.func.isRequired,
};

export default GifForm;
