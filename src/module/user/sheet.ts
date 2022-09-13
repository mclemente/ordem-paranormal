import { UserPF2e } from "./document";

/** Player-specific settings, stored as flags on each User */
export class UserConfigPF2e<TUser extends UserPF2e> extends UserConfig<TUser> {
    override get template(): string {
        return "systems/ordem-paranormal/templates/user/sheet.html";
    }
}
