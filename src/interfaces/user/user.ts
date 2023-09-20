export interface User {
    userId: string
    username: string
    username_colour: string | null
    avatar_url: string | null
    banner_url: string | null
    email: string
    email_verified: number
    pronouns: string | null
    is_contributor: number
    verified: number
    bio: string | null
    role_flags: number
    self_assignable_role_flags: number | null
    date_joined: number
}

export interface UserSessionAttributes {
    country_code: string
    country_name: string
}