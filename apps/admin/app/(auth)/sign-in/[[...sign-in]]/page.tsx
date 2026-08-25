import { SignIn } from '@clerk/nextjs'

/**
 * Renders the sign-in page with Clerk's sign-in form centered in the layout.
 */
export default function SignInPage() {
    return (
        <div className='flex justify-center items-center mt-16'>
            <SignIn />
        </div>
    )
}