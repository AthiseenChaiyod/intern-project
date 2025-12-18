import { component$, useSignal, $, useContext } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import { css } from "~/styled-system/css";
import { flex } from "~/styled-system/patterns";
import { roleContext, usernameContext } from "../layout";
import { LuEye, LuEyeOff } from "@qwikest/icons/lucide";

export default component$(() => {
  const nav = useNavigate();

  const user = useContext(usernameContext);
  const role = useContext(roleContext);

  const username = useSignal("");
  const password = useSignal("");
  const showPassword = useSignal(false);
  const errorMessage = useSignal<string | null>(null);
  const isLoading = useSignal(false);

  const handleNavigate = $((path: string) => {
    nav(path);
  });

  const togglePasswordVisibility = $(() => {
    showPassword.value = !showPassword.value;
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
        <h1
          class={css({
            fontSize: "2rem",
            fontWeight: "bold",
            mb: "0.5rem",
            textAlign: "center",
          })}
        >
          Sign In
        </h1>
        <p
          class={css({
            textAlign: "center",
            color: "secondary",
            mb: "2rem",
          })}
        >
          Welcome back to PTI
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
              Username
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

          <div class={css({ mb: "1rem" })}>
            <label
              class={css({
                display: "block",
                mb: "0.5rem",
                fontWeight: "semibold",
              })}
            >
              Password
            </label>
            <div class={css({ position: "relative" })}>
              <input
                type={showPassword.value ? "text" : "password"}
                required
                bind:value={password}
                placeholder="••••••••"
                class={css({
                  w: "full",
                  p: "0.75rem",
                  pr: "3rem",
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

          <div class={flex({ justify: "flex-end", mb: "1.5rem" })}>
            <button
              type="button"
              onClick$={() => handleNavigate("/forgot-password")}
              class={css({
                color: "primary",
                fontSize: "0.9rem",
                cursor: "pointer",
                bg: "transparent",
                border: "none",

                _hover: { textDecoration: "underline" },
              })}
            >
              Forgot password?
            </button>
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
              transition: "background 0.2s",

              _hover: { bg: "primaryDark" },
              _disabled: {
                bg: "gray.200",
                color: "gray.400",
                cursor: "default",
              },
            })}
            disabled={!username.value || !password.value || isLoading.value}
            onClick$={async () => {
              errorMessage.value = null;
              isLoading.value = true;

              try {
                const response = await fetch("http://localhost:4000/sign-in", {
                  method: "POST",
                  credentials: "include",
                  body: JSON.stringify({
                    username: username.value,
                    password: password.value,
                  }),
                });

                const body = await response.json();

                if (!response.ok) {
                  throw new Error(
                    body.message || "Invalid username or password"
                  );
                }

                user.value = body.userData.username;
                role.value = body.userData.role;

                nav("http://localhost:5173/");
              } catch (err: any) {
                errorMessage.value =
                  err.message || "Login failed. Please try again.";
              } finally {
                isLoading.value = false;
              }
            }}
          >
            {isLoading.value ? "Signing In..." : "Sign In"}
          </button>

          <p class={css({ textAlign: "center", color: "secondary" })}>
            Don't have an account?{" "}
            <button
              type="button"
              onClick$={() => handleNavigate("/sign-up")}
              class={css({
                color: "primary",
                fontWeight: "semibold",
                cursor: "pointer",
                bg: "transparent",
                border: "none",
                _hover: { textDecoration: "underline" },
              })}
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Sign In - PTI",
};
