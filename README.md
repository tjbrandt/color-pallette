# Welcome to the Color Pallete

Key Technologies: Javascript | Bootstrap

This project will run a page where you can choose a color using the input("color") element; then the following will happen:

1. A HEX, RGB, and HSL value will be found/calculated.
2. Details about your chosen color will display directly below.
3. Five partner colors will be calculated (via Hue from HSL) and displayed by updating DOM elements (feel free to look up the color theory behind these):
   1. Complementary - Hue is increased by 180
   2. Analogous Left/Right - Hue is changed by +30/-30
   3. Triadic Left/Right - Hue is changed by +120/-120
4. The HEX of the partner colors is made available to copy to the clipboard.
