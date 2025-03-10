const fs = require("fs");
const { createCanvas, loadImage } = require("canvas"); // Corrected import

async function mergeImages(name, image, frame) {
  try {
    const frameImage = await loadImage(frame);
    const userImage = await loadImage(image);

    const canvas = createCanvas(frameImage.width, frameImage.height);
    const ctx = canvas.getContext("2d");

    // Draw frame first
    ctx.drawImage(frameImage, 0, 0, frameImage.width, frameImage.height);

    // Set circular cropping area
    const imgSize = 350; // Increased size of the user image
    const centerX = frameImage.width / 2;
    const centerY = frameImage.height / 2;
    const radius = imgSize / 2+90;

    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    // Draw zoomed-in user image
    const zoomFactor = 1;
    const zoomedSize = imgSize * zoomFactor;
    const offsetX = centerX - zoomedSize / 2;
    const offsetY = centerY - zoomedSize / 2-90;

    ctx.drawImage(userImage, offsetX, offsetY, zoomedSize, zoomedSize);
    ctx.restore();

    // Add name at the bottom
    ctx.font = "bold 50px Arial";
    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const textX = centerX;
    const textY = frameImage.height-80;

    ctx.fillStyle = "#000000";
    ctx.fillText(name, textX, textY);

    return canvas.toBuffer("image/png");
  } catch (error) {
    console.error("Error merging images:", error);
    throw error;
  }
}

async function main(name, imageURL, frameUrl) {
  if (name === "" || imageURL === "" || frameUrl === "") {
    console.error("\nUserName, profile and frameURL should not be null");
    return;
  }

  try {
    const imageBuffer = await mergeImages(name, imageURL, frameUrl);
    const filePath = `merged_${name}.png`;

    // Save the image to the local filesystem
    fs.writeFileSync(filePath, imageBuffer);
    console.log(`Image saved successfully as ${filePath}`);
  } catch (error) {
    console.error("Error saving the image:", error);
  }
}

// Example usage
const imageURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png";
const name = "BIT COIN";
const frameUrl = 'https://i.pinimg.com/736x/b4/02/46/b40246f4321ae26c83f7db362ae9ad06.jpg'
// Run function
main(name,imageURL, frameUrl);
