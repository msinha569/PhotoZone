import axios from "axios";

  // Function to remove background using the remove.bg API
   export const removeBg = async (imageURL: string) => {
    const formData = new FormData();
    formData.append("size", "auto");
    formData.append("image_url", imageURL);

    try {
      // Send a POST request using Axios
      const response = await axios.post(
        "https://api.remove.bg/v1.0/removebg",
        formData,
        {
          headers: {
            "X-Api-Key": 'ccL5g3dvHDGn5VsiGGSvZJi4', // Replace with your API key
            "Content-Type": "multipart/form-data",
          },
          responseType: "arraybuffer", // To handle binary data
        }
      );

      if (response.status === 200) {
        // Convert the response data into a Blob and create a downloadable URL
        const blob = new Blob([response.data], { type: "image/png" });
        const downloadUrl = URL.createObjectURL(blob);
        console.log("Download URL:", downloadUrl);
        
        // Trigger a download of the processed image
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = "no-bg.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return downloadUrl
      }
    } catch (error) {
      console.error("Error removing background:", error);
    }
  };


