const BASE_PDF_URL = import.meta.env.VITE_API_UPLOAD_PDF;

export const getPDFUrl = (filename) => {
  if (!filename) return null;
  
  if (filename.startsWith('http')) {
    return filename;
  }
  
  if (BASE_PDF_URL) {
    return `${BASE_PDF_URL}${filename}`;
  }
  
  const baseUrl = BASE_IMAGE_URL.replace(/\/uploads\/?$/, '/uploads/files/');
  return `${baseUrl}${filename}`;
};

export const getPDFUrlFromObject = (fileObject) => {
  if (!fileObject) return null;
  
  if (typeof fileObject === 'string') {
    return getPDFUrl(fileObject);
  }
  
  if (fileObject.filename) {
    return getPDFUrl(fileObject.filename);
  }
  if (fileObject.url) {
    return getPDFUrl(fileObject.url);
  }

  if (fileObject.FILE_PDF) {
    return getPDFUrl(fileObject.FILE_PDF);
  }
  
  return null;
};

export const isPDFFile = (filename) => {
  if (!filename) return false;
  return filename.toLowerCase().endsWith('.pdf');
};

export const extractPDFFilename = (url) => {
  if (!url) return null;
  
  if (url.startsWith('http')) {
    const parts = url.split('/');
    return parts[parts.length - 1];
  }

  return url;
};
