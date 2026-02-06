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
      console.log("Drive API Key or Folder ID missing. Switching to Local Mode.");
      setLoading(false);
      return;
    }

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
            // Map filename to a usable URL
            // Using the lh3.googleusercontent.com hack for direct display
            fileMap[file.name] = `https://lh3.googleusercontent.com/d/${file.id}`;
            // Also store lowercase version for robust matching
            fileMap[file.name.toLowerCase()] = `https://lh3.googleusercontent.com/d/${file.id}`;

            // Rich Metadata
            const dlUrl = `https://drive.google.com/uc?export=download&id=${file.id}`;
            metaMap[file.name] = { ...file, downloadUrl: dlUrl };
            metaMap[file.name.toLowerCase()] = { ...file, downloadUrl: dlUrl };
          });
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
