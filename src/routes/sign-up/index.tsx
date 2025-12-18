import { component$, useSignal, $, useComputed$ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import { css } from "~/styled-system/css";
import { LuEye, LuEyeOff } from "@qwikest/icons/lucide";

export default component$(() => {
  const nav = useNavigate();

  const username = useSignal("");
  const email = useSignal("");
  const password = useSignal("");
  const confirmPassword = useSignal("");

  const showPassword = useSignal(false);
  const showConfirmPassword = useSignal(false);

  const errorMessage = useSignal<string | null>(null);
  const isLoading = useSignal(false);

  const handleNavigate = $((path: string) => {
    nav(path);
  });

  const togglePasswordVisibility = $(() => {
    showPassword.value = !showPassword.value;
  });
  const toggleConfirmPasswordVisibility = $(() => {
    showConfirmPassword.value = !showConfirmPassword.value;
  });

  const passwordMatch = useComputed$(() => {
    return (
      password.value &&
      confirmPassword.value &&
      password.value === confirmPassword.value
    );
  });
  const isFormValid = useComputed$(() => {
    return (
      username.value.trim() &&
      email.value.trim() &&
      password.value &&
      confirmPassword.value &&
      passwordMatch.value
    );
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
          maxW: "500px",
          w: "full",
          mx: "1rem",
        })}
      >
        <h1
          class={css({
            fontSize: "2rem",
            fontWeight: "bold",
            mb: "0.5rem",
            textAlign: "center",
          })}
        >
          Create Account
        </h1>
        <p
          class={css({
            textAlign: "center",
            color: "secondary",
            mb: "2rem",
          })}
        >
          Enter the form below
        </p>

        {errorMessage.value && (
          <div
            class={css({
              bg: "red.100",
              color: "red.700",
              p: "0.75rem",
              borderRadius: "6px",
              mb: "1.5rem",
              textAlign: "center",
              fontSize: "0.95rem",
            })}
          >
            {errorMessage.value}
          </div>
        )}

        <div>
          <div class={css({ mb: "1.5rem" })}>
            <label
              class={css({
                display: "block",
                mb: "0.5rem",
                fontWeight: "semibold",
              })}
            >
              Username *
            </label>
            <input
              type="text"
              required
              bind:value={username}
              placeholder="Your username"
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

          <div class={css({ mb: "1.5rem" })}>
            <label
              class={css({
                display: "block",
                mb: "0.5rem",
                fontWeight: "semibold",
              })}
            >
              Email *
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

          <div class={css({ mb: "1.5rem" })}>
            <label
              class={css({
                display: "block",
                mb: "0.5rem",
                fontWeight: "semibold",
              })}
            >
              Password *
            </label>
            <div class={css({ position: "relative" })}>
              <input
                type={showPassword.value ? "text" : "password"}
                required
                bind:value={password}
                placeholder="••••••••"
                class={css({
                  w: "full",
                  pr: "3rem",
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
              <button
                type="button"
                onClick$={togglePasswordVisibility}
                class={css({
                  position: "absolute",
                  right: "0.75rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  bg: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "gray.600",
                  _hover: { color: "gray.800" },
                })}
              >
                {showPassword.value ? <LuEyeOff /> : <LuEye />}
              </button>
            </div>
          </div>

          <div class={css({ mb: "1.5rem" })}>
            <label
              class={css({
                display: "block",
                mb: "0.5rem",
                fontWeight: "semibold",
              })}
            >
              Confirm Password *
            </label>
            <div class={css({ position: "relative" })}>
              <input
                type={showConfirmPassword.value ? "text" : "password"}
                required
                bind:value={confirmPassword}
                placeholder="••••••••"
                class={css({
                  w: "full",
                  pr: "3rem",
                  p: "0.75rem",
                  border: "1px solid",
                  borderColor:
                    password.value &&
                    confirmPassword.value &&
                    password.value !== confirmPassword.value
                      ? "red.500"
                      : "gray.300",
                  borderRadius: "6px",
                  fontSize: "1rem",
                  _focus: {
                    outline: "none",
                    borderColor: "gray.800",
                    boxShadow: "0 0 0 3px rgba(37, 99, 235, 0.1)",
                  },
                })}
              />
              <button
                type="button"
                onClick$={toggleConfirmPasswordVisibility}
                class={css({
                  position: "absolute",
                  right: "0.75rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  bg: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "gray.600",
                  _hover: { color: "gray.800" },
                })}
              >
                {showConfirmPassword.value ? <LuEyeOff /> : <LuEye />}
              </button>
            </div>

            {password.value &&
              confirmPassword.value &&
              password.value !== confirmPassword.value && (
                <p
                  class={css({
                    color: "red.600",
                    fontSize: "0.875rem",
                    mt: "0.5rem",
                  })}
                >
                  Passwords do not match
                </p>
              )}
          </div>

          <button
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
              _hover: { bg: "primaryDark" },
              _disabled: {
                bg: "gray.200",
                color: "gray.400",
                cursor: "default",
              },
              transition: "background 0.2s",
            })}
            disabled={isLoading.value || !isFormValid.value}
            onClick$={async () => {
              errorMessage.value = null;
              isLoading.value = true;

              try {
                const response = await fetch("http://localhost:4000/sign-up", {
                  method: "POST",
                  credentials: "include",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    username: username.value.trim(),
                    email: email.value.trim(),
                    password: password.value,
                  }),
                });

                if (!response.ok) {
                  const errorData = await response.json().catch(() => ({}));
                  throw new Error(
                    errorData.message ||
                      "Sign up failed. Username or email may already be taken."
                  );
                }

                nav("/sign-in");
              } catch (err: any) {
                errorMessage.value =
                  err.message || "Something went wrong. Please try again.";
              } finally {
                isLoading.value = false;
              }
            }}
          >
            {isLoading.value ? "Creating Account..." : "Create Account"}
          </button>

          <p class={css({ textAlign: "center", color: "secondary" })}>
            Already have an account?{" "}
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
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Sign Up - PTI",
};
