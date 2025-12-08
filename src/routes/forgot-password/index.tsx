import { component$, useSignal, $ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import { css } from "~/styled-system/css";

export default component$(() => {
  const nav = useNavigate();
  const email = useSignal("");
  const submitted = useSignal(false);

  const handleSubmit = $((e: Event) => {
    e.preventDefault();

    // ============================================
    // TODO: BACKEND INTEGRATION REQUIRED
    // ============================================
    // Integrate with your backend API to send password reset email
    //
    // const response = await fetch('/api/auth/forgot-password', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     email: email.value
    //   })
    // });
    //
    // if (response.ok) {
    //   submitted.value = true;
    // } else {
    //   // Display error message to user
    // }
    // ============================================

    // Temporary: Show success UI (replace with actual API integration)
    submitted.value = true;
  });

  const handleNavigate = $((path: string) => {
    nav(path);
  });

  return (
    <div
      class={css({
        minH: "calc(100vh - 70px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bg: "light",
        py: "3rem",
      })}
    >
      <div
        class={css({
          bg: "white",
          p: { base: "2rem", md: "3rem" },
          borderRadius: "12px",
          boxShadow: "lg",
          maxW: "450px",
          w: "full",
          mx: "1rem",
        })}
      >
        {!submitted.value ? (
          <>
            <h1
              class={css({
                fontSize: "2rem",
                fontWeight: "bold",
                mb: "0.5rem",
                textAlign: "center",
              })}
            >
              Forgot Password?
            </h1>
            <p
              class={css({
                textAlign: "center",
                color: "secondary",
                mb: "2rem",
              })}
            >
              Enter your email and we'll send you a reset link
            </p>

            <form onSubmit$={handleSubmit}>
              <div
                class={css({
                  mb: "1.5rem",
                })}
              >
                <label
                  class={css({
                    display: "block",
                    mb: "0.5rem",
                    fontWeight: "semibold",
                  })}
                >
                  Email
                </label>
                <input
                  type="email"
                  required
                  bind:value={email}
                  placeholder="you@example.com"
                  class={css({
                    w: "full",
                    p: "0.75rem",
                    border: "1px solid",
                    borderColor: "gray.300",
                    borderRadius: "6px",
                    fontSize: "1rem",
                    _focus: {
                      outline: "none",
                      borderColor: "gray.800",
                      boxShadow: "0 0 0 3px rgba(37, 99, 235, 0.1)",
                    },
                  })}
                />
              </div>

              <button
                type="submit"
                class={css({
                  w: "full",
                  bg: "gray.800",
                  color: "amber.400",
                  p: "0.875rem",
                  borderRadius: "6px",
                  fontSize: "1.1rem",
                  fontWeight: "semibold",
                  cursor: "pointer",
                  border: "none",
                  mb: "1.5rem",
                  transition: "background 0.2s",
                })}
              >
                Send Reset Link
              </button>

              <p
                class={css({
                  textAlign: "center",
                  color: "secondary",
                })}
              >
                Remember your password?{" "}
                <button
                  type="button"
                  onClick$={() => handleNavigate("/sign-in")}
                  class={css({
                    color: "primary",
                    fontWeight: "semibold",
                    cursor: "pointer",
                    bg: "transparent",
                    border: "none",
                    _hover: { textDecoration: "underline" },
                  })}
                >
                  Sign in
                </button>
              </p>
            </form>
          </>
        ) : (
          <div
            class={css({
              textAlign: "center",
            })}
          >
            <div
              class={css({
                fontSize: "4rem",
                mb: "1rem",
              })}
            >
              ✅
            </div>
            <h2
              class={css({
                fontSize: "1.5rem",
                fontWeight: "bold",
                mb: "1rem",
              })}
            >
              Check Your Email
            </h2>
            <p
              class={css({
                color: "secondary",
                mb: "2rem",
              })}
            >
              We've sent a password reset link to <strong>{email.value}</strong>
            </p>
            <button
              onClick$={() => handleNavigate("/sign-in")}
              class={css({
                bg: "gray.800",
                color: "white",
                px: "2rem",
                py: "0.75rem",
                borderRadius: "6px",
                fontSize: "1rem",
                fontWeight: "semibold",
                cursor: "pointer",
                border: "none",
                transition: "background 0.2s",
              })}
            >
              Back to Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Forgot Password - PTI",
  meta: [
    {
      name: "description",
      content: "Reset your PTI account password",
    },
  ],
};
