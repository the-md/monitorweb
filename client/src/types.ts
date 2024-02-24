export interface CustomFetchOptions extends RequestInit {
    headers?: HeadersInit
}

export interface FormValues {
    email?: string | null
    password?: string | null
}
