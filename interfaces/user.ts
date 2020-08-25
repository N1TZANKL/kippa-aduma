export enum RegisterErrors {
    MissingFields = "one of the required fields is missing",
    UserAlreadyExists = "username already exists",
    UnknownError = "an unknown error occured, please try again"
}

export enum LoginErrors {
    MissingFields = "one of the required fields is missing",
    InvalidCredentials = "the credentials supplied are not valid",
    UnknownError = "an unknown error occured, please try again"
}