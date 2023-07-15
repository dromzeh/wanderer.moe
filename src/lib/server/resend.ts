import { env } from '$env/dynamic/private'
import { Resend } from 'resend'
import { error } from '@sveltejs/kit'

export const resend = new Resend(env.RESEND_API_KEY)

export const sendPasswordResetEmail = async (
    email: string,
    link: string,
    username: string
) => {
    try {
        await resend.emails.send({
            from: 'Test <test@test.wanderer.moe>',
            to: email,
            subject: 'Password Reset Request',
            html: `<strong>Password reset for ${username}</strong><br /><a href = "${link}">Click here to reset your password</a>`,
        })
    } catch (error) {
        console.error(error)
        throw error(500, {
            message:
                'Unknown error occurred while sending password reset email.',
        })
    }
}

export const sendPasswordChangeEmail = async (
    email: string,
    username: string
) => {
    try {
        await resend.emails.send({
            from: 'Test <test@test.wanderer.moe>',
            to: email,
            subject: 'Password Updated Confirmation',
            html: `<strong>Your password for ${username} has been updated.</strong><br /> Wasn't you? Contact us at <a href = "mailto:support@wanderer.moe">support@wanderer.moe</a>`,
        })
    } catch (error) {
        console.error(error)
        throw error(500, {
            message:
                'Unknown error occurred while sending password change email.',
        })
    }
}

export const sendEmailChangeEmail = async (email: string, username: string) => {
    try {
        await resend.emails.send({
            from: 'Test <test@wanderer.moe>',
            to: email,
            subject: 'Email Change Request',
            html: `<strong>Your email address for ${username} has been changed.</strong><br /> Wasn't you? Contact us at <a href = "mailto:support@wanderermoe">support@wanderer.moe</a>`,
        })
    } catch (error) {
        console.error(error)
        throw error(500, {
            message: 'Unknown error occurred while sending email change email.',
        })
    }
}

export const sendEmailConfirmationEmail = async (
    email: string,
    link: string,
    username: string
) => {
    try {
        await resend.emails.send({
            from: 'Test <test@test.wanderer.moe>',
            to: email,
            subject: 'Email Confirmation',
            html: `<strong>Email confirmation for ${username}</strong><br /><a href = "${link}">Click here to confirm your email</a>`,
        })
    } catch (error) {
        console.error(error)
        throw error(500, {
            message:
                'Unknown error occurred while sending email confirmation email.',
        })
    }
}
