export const findImageUriWithBestQuality = object => getImage(object.image);

export const findImageUrisWithBestQuality = object => {
  return object.images?.map(getImage) || [];
};

export const getImage = imageObj => {
  const sizes = [
    imageObj?.formats?.large?.url,
    imageObj?.formats?.medium?.url,
    imageObj?.formats?.small?.url,
    imageObj?.formats?.thumbnail?.url,
  ];
  return sizes.find(e => e !== undefined) || null;
};

export const getImageAspectRatio = imageObj => {
  if (!imageObj) return;

  const imageHeight = imageObj.formats.thumbnail.height;
  const imageWidth = imageObj.formats.thumbnail.width;
  return imageWidth / imageHeight;
};
