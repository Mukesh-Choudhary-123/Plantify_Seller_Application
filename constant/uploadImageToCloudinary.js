import { Alert } from "react-native";

export const uploadImageToCloudinary = async (uri) => {
  console.log("uploadImageToCloudinary called with URI:", uri);

  // Extract filename and log it
  const filename = uri.split('/').pop();
  console.log("Extracted filename:", filename);

  // Determine the image type and log it
  const match = /\.(\w+)$/.exec(filename);
  const type = match ? `image/${match[1]}` : `image`;
  console.log("Determined file type:", type);

  // Prepare the FormData object for upload
  const formData = new FormData();
  formData.append('file', { uri, name: filename, type });

  // Use your unsigned upload preset (make sure it's set as unsigned in Cloudinary)
  const uploadPreset = 'plantify';
  formData.append('upload_preset', uploadPreset);
  console.log("Using upload preset:", uploadPreset);
  console.log("FormData prepared:", formData);

  // Use the correct cloud name from your Cloudinary account.
  // If your cloud name is not 'ml_default', update it here.
  const cloudName = 'dyws4bybf';
  console.log("Using cloud name:", cloudName);
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
  console.log("Cloudinary upload URL:", url);

  try {
    console.log("Initiating upload to Cloudinary...");
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
      },
    });
    console.log("Upload response status:", response.status);

    const data = await response.json();
    console.log("Response from Cloudinary:", data);

    if (data.secure_url) {
      console.log("Image uploaded successfully. URL:", data.secure_url);
      return data.secure_url; // Globally accessible URL
    } else {
      console.error("Upload succeeded but no secure_url received:", data);
      Alert.alert("Upload error", "No secure URL received from Cloudinary.");
      return null;
    }
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    Alert.alert("Upload failed", "Could not upload image.");
    throw error;
  }
};
