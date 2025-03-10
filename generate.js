const fs = require("fs");
const { createCanvas, loadImage } = require("canvas"); // Corrected import

async function mergeImages(userName, userSrc, frameSrc) {
  try {
    const frameImage = await loadImage(frameSrc);
    const userImage = await loadImage(userSrc);

    const canvas = createCanvas(frameImage.width, frameImage.height);
    const ctx = canvas.getContext("2d");

    // Draw frame first
    ctx.drawImage(frameImage, 0, 0, frameImage.width, frameImage.height);

    // Set circular cropping area
    const imgSize = 500; // Increased size of the user image
    const centerX = frameImage.width / 2;
    const centerY = frameImage.height / 2;
    const radius = imgSize / 2;

    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    // Draw zoomed-in user image
    const zoomFactor = 1.2;
    const zoomedSize = imgSize * zoomFactor;
    const offsetX = centerX - zoomedSize / 2;
    const offsetY = centerY - zoomedSize / 2;

    ctx.drawImage(userImage, offsetX, offsetY, zoomedSize, zoomedSize);
    ctx.restore();

    // Add name at the bottom
    ctx.font = "bold 50px Arial";
    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const textX = centerX;
    const textY = frameImage.height - 160;

    ctx.fillStyle = "#000000";
    ctx.fillText(userName, textX, textY);

    return canvas.toBuffer("image/png");
  } catch (error) {
    console.error("Error merging images:", error);
    throw error;
  }
}

async function main(userName, userImageUrl, frameImageUrl) {
  if (userName === "" || userImageUrl === "" || frameImageUrl === "") {
    console.error("\nUserName, profile and frameURL should not be null");
    return;
  }

  try {
    const imageBuffer = await mergeImages(userName, userImageUrl, frameImageUrl);
    const filePath = `merged_${userName}.png`;

    // Save the image to the local filesystem
    fs.writeFileSync(filePath, imageBuffer);
    console.log(`Image saved successfully as ${filePath}`);
  } catch (error) {
    console.error("Error saving the image:", error);
  }
}

// Example usage
const userURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png";
const userName = "rakesh";
const frameImageUrl = 'https://img.freepik.com/free-vector/golden-sparkling-frame-dark-background_52683-18514.jpg?t=st=1741596497~exp=1741600097~hmac=81b34805b0293edccdd44bc8529cb91a346e8ac08b92ed6c3e81fc809ddffba5&w=900'
// Run function
main(userName, userURL, frameImageUrl);
