import { FormGroup, ValidationErrors } from "../../../node_modules/@angular/forms";

export function passMatch(fg: FormGroup): ValidationErrors {
    const pass = fg.get('Password').value, repass = fg.get('repassword').value;
    if ((!pass && !repass) || pass === repass) {

        return null;
    }
    return { mis: true }
}