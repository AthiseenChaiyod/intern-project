import { component$, useSignal, $ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import { LuCheckCircle } from "@qwikest/icons/lucide";
import { css } from "~/styled-system/css";

export default component$(() => {
  const nav = useNavigate();

  const step = useSignal(1);
  const usernameForReset = useSignal("");
  const emailForReset = useSignal("");

  const username = useSignal("");
  const email = useSignal("");
  const newPassword = useSignal("");
  const confirmPassword = useSignal("");

  const errorMessage = useSignal<string | null>(null);
  const isLoading = useSignal(false);

  const handleNavigate = $((path: string) => {
    nav(path);
  });

  const resetForm = $(() => {
    errorMessage.value = null;
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
        {step.value === 4 ? (
          <div
            class={css({
              display: "flex",
              flexDir: "column",
              justifyContent: "center",
              alignItems: "center",
            })}
          >
            <div
              class={css({ fontSize: "4rem", mb: "1rem", color: "success" })}
            >
              <LuCheckCircle />
            </div>
            <h2
              class={css({
                fontSize: "1.75rem",
                fontWeight: "bold",
                mb: "1rem",
                textAlign: "center",
              })}
            >
              Password Changed Successfully!
            </h2>
            <p class={css({ color: "secondary", mb: "2rem" })}>
              You can now sign in with your new password.
            </p>
            <button
              onClick$={() => handleNavigate("/sign-in")}
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
              })}
            >
              Back to Sign In
            </button>
          </div>
        ) : (
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
              {step.value === 1
                ? "Enter your username to begin recovery"
                : step.value === 2
                  ? "Verify your registered email"
                  : "Set your new password"}
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
              {step.value === 1 && (
                <>
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
                      disabled={isLoading.value}
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

                  <button
                    onClick$={async () => {
                      resetForm();
                      if (!username.value.trim()) {
                        errorMessage.value = "Please enter your username";
                        return;
                      }

                      isLoading.value = true;

                      try {
                        const response = await fetch(
                          `http://localhost:4000/user/${username.value}`,
                          {
                            method: "GET",
                            credentials: "include",
                          }
                        );

                        const body = await response.json();
                        usernameForReset.value = body.data[0].username;
                        emailForReset.value = body.data[0].email;

                        if (
                          !response.ok ||
                          username.value !== usernameForReset.value
                        ) {
                          throw new Error("Username not found");
                        }

                        step.value = 2;
                      } catch (err: any) {
                        errorMessage.value =
                          "Username not found. Please try again.";
                      } finally {
                        isLoading.value = false;
                      }
                    }}
                    disabled={isLoading.value}
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
                      mb: "1rem",
                      opacity: isLoading.value ? 0.6 : 1,

                      _disabled: {
                        bg: "gray.200",
                        color: "gray.400",
                        cursor: "default",
                      },
                    })}
                  >
                    {isLoading.value ? "Checking..." : "Next"}
                  </button>
                </>
              )}

              {step.value === 2 && (
                <>
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
                      disabled={isLoading.value}
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
                    onClick$={async () => {
                      resetForm();
                      if (!email.value.trim()) {
                        errorMessage.value = "Please enter your email";
                        return;
                      }

                      isLoading.value = true;

                      try {
                        if (
                          !emailForReset.value ||
                          email.value !== emailForReset.value
                        ) {
                          throw new Error("Invalid email validation");
                        }

                        step.value = 3;
                      } catch (err: any) {
                        errorMessage.value =
                          err.message ||
                          "Email does not match. Please try again.";
                      } finally {
                        isLoading.value = false;
                      }
                    }}
                    disabled={isLoading.value}
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
                      mb: "1rem",
                      opacity: isLoading.value ? 0.6 : 1,

                      _disabled: {
                        bg: "gray.200",
                        color: "gray.400",
                        cursor: "default",
                      },
                    })}
                  >
                    {isLoading.value ? "Verifying..." : "Verify Email"}
                  </button>

                  <button
                    onClick$={() => {
                      resetForm();
                      step.value = 1;
                    }}
                    disabled={isLoading.value}
                    class={css({
                      w: "full",
                      bg: "transparent",
                      color: "gray.600",
                      border: "1px solid",
                      borderColor: "gray.300",
                      p: "0.75rem",
                      borderRadius: "6px",
                      fontSize: "1rem",
                      cursor: "pointer",
                      opacity: isLoading.value ? 0.6 : 1,
                    })}
                  >
                    ← Back
                  </button>
                </>
              )}

              {step.value === 3 && (
                <>
                  <div class={css({ mb: "1.5rem" })}>
                    <label
                      class={css({
                        display: "block",
                        mb: "0.5rem",
                        fontWeight: "semibold",
                      })}
                    >
                      New Password *
                    </label>
                    <input
                      type="password"
                      required
                      bind:value={newPassword}
                      disabled={isLoading.value}
                      placeholder="••••••••"
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
                      Confirm Password *
                    </label>
                    <input
                      type="password"
                      required
                      bind:value={confirmPassword}
                      disabled={isLoading.value}
                      placeholder="••••••••"
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
                    {newPassword.value &&
                      confirmPassword.value &&
                      newPassword.value !== confirmPassword.value && (
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
                    onClick$={async () => {
                      resetForm();
                      if (!newPassword.value || !confirmPassword.value) {
                        errorMessage.value =
                          "Please fill in both password fields";
                        return;
                      }
                      if (newPassword.value !== confirmPassword.value) {
                        errorMessage.value = "Passwords do not match";
                        return;
                      }

                      isLoading.value = true;

                      try {
                        const response = await fetch(
                          "http://localhost:4000/user",
                          {
                            method: "PATCH",
                            credentials: "include",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              username: usernameForReset.value,
                              password: newPassword.value,
                            }),
                          }
                        );

                        if (!response.ok) {
                          throw new Error("Failed to change password");
                        }

                        step.value = 4;
                      } catch (err: any) {
                        errorMessage.value =
                          "Failed to change password. Please try again.";
                      } finally {
                        isLoading.value = false;
                      }
                    }}
                    disabled={
                      isLoading.value ||
                      !newPassword.value ||
                      !confirmPassword.value ||
                      newPassword.value !== confirmPassword.value
                    }
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
                      mb: "1rem",
                      opacity: isLoading.value ? 0.6 : 1,

                      _disabled: {
                        bg: "gray.200",
                        color: "gray.400",
                        cursor: "default",
                      },
                    })}
                  >
                    {isLoading.value
                      ? "Changing Password..."
                      : "Change Password"}
                  </button>

                  <button
                    onClick$={() => {
                      resetForm();
                      step.value = 2;
                    }}
                    disabled={isLoading.value}
                    class={css({
                      w: "full",
                      bg: "transparent",
                      color: "gray.600",
                      border: "1px solid",
                      borderColor: "gray.300",
                      p: "0.75rem",
                      borderRadius: "6px",
                      fontSize: "1rem",
                      cursor: "pointer",
                      opacity: isLoading.value ? 0.6 : 1,
                    })}
                  >
                    ← Back
                  </button>
                </>
              )}

              <p
                class={css({
                  textAlign: "center",
                  color: "secondary",
                  mt: "1.5rem",
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
            </div>
          </>
        )}
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Forgot Password - PTI",
};
