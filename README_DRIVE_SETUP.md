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

**Important Notes:**
- Each **display zone** (like "Cradle Drawing" or "CFD Heatmap") can show 1-6 images that auto-cycle every 3 seconds
- If only 1 image is uploaded for a zone, it displays as a static image (no animation)
- ODIN has 2 separate display zones (Cradle and CFD), each can have its own set of 1-6 cycling images

### Experience Section Images

- **Profile**: `profile.jpg`

- **Project 1 (ODIN E1: BTMS Architecture)** - 2 Display Zones:
  - **Cradle Zone**: Add `odin_cradle.jpg` (or up to 6: `odin_cradle.jpg`, `odin_cradle_2.jpg`, ..., `odin_cradle_6.jpg`)
  - **CFD Zone**: Add `odin_cfd.jpg` (or up to 6: `odin_cfd.jpg`, `odin_cfd_2.jpg`, ..., `odin_cfd_6.jpg`)

- **Project 2 (Logic & Simulation)** - 1 Display Zone:
  - Add `bms_logic.jpg` (or up to 6: `bms_logic.jpg`, `bms_logic_2.jpg`, ..., `bms_logic_6.jpg`)

- **Project 3 (Fabrication & DFM)** - 1 Display Zone:
  - Add `fabrication.jpg` (or up to 6: `fabrication.jpg`, `fabrication_2.jpg`, ..., `fabrication_6.jpg`)

- **Project 4 (Topology & Lightweighting)** - 1 Display Zone:
  - Add `topology.jpg` (or up to 6: `topology.jpg`, `topology_2.jpg`, ..., `topology_6.jpg`)

- **Project 5 (Test & Instrumentation)** - 1 Display Zone:
  - Add `test_instrumentation.jpg` (or up to 6: `test_instrumentation.jpg`, `test_instrumentation_2.jpg`, ..., `test_instrumentation_6.jpg`)

### Supplementary Work (22 Files)

Upload up to 22 files for the Supplementary Work section. Files will be displayed in a 3-column grid:

- `supp1.jpg` through `supp22.jpg`
- Can be any format: `.jpg`, `.png`, `.pdf`, `.docx`
- Examples: `supp1.pdf`, `supp2.jpg`, `supp3.png`, etc.

**Note**: When visitors click on these files, they'll open in a Google Drive-style viewer with download option. All downloads are tracked (see `DOWNLOAD_TRACKING_SETUP.md` for configuration).

### Academic Research


  - `res_chassis.jpg` (or `.pdf`, `.docx`, `.png`)
  - `res_seal.jpg` (or `.pdf`, `.docx`, `.png`)
  - `res_pod.jpg` (or `.pdf`, `.docx`, `.png`)
  - `res_thermal.jpg` (or `.pdf`, `.docx`, `.png`)
  - `res_trans.jpg` (or `.pdf`, `.docx`, `.png`)
  - `res_mclaren.jpg` (or `.pdf`, `.docx`, `.png`)
- **Supplementary**: `supp1.jpg` to `supp8.jpg` (or `.pdf`, `.docx`, `.png` for any)

**Note**: Academic Research and Supplementary Work sections now support multiple file formats:
- **Images**: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`
- **Documents**: `.pdf` (displays with download button)
- **Word Files**: `.doc`, `.docx` (displays with download button)

Simply upload files with the correct name but different extensions (e.g., `res_chassis.pdf` instead of `res_chassis.jpg`).

## Resume
Place your Resume PDF in the `public` folder and name it `resume.pdf`.

## Running Local
1. `npm install`
2. `npm run dev`

## Deploy to Netlify
1. Connect this folder to GitHub.
2. Link Netlify to your GitHub repo.
3. Add the Environment Variables (`VITE_DRIVE_API_KEY`, etc.) in Netlify Site Settings.
