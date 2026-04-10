import { Input } from "@/components/ui/input"
import { Eye, EyeOff, UserRound, Lock } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useDispatch } from "react-redux"
import { setUser } from "@/lib/features/auth/authSlice"
import { CREDENTIALS } from "@/constants/constant"

function EyeIcon({ show }) {
    return show ? (
        <Eye className="text-gray-400" size={20} />
    ) : (
        <EyeOff className="text-gray-400" size={20} />
    )
}

const signInSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

export default function Auth() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [showPw, setShowPw] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [authError, setAuthError] = useState("")

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(signInSchema),
        defaultValues: { email: "", password: "" },
    })

    useEffect(() => {
    const savedUser = localStorage.getItem("demo-auth-user")
    if (!savedUser) return

    const user = JSON.parse(savedUser)
    dispatch(setUser(user))

    if (window.location.pathname === "/") {
        const targetPath =
            user.role === "super_admin" ? "/admin" : "/dc"

        navigate(targetPath, { replace: true })
    }
}, [dispatch, navigate])

    const handleUse = (cred) => {
        setValue("email", cred.email)
        setValue("password", cred.pass)
        setAuthError("")
    }

    async function onSubmit(data) {
    setAuthError("")
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 700))

    const matchedCred = CREDENTIALS.find(
        (cred) =>
            cred.email.toLowerCase() === data.email.toLowerCase() &&
            cred.pass === data.password
    )

    if (!matchedCred) {
        setIsLoading(false)
        setAuthError("Invalid email or password")
        return
    }

    const nameParts = matchedCred.role.split(" ")

    const fakeUser = {
        id: crypto.randomUUID(),
        first_name: nameParts[0] || "Demo",
        last_name: nameParts.slice(1).join(" ") || "User",
        email: matchedCred.email,
        role: matchedCred.badge, // must match route role
        isAuthenticated: true,
    }

    dispatch(setUser(fakeUser))
    localStorage.setItem("demo-auth-user", JSON.stringify(fakeUser))

    setIsLoading(false)

    const targetPath =
        matchedCred.badge === "super_admin" ? "/admin" : "/dc"

    navigate(targetPath, { replace: true })
}

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center bg-maroon relative overflow-hidden px-4 py-6">
            {/* Background orbs */}
            <div
                className="absolute rounded-full pointer-events-none"
                style={{
                    width: 480,
                    height: 480,
                    background: "#ffab25",
                    filter: "blur(90px)",
                    opacity: 0.18,
                    top: -120,
                    left: -80,
                }}
            />
            <div
                className="absolute rounded-full pointer-events-none"
                style={{
                    width: 360,
                    height: 360,
                    background: "#ffab25",
                    filter: "blur(90px)",
                    opacity: 0.18,
                    bottom: -60,
                    right: -60,
                }}
            />
            <div
                className="absolute rounded-full pointer-events-none"
                style={{
                    width: 220,
                    height: 220,
                    background: "#ffab25",
                    filter: "blur(90px)",
                    opacity: 0.18,
                    top: "40%",
                    left: "60%",
                }}
            />

            {/* Brand */}
            <div className="flex flex-col items-center gap-2.5 mb-7 animate-fade-down">
                <div
                    className="w-14 h-14 flex items-center justify-center rounded-2xl text-[22px] font-semibold text-maroon"
                    style={{
                        background: "linear-gradient(145deg, #f5a623, #e8903a)",
                        boxShadow:
                            "0 8px 24px rgba(245,166,35,0.35), 0 2px 8px rgba(0,0,0,0.2)",
                        letterSpacing: "-0.5px",
                    }}
                >
                    I
                </div>

                <span className="text-white text-[22px] font-semibold tracking-wide">
                    Iravya
                </span>
            </div>

            {/* Card */}
            <div className="bg-white rounded-2xl w-full max-w-105 animate-fade-up p-6 lg:p-8">
                <h1 className="text-[24px] font-semibold text-[#1a1a2e] text-center mb-1.5">
                    Sign In
                </h1>

                <p className="text-[13.5px] text-[#7a7a8a] text-center mb-7 font-normal">
                    Enter your credentials to continue
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Email */}
                    <div className="relative">
                        <UserRound
                            className="absolute left-3.5 top-1/3 text-gray-400"
                            size={16}
                        />

                        <Input
                            type="email"
                            placeholder="arjun.j@gmail.com"
                            {...register("email")}
                            className={`input-field w-full pl-10 pr-10 h-11 border ${
                                errors.email || authError
                                    ? "border-red-500"
                                    : "border-[#e8e8f0]"
                            } rounded-[10px] text-sm text-[#1a1a2e] bg-[#fafafa] transition-all duration-200`}
                        />
                    </div>

                    {errors.email && (
                        <span className="text-red-500 text-[10px] mt-0.5 ml-1">
                            {errors.email.message}
                        </span>
                    )}

                    {/* Password */}
                    <div className="relative mt-2">
                        <Lock
                            className="absolute left-3.5 top-1/3 text-gray-400"
                            size={16}
                        />

                        <Input
                            type={showPw ? "text" : "password"}
                            placeholder="Password"
                            {...register("password")}
                            className={`input-field w-full pl-10 pr-10 h-11 border ${
                                errors.password || authError
                                    ? "border-red-500"
                                    : "border-[#e8e8f0]"
                            } rounded-[10px] text-sm text-[#1a1a2e] bg-[#fafafa] transition-all duration-200`}
                        />

                        <button
                            type="button"
                            onClick={() => setShowPw((v) => !v)}
                            tabIndex={-1}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center text-[#b0b0c0] hover:text-[#8b1a30] transition-colors duration-150 bg-transparent border-none cursor-pointer p-0"
                        >
                            <EyeIcon show={showPw} />
                        </button>
                    </div>

                    {errors.password && (
                        <span className="text-red-500 text-[10px] mt-0.5 ml-1">
                            {errors.password.message}
                        </span>
                    )}

                    {authError && (
                        <p className="text-red-500 text-xs mt-2 ml-1">
                            {authError}
                        </p>
                    )}

                    {/* Sign In button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="btn-signin w-full py-3.5 text-white text-[15px] font-semibold rounded-[10px] mt-3 tracking-wide cursor-pointer border-none transition-all duration-150 disabled:opacity-70 disabled:cursor-not-allowed"
                        style={{
                            background: "linear-gradient(135deg, #8b1a30, #6b1223)",
                            boxShadow: "0 4px 18px rgba(139,26,48,0.32)",
                            fontFamily: "'DM Sans', sans-serif",
                        }}
                    >
                        {isLoading ? "Please wait..." : "Sign In"}
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-3 my-5">
                    <div className="flex-1 h-px bg-[#e8e8f0]" />
                    <span className="text-[10.5px] font-semibold tracking-[2px] uppercase text-[#b0b0c0]">
                        Default Credentials
                    </span>
                    <div className="flex-1 h-px bg-[#e8e8f0]" />
                </div>

                {/* Credential cards */}
                {CREDENTIALS.map((cred) => (
                    <div
                        key={cred.role}
                        className="cred-card flex items-center justify-between bg-[#f7f7fb] border border-[#ececf5] rounded-[10px] px-3.5 py-3 mb-2.5 transition-all duration-150 cursor-default"
                    >
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <span className="text-[13.5px] font-semibold text-[#1a1a2e]">
                                    {cred.role}
                                </span>

                                <span
                                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-[5px] tracking-wide border ${cred.badgeClass}`}
                                >
                                    {cred.badge}
                                </span>
                            </div>

                            <span className="text-[12px] text-[#9090a0] font-mono">
                                {cred.email} / {cred.pass}
                            </span>
                        </div>

                        <button
                            type="button"
                            onClick={() => handleUse(cred)}
                            className="use-btn text-[12.5px] font-semibold text-maroon-dark bg-transparent border-none cursor-pointer whitespace-nowrap transition-colors duration-150 p-0"
                        >
                            Use →
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}