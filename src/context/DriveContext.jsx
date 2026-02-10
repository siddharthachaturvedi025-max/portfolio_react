import React, { createContext, useContext, useEffect, useState } from 'react';

const DriveContext = createContext({
  files: {},
  loading: true,
  error: null
});

export const useDrive = () => useContext(DriveContext);

export const DriveProvider = ({ children }) => {
  const [files, setFiles] = useState({});
  const [fileData, setFileData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_DRIVE_API_KEY;
  const FOLDER_ID = import.meta.env.VITE_DRIVE_FOLDER_ID;

  useEffect(() => {
    if (!API_KEY || !FOLDER_ID) {
      console.error("❌ Drive API Key or Folder ID missing!");
      console.log("API_KEY present:", !!API_KEY);
      console.log("FOLDER_ID present:", !!FOLDER_ID);
      console.log("Switching to Local Mode.");
      setLoading(false);
      return;
    }

    console.log("🔑 Drive API configured, fetching files...");

    const fetchFiles = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents&key=${API_KEY}&fields=files(id,name,mimeType)`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch Drive files');
        }

        const data = await response.json();
        const fileMap = {};
        const metaMap = {};

        if (data.files) {
          data.files.forEach(file => {
            // Generate proper URLs based on MIME type
            let viewUrl, downloadUrl, thumbnailUrl;

            // Thumbnail URL works for both images and PDFs
            thumbnailUrl = `https://lh3.googleusercontent.com/d/${file.id}`;

            if (file.mimeType === 'application/pdf') {
              // PDFs: Use embed URL for preview
              viewUrl = `https://drive.google.com/file/d/${file.id}/preview`;
              // Use Netlify proxy function to bypass CORS for PDF downloads
              thumbnailUrl = `/.netlify/functions/proxy-pdf?id=${file.id}`;
              downloadUrl = `https://drive.google.com/uc?export=download&id=${file.id}`;
            } else if (file.mimeType?.startsWith('image/')) {
              // Images: Use thumbnail URL (it works and is fast)
              viewUrl = thumbnailUrl;
              downloadUrl = `https://drive.google.com/uc?export=download&id=${file.id}`;
            } else {
              // Other files: Direct download
              viewUrl = `https://drive.google.com/uc?export=download&id=${file.id}`;
              downloadUrl = `https://drive.google.com/uc?export=download&id=${file.id}`;
            }

            // Map filename to viewable URL
            fileMap[file.name] = viewUrl;
            fileMap[file.name.toLowerCase()] = viewUrl;

            // Rich Metadata with all URLs
            metaMap[file.name] = {
              ...file,
              viewUrl,
              downloadUrl,
              thumbnailUrl
            };
            metaMap[file.name.toLowerCase()] = {
              ...file,
              viewUrl,
              downloadUrl,
              thumbnailUrl
            };
          });

          console.log(`✅ Drive API: Loaded ${data.files.length} files`);
          console.log('📁 Files:', Object.keys(fileMap).slice(0, 10)); // Show first 10
        } else {
          console.warn('⚠️ Drive API: No files found in response');
        }

        setFiles(fileMap);
        setFileData(metaMap);
      } catch (err) {
        console.error("Error fetching Drive files:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  return (
    <DriveContext.Provider value={{ files, fileData, loading, error }}>
      {children}
    </DriveContext.Provider>
  );
};
