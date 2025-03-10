# Image Merger

## Overview
This project merges a profile image with a frame, applies circular cropping to the profile image, and overlays the user's name at the bottom. The result is saved as a PNG file.

## Features
- Merges a user-provided image with a frame.
- Applies circular cropping to the profile image.
- Supports image zooming and positioning adjustments.
- Adds a name at the bottom of the final image.
- Saves the generated image as a local file.

## Prerequisites
Ensure you have Node.js installed on your system.

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/RAKESH9494/ImageMerger-CanvasAPI
   cd ImageMerger-CanvasAPI
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

## Usage
To generate a merged image, run the script with the required parameters:
```sh
node generate.js
```

### Example Code
```js
const imageURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png";
const name = "BIT COIN";
const frameUrl = 'https://i.pinimg.com/736x/b4/02/46/b40246f4321ae26c83f7db362ae9ad06.jpg';

main(name, imageURL, frameUrl);
```

## Configuration
- Adjust `imgSize`, `offsetX`, and `offsetY` values to modify image positioning.
- Change `font` size in `ctx.font` to adjust text display.

