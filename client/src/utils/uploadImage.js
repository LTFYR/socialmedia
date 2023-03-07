export const validateImage = (image) => {
  let error = "";
  if (!image) return (error = "Unexpected image error happened");
  if (image.size > 1024 * 1024) error = "Max 1mb file size allowed";
  if (image.type !== "image/jpeg" && image.type !== "image/png")
    error = "Your image's format is not allowed";

  return error;
};

export const uploadPhoto = async (photos) => {
  let phts = [];
  for (const photo of photos) {
    const formData = new FormData();
    if (photo.camera) {
      formData.append("file", photo.camera);
    } else {
      formData.append("file", photo);
    }
    formData.append("file", photo);
    formData.append("upload_preset", "jwi0ul1v");
    formData.append("cloud_name", "dvaw4cock");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dvaw4cock/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const imageData = await res.json();
    phts.push({ public_id: imageData.public_id, url: imageData.secure_url });
  }
  return phts;
};
