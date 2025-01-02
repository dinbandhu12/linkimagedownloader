# Bulk Image Downloader

This is a web-based tool for downloading images in bulk by providing a list of image URLs. The project includes both frontend and backend components.

## Features
- Paste image links to download them in bulk.
- Specify a custom folder name for saving images.
- Real-time progress updates during the download.

## Tech Stack
- **Frontend**: HTML, CSS, JavaScript.
- **Backend**: Flask (Python).

## Setup Instructions
1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd project-folder
   ```

2. **Backend Setup**:
   - Navigate to the `backend/` folder:
     ```bash
     cd backend
     ```
   - Create and activate a virtual environment:
     ```bash
     python -m venv venv
     source venv/bin/activate  # On Windows: venv\Scripts\activate
     ```
   - Install dependencies:
     ```bash
     pip install -r requirements.txt
     ```

3. **Run Locally**:
   - Start the Flask server:
     ```bash
     python app.py
     ```
   - Open `http://localhost:5000` in your browser.

## Deployment
- This project is set up to be deployed on **Render**.
- Ensure you follow the steps to deploy both the backend and static files properly.

## Note
- This tool is intended for personal use only and is optimized for small-scale image downloads.
