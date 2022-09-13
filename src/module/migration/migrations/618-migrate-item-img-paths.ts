import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";

export class Migration618MigrateItemImagePaths extends MigrationBase {
    static override version = 0.618;

    readonly IMAGE_PATHS: Record<string, ImagePath> = {
        "systems/ordem-paranormal/icons/equipment/weapons/blowgun.png":
            "systems/ordem-paranormal/icons/equipment/weapons/blowgun.jpg",
        "systems/ordem-paranormal/icons/equipment/weapons/trident.png":
            "systems/ordem-paranormal/icons/equipment/weapons/trident.jpg",
        "systems/ordem-paranormal/icons/equipment/weapons/longsword.png":
            "systems/ordem-paranormal/icons/equipment/weapons/longsword.jpg",
        "systems/ordem-paranormal/icons/equipment/weapons/composite-longbow.png":
            "systems/ordem-paranormal/icons/equipment/weapons/composite-longbow.jpg",
        "systems/ordem-paranormal/icons/equipment/weapons/composite-shortbow.png":
            "systems/ordem-paranormal/icons/equipment/weapons/composite-shortbow.jpg",
        "systems/ordem-paranormal/icons/equipment/weapons/dagger.png":
            "systems/ordem-paranormal/icons/equipment/weapons/dagger.jpg",
        "systems/ordem-paranormal/icons/equipment/weapons/katar.png":
            "systems/ordem-paranormal/icons/equipment/weapons/katar.jpg",
        "systems/ordem-paranormal/icons/equipment/weapons/kukri.png":
            "systems/ordem-paranormal/icons/equipment/weapons/kukri.jpg",
        "systems/ordem-paranormal/icons/equipment/weapons/shortbow.png":
            "systems/ordem-paranormal/icons/equipment/weapons/shortbow.jpg",
        "systems/ordem-paranormal/icons/equipment/weapons/scimitar.png":
            "systems/ordem-paranormal/icons/equipment/weapons/scimitar.jpg",
        "systems/ordem-paranormal/icons/equipment/weapons/hatchet.png":
            "systems/ordem-paranormal/icons/equipment/weapons/hatchet.jpg",
        "systems/ordem-paranormal/icons/equipment/weapons/halfling-sling-staff.png":
            "systems/ordem-paranormal/icons/equipment/weapons/halfling-sling-staff.jpg",
        "systems/ordem-paranormal/icons/equipment/weapons/halberd.png":
            "systems/ordem-paranormal/icons/equipment/weapons/halberd.jpg",
        "systems/ordem-paranormal/icons/equipment/weapons/shield-spikes.png":
            "systems/ordem-paranormal/icons/equipment/weapons/shield-spikes.jpg",
        "systems/ordem-paranormal/icons/equipment/weapons/light-mace.jpg":
            "systems/ordem-paranormal/icons/equipment/weapons/light-mace.jpg",
        "systems/ordem-paranormal/icons/equipment/weapons/morningstar.png":
            "systems/ordem-paranormal/icons/equipment/weapons/morningstar.jpg",
        "systems/ordem-paranormal/icons/equipment/weapons/sling.png":
            "systems/ordem-paranormal/icons/equipment/weapons/sling.jpg",
        "systems/ordem-paranormal/icons/equipment/weapons/main-gauche.png":
            "systems/ordem-paranormal/icons/equipment/weapons/main-gauche.jpg",
        "systems/ordem-paranormal/icons/equipment/weapons/bastard-sword.png":
            "systems/ordem-paranormal/icons/equipment/weapons/bastard-sword.jpg",
        "systems/ordem-paranormal/icons/equipment/weapons/spear.png":
            "systems/ordem-paranormal/icons/equipment/weapons/spear.jpg",
        "systems/ordem-paranormal/icons/equipment/weapons/staff.png":
            "systems/ordem-paranormal/icons/equipment/weapons/staff.jpg",
        "systems/ordem-paranormal/icons/equipment/weapons/katana.png":
            "systems/ordem-paranormal/icons/equipment/weapons/katana.jpg",
        "systems/ordem-paranormal/icons/equipment/weapons/elven-curve-blade.png":
            "systems/ordem-paranormal/icons/equipment/weapons/elven-curve-blade.jpg",
        "systems/ordem-paranormal/icons/equipment/weapons/bo-staff.png":
            "systems/ordem-paranormal/icons/equipment/weapons/bo-staff.jpg",
        "systems/ordem-paranormal/icons/equipment/weapons/clan-dagger.png":
            "systems/ordem-paranormal/icons/equipment/weapons/clan-dagger.jpg",
        "systems/ordem-paranormal/icons/equipment/weapons/dogslicer.png":
            "systems/ordem-paranormal/icons/equipment/weapons/dogslicer.jpg",
        "systems/ordem-paranormal/icons/equipment/weapons/falchion.png":
            "systems/ordem-paranormal/icons/equipment/weapons/falchion.jpg",
        "systems/ordem-paranormal/icons/equipment/weapons/fist.png":
            "systems/ordem-paranormal/icons/equipment/weapons/fist.jpg",
        "systems/ordem-paranormal/icons/equipment/weapons/gauntlet.png":
            "systems/ordem-paranormal/icons/equipment/weapons/gauntlet.jpg",
        "systems/ordem-paranormal/icons/equipment/weapons/gnome-hooked-hammer.png":
            "systems/ordem-paranormal/icons/equipment/weapons/gnome-hooked-hammer.jpg",
        "systems/ordem-paranormal/icons/equipment/weapons/greatpick.png":
            "systems/ordem-paranormal/icons/equipment/weapons/greatpick.jpg",
        "systems/ordem-paranormal/icons/equipment/weapons/guisarme.png":
            "systems/ordem-paranormal/icons/equipment/weapons/guisarme.jpg",
        "systems/ordem-paranormal/icons/equipment/weapons/horsechopper.png":
            "systems/ordem-paranormal/icons/equipment/weapons/horsechopper.jpg",
        "systems/ordem-paranormal/icons/equipment/weapons/lance.png":
            "systems/ordem-paranormal/icons/equipment/weapons/lance.jpg",
        "systems/ordem-paranormal/icons/equipment/weapons/maul.png":
            "systems/ordem-paranormal/icons/equipment/weapons/maul.jpg",
        "systems/ordem-paranormal/icons/equipment/weapons/pick.png":
            "systems/ordem-paranormal/icons/equipment/weapons/pick.jpg",
        "systems/ordem-paranormal/icons/equipment/weapons/ranseur.png":
            "systems/ordem-paranormal/icons/equipment/weapons/ranseur.jpg",
        "systems/ordem-paranormal/icons/equipment/weapons/sai.png":
            "systems/ordem-paranormal/icons/equipment/weapons/sai.jpg",
        "systems/ordem-paranormal/icons/equipment/weapons/sawtooth-saber.png":
            "systems/ordem-paranormal/icons/equipment/weapons/sawtooth-saber.jpg",
        "systems/ordem-paranormal/icons/equipment/weapons/shield-bash.png":
            "systems/ordem-paranormal/icons/equipment/weapons/shield-bash.jpg",
        "systems/ordem-paranormal/icons/equipment/weapons/shield-boss.png":
            "systems/ordem-paranormal/icons/equipment/weapons/shield-boss.jpg",
        "systems/ordem-paranormal/icons/equipment/weapons/shuriken.png":
            "systems/ordem-paranormal/icons/equipment/weapons/shuriken.jpg",
        "systems/ordem-paranormal/icons/equipment/weapons/spiked-gauntlet.png":
            "systems/ordem-paranormal/icons/equipment/weapons/spiked-gauntlet.jpg",
        "systems/ordem-paranormal/icons/equipment/weapons/broom.png":
            "systems/ordem-paranormal/icons/equipment/held-items/broom-of-flying.jpg",
        "systems/ordem-paranormal/icons/equipment/weapons/cutlass.png":
            "systems/ordem-paranormal/icons/equipment/weapons/scimitar.jpg",
        "systems/ordem-paranormal/icons/equipment/weapons/scalpel.png":
            "systems/ordem-paranormal/icons/equipment/weapons/war-razor.jpg",
        "systems/ordem-paranormal/icons/equipment/weapons/cane.png":
            "systems/ordem-paranormal/icons/equipment/weapons/cane.jpg",
    };

    override async updateItem(itemData: ItemSourcePF2e) {
        itemData.img = this.IMAGE_PATHS[itemData.img] ?? itemData.img;
    }
}
