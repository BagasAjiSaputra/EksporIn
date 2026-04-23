"use client"
import { useState } from "react"
import { useResetPassword } from "@/features/auth/auth.hook"
import { useSearchParams } from "next/navigation"

export default function ResetForm() {

    const params = useSearchParams()
    const token = params.get("token")

  const { resetPassword, loading } = useResetPassword()
  const [password, setPassword] = useState("")
  const [response, setResponse] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setResponse("")
    try {
        if (!token) {
        setIsSuccess(false)
        setResponse("Token Invalid")
        return
    }
      await resetPassword({ token, new_password : password})
      setIsSuccess(true)
      setResponse("Password Berhasil di Update")
    } catch (error: any) {
      setIsSuccess(false)
      setResponse(error.message || "Password gagal diupdate")
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#F5F4F0",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@500&display=swap" rel="stylesheet" />

      <div style={{
        width: "100%",
        maxWidth: "400px",
        padding: "0 1.5rem",
      }}>
        {/* Logo mark */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "2.5rem",
        }}>
          <div style={{
            width: "36px",
            height: "36px",
            backgroundColor: "#1A1A1A",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <div style={{
              width: "16px",
              height: "16px",
              border: "2.5px solid #F5F4F0",
              borderRadius: "3px",
            }} />
          </div>
          <span style={{
            fontSize: "15px",
            fontWeight: 600,
            color: "#1A1A1A",
            letterSpacing: "-0.3px",
          }}>
            Reset Password
          </span>
        </div>

        {/* Card */}
        <div style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #E2E1DC",
          borderRadius: "16px",
          padding: "2rem",
        }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* Feedback message */}
            {response && (
              <div style={{
                padding: "10px 14px",
                borderRadius: "8px",
                fontSize: "13.5px",
                fontWeight: 500,
                backgroundColor: isSuccess ? "#EAF3DE" : "#FCEBEB",
                color: isSuccess ? "#3B6D11" : "#A32D2D",
                border: `1px solid ${isSuccess ? "#C0DD97" : "#F7C1C1"}`,
              }}>
                {response}
              </div>
            )}

            {/* Email field */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{
                fontSize: "13px",
                fontWeight: 500,
                color: "#5F5E5A",
                letterSpacing: "0.1px",
              }}>
                Password Baru
              </label>
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  padding: "10px 14px",
                  fontSize: "14px",
                  color: "#1A1A1A",
                  backgroundColor: "#FAFAF8",
                  border: "1px solid #D3D1C7",
                  borderRadius: "8px",
                  outline: "none",
                  transition: "border-color 0.15s",
                  fontFamily: "inherit",
                }}
                onFocus={e => e.currentTarget.style.borderColor = "#888780"}
                onBlur={e => e.currentTarget.style.borderColor = "#D3D1C7"}
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: "4px",
                padding: "11px",
                fontSize: "14px",
                fontWeight: 600,
                color: loading ? "#888780" : "#FFFFFF",
                backgroundColor: loading ? "#D3D1C7" : "#1A1A1A",
                border: "none",
                borderRadius: "8px",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "background-color 0.15s, transform 0.1s",
                fontFamily: "inherit",
                letterSpacing: "0.1px",
              }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.backgroundColor = "#333" }}
              onMouseLeave={e => { if (!loading) e.currentTarget.style.backgroundColor = "#1A1A1A" }}
              onMouseDown={e => { if (!loading) e.currentTarget.style.transform = "scale(0.98)" }}
              onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
            >
              {loading ? "Memproses..." : "Update Password"}
            </button>
          </form>

          {/* Footer hint - Update Bagian Ini */}
        <div style={{
          display: "flex",
          justifyContent: "space-between", // Membuat satu ke kiri, satu ke kanan
          alignItems: "center",
          marginTop: "1.25rem",
          padding: "0 4px", // Memberi sedikit ruang agar tidak terlalu mepet pinggir card
        }}>
          {/* Sisi Kiri: Reset Password */}
          <p style={{
            fontSize: "13px",
            color: "#888780",
            margin: 0
          }}>
            Ingat Password ? {""}
            <a href="/login" style={{ color: "#1A1A1A", fontWeight: 500, textDecoration: "none" }}>
              Login
            </a>
          </p>
        </div>

        </div>
      </div>
    </div>
  )
}