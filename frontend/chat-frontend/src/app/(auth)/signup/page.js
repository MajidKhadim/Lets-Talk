import SignupForm from "../../components/SignupForm";

export default function Signup() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-2xl p-6 rounded-lg shadow-md">
                <SignupForm />
            </div>
        </div>
    );
}