let res = {
    ifx_plist: "res/ifx.plist",
    ifx_png: "res/ifx.png",
    background: "res/PixelBackgroundSeamlessVertically.png",
    fighter: "#PlayerBlue_Frame_01_png_processed.png",
    bullet: "#Exhaust_Frame_01_png_processed.png",
    enemyFighter: "#Enemy02Green_Frame_1_png_processed.png",
    bullet_02: "#Laser_Small_png_processed.png"
};

let g_resources = [];
for (let i in res) {
    g_resources.push(res[i]);
}
