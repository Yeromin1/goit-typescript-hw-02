import PropTypes from "prop-types";

export const imagePropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  urls: PropTypes.shape({
    small: PropTypes.string.isRequired,
    regular: PropTypes.string.isRequired,
  }).isRequired,
  alt_description: PropTypes.string.isRequired,
});

export const imagesArrayPropTypes =
  PropTypes.arrayOf(imagePropTypes).isRequired;

export const onClickPropTypes = PropTypes.func.isRequired;

export const onSubmitPropTypes = PropTypes.func.isRequired;

export const isOpenPropTypes = PropTypes.bool.isRequired;

export const onClosePropTypes = PropTypes.func.isRequired;
