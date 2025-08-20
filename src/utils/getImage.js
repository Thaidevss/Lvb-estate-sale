const BASE_IMAGE_URL = 'http://10.2.182.23:8000/uploads/';

export const getImageUrl = (filename) => {
  if (!filename) return getDefaultImage();
  return `${BASE_IMAGE_URL}${filename}`;
};

export const getProfileImageUrl = (images) => {
  if (!images || !images.PROFILE_IMAGE) return getDefaultImage();
  return getImageUrl(images.PROFILE_IMAGE);
};

// export const getDetailImages = (images) => {
//   if (!images || !images.DETAILS_IMAGE || !Array.isArray(images.DETAILS_IMAGE)) {
//     return [];
//   }
  
//   return images.DETAILS_IMAGE
//     .map(item => item?.url)
//     .filter(url => url)
//     .map(url => getImageUrl(url));
// };

export const getDetailImages = (images, maxImages = 6) => {
  if (!images || !Array.isArray(images.DETAILS_IMAGE)) return Array(maxImages).fill(getDefaultImage());

  const detailUrls = images.DETAILS_IMAGE
    .map(item => item?.url)
    .filter(url => url)
    .map(url => getImageUrl(url));

  // กรอง placeholder ออก (กรณี getImageUrl คืน default image)
  const validImages = detailUrls.filter(url => url !== getDefaultImage());

  if (validImages.length < maxImages) {
    const placeholdersNeeded = maxImages - validImages.length;
    return [...validImages, ...Array(placeholdersNeeded).fill(getDefaultImage())];
  }

  return validImages.slice(0, maxImages);
};



export const getAllImages = (images, maxImages = 6) => {
  if (!images) return Array(maxImages).fill(getDefaultImage());
  
  const profileImage = getProfileImageUrl(images);
  const detailImages = getDetailImages(images);
  const uniqueImages = [
    profileImage,
    ...detailImages.filter(img => img !== profileImage)
  ].filter(img => img !== getDefaultImage());
  
  if (uniqueImages.length < maxImages) {
    const placeholdersNeeded = maxImages - uniqueImages.length;
    return [...uniqueImages, ...Array(placeholdersNeeded).fill(getDefaultImage())];
  }
  
  return uniqueImages.slice(0, maxImages);
};

export const getDefaultImage = () => {
  try {
    return new URL('../assets/images/placeholder-image.jpg', import.meta.url).href;
  } catch (e) {
    console.error('Error loading default image:', e);
    return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2NjYyIgc3Ryb2tlLXdpZHRoPSIyIj48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHg9IjIiIHk9IjIiIHJ4PSIyIi8+PHBhdGggZD0iTTggMTJhMiAyIDAgMTAwLTQgMiAyIDAgMDAwIDR6bTAgMGg4YTQgNCAwIDAxLTggMHoiLz48L3N2Zz4=';
  }
};