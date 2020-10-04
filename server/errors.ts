export enum GeneralErrors {
    UnknownError = "An unknown error occured, please try again",
}

export enum RegisterErrors {
    MissingFields = "One of the required fields is missing!",
    UserAlreadyExists = "Username already exists",
}

export enum LoginErrors {
    MissingFields = "One of the required fields is missing",
    InvalidCredentials = "The credentials supplied are not valid",
}
