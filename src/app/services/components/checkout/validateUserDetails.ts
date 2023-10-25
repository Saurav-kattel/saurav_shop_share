export function validataeUserData({ firstname, userEmail, lastname, phoneNumber }: {
    userEmail: string;
    firstname: string;
    lastname: string;
    phoneNumber: string;
}) {
    const errors: Record<string, { message: string; }> = {};
    if (!firstname || firstname === '') {
        errors.firstname = { message: "Firstname cannot be empty" };
    }
    if (!lastname || lastname === '') {
        errors.lastname = { message: "Lastname cannot be empty" };
    }

    if (phoneNumber && phoneNumber?.length > 10 || phoneNumber?.length < 10) {
        errors.phoneNumber = { message: "Invalid phone number. phone number must excatly be 10" };
    }
    if (!userEmail?.match("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")) {
        errors.userEmail = { message: "Provided email is invalid" };
    }
    return errors;
}