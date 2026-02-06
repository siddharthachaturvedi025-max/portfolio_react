# How to Configure Google Drive Images

This portfolio is capable of loading images dynamically from a Google Drive folder. This allows you to update images by simply replacing them in your Drive, without re-deploying the website.

## Step 1: Prepare Google Drive Folder
1. Create a new folder in your Google Drive (e.g., "Portfolio Images").
2. **Important**: Change the Share settings of this folder to **"Everyone with the link"** (Public).
3. Upload your images to this folder. They must match the names defined in the content (see below).

## Step 2: Get API Key and Folder ID
To allow the website to "read" your folder, you need a Google API Key.
1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project.
3. Enable the **Google Drive API**.
4. Create Credentials -> **API Key**.
   - *Security Note*: Restrict this key to your Netlify domain (once deployed) and to the "Google Drive API" to prevent abuse.
5. Get the **Folder ID** from your Drive folder URL.
   - URL: `drive.google.com/drive/folders/12345ABCDE...`
   - ID: `12345ABCDE...`

## Step 3: Configure Env Variables
Create a file named `.env` in the root of this project (next to `package.json`) and add:

```env
VITE_DRIVE_API_KEY=your_api_key_here
VITE_DRIVE_FOLDER_ID=your_folder_id_here
```

## Image Naming Guide
Upload images with these exact names to your Drive folder. If a file is missing, the site will look for it in the local `public/images` folder, or show a placeholder.

- **Profile**: `profile.jpg`
- **Project 1 (ODIN)**: `odin_cradle.jpg`, `odin_cfd.jpg`
- **Project 2 (Logic)**: `bms_logic.jpg`
- **Project 3 (Fabrication)**: `fabrication.jpg`
- **Project 4 (Topology)**: `topology.jpg`
- **Research**:
  - `res_chassis.jpg`
  - `res_seal.jpg`
  - `res_pod.jpg`
  - `res_thermal.jpg`
  - `res_trans.jpg`
  - `res_mclaren.jpg`
- **Supplementary**: `supp1.jpg` to `supp8.jpg`

## Resume
Place your Resume PDF in the `public` folder and name it `resume.pdf`.

## Running Local
1. `npm install`
2. `npm run dev`

## Deploy to Netlify
1. Connect this folder to GitHub.
2. Link Netlify to your GitHub repo.
3. Add the Environment Variables (`VITE_DRIVE_API_KEY`, etc.) in Netlify Site Settings.
