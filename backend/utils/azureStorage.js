const { BlobServiceClient } = require('@azure/storage-blob');
const path = require('path');
const crypto = require('crypto');

// A helper function used to get a unique blob name
const getUniqueBlobName = (originalName) => {
  const ext = path.extname(originalName);
  const hash = crypto.randomBytes(16).toString('hex');
  return `${hash}${ext}`;
};

const uploadFileToBlob = async (fileBuffer, originalName, mimeType, targetContainer) => {
  try {
    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
    const containerName = targetContainer || process.env.AZURE_STORAGE_CONTAINER_NAME || 'invikt-uploads';

    if (!connectionString) {
      throw new Error('Azure Storage Connection String is not configured');
    }

    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    
    // Create the container if it doesn't exist
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const exists = await containerClient.exists();
    if (!exists) {
      // If it's the resume container, make it private. Otherwise, make it public read.
      const accessLevel = containerName === 'resume-uploads' ? undefined : 'blob';
      await containerClient.create({ access: accessLevel }); 
    }

    const blobName = getUniqueBlobName(originalName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Upload data to the blob
    await blockBlobClient.uploadData(fileBuffer, {
      blobHTTPHeaders: {
        blobContentType: mimeType,
      },
    });

    return blockBlobClient.url;
  } catch (error) {
    console.error('Error uploading to Azure Blob Storage:', error);
    throw error;
  }
};

module.exports = {
  uploadFileToBlob,
};
