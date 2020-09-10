let res = {
    background: "res/PixelBackgroundSeamlessVertically.png",
    fighter: "res/Fighter/PlayerBlue_Frame_01_png_processed.png",
    bullet: "res/Fighter/Exhaust_Frame_01_png_processed.png",
    enemyFighter: "res/Fighter/Enemy01_Red_Frame_1_png_processed.png",
    bullet_02: "res/Fighter/Laser_Large_png_processed.png"
};

let g_resources = [];
for (let i in res) {
    g_resources.push(res[i]);
}
