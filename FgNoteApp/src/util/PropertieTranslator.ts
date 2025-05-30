export const propertieImageMap: Record<string, string> = {
    "balconybreak": "../assets/images/Properties/Balconybreak.png",
    "chip": "../assets/images/Properties/chip.png",
    "floorblast": "../assets/images/Properties/Floorblast.png",
    "floorbreak": "../assets/images/Properties/Floorbreak.png",
    "forcecrouch": "../assets/images/Properties/forcecrouch.png",
    "heat": "../assets/images/Properties/heat.png",
    "homing": "../assets/images/Properties/homing.png",
    "powercrush": "../assets/images/Properties/powercrush.png",
    "tornado": "../assets/images/Properties/tornado.png",
    "wallblast": "../assets/images/Properties/Wallblast.png",
    "wallbound": "../assets/images/Properties/Wallbound.png",
    "wallbreak": "../assets/images/Properties/Wallbreak.png",
}

export function propertiesToImages(propertieList: string[]): string[] {
    const imageList: string[] = [];
    propertieList.forEach((propertie: string) => { imageList.push(propertieImageMap[propertie] ?? "")});
    return imageList;
}