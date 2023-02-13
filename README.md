# Welcome to the Color Pallete

Key Technologies: Javascript | Bootstrap

By using the "Choose a Color" picker, the user can see colors that will work with a color. The page works as follows:

1. A HEX, RGB, and HSL value will be found/calculated.
2. Details about your chosen color will display directly below.
3. Five partner colors will be calculated (via Hue from HSL) and displayed by updating DOM elements (feel free to look up the color theory behind these):
   1. Complementary - Hue is increased by 180
   2. Analogous Left/Right - Hue is changed by +30/-30
   3. Triadic Left/Right - Hue is changed by +120/-120
4. The HEX of the partner colors is made available to copy to the clipboard.

Before picking a color:
![color_picker_capture_one](https://user-images.githubusercontent.com/102998600/218390491-bb0cfa70-21f3-4a2d-89b6-95bccfe7e120.PNG)

After picking a color:
![color_picker_capture_two](https://user-images.githubusercontent.com/102998600/218390996-882ccfdc-6b2a-4912-9f8d-39a0334373c9.PNG)
