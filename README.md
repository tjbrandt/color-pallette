Thanks for checking out my code!
This will run a page where you can choose a color using the input("color") element; then the following will happen:

1. A HEX, RGB, and HSL value will be found/calculated.
2. Details about your chosen color will display directly below.
3. Five partner colors will be calculated (via Hue from HSL) and displayed by updating DOM elements (feel free to look up the color theory behind these):
   a. Complementary - Hue is increased by 180
   b. Analogous Left/Right - Hue is changed by +30/-30
   c. Triadic Left/Right - Hue is changed by +120/-120
4. The HEX of the partner colors is made available to copy to the clipboard.
