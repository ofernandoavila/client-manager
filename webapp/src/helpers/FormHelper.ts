export const FormHelper = {
    ValidateForm: () => {
        let requireds = document.querySelectorAll("input[required]");
        let isValid: boolean = true;

        requireds.forEach((required: any) => {
            if (required.value === "") {
                console.log(required);
                required.classList.add("is-invalid");
                isValid = false;
            } else {
                required.classList.remove("is-invalid");
            }
        });

        return isValid;
    },

    ValidatePassword: () => {
        let password:any = document.querySelector("#password")!;
        let confirmPassword:any = document.querySelector("#confirm-password")!;

        let isValid: boolean = true;

        if (password.value !== confirmPassword.value) {
            confirmPassword.classList.add("is-invalid");
            isValid = false;
        } else {
            confirmPassword.classList.remove("is-invalid");
        }

        return isValid;
    },
}