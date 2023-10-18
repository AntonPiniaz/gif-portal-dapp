import PropTypes from 'prop-types';

const GifsGrid = ({ gifsList }) => {
  if (!gifsList || !gifsList.length) {
    return null;
  }

  return (
    <div className='gif-grid'>
      {gifsList.map((gif, index) => (
        <div key={`${index}${gif}`} className='gif-item'>
          <img src={gif.gifLink} alt={`GIF animation ${gif.gifLink}`} />
        </div>
      ))}
    </div>
  );
};

GifsGrid.propTypes = {
  gifsList: PropTypes.array,
};

export default GifsGrid;
