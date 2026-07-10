const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadFileToBlob } = require('../utils/azureStorage');
const { protect } = require('../middleware/auth/authMiddleware');

// Configure multer to use memory storage
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5 MB limit
  }
});

// @desc    Upload file to Azure Blob Storage
// @route   POST /api/upload
// @access  Private
router.post('/', protect, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { originalname, buffer, mimetype } = req.file;
    const { container } = req.body; // allow frontend to specify container

    // Upload to Azure
    const url = await uploadFileToBlob(buffer, originalname, mimetype, container);

    res.status(200).json({ 
      success: true,
      url,
      message: 'File uploaded successfully' 
    });
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ message: 'Server Error during file upload', error: error.message });
  }
});

module.exports = router;
