import { component$, useSignal, $, useContext } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import { css } from "~/styled-system/css";
import { flex } from "~/styled-system/patterns";
import { roleContext, usernameContext } from "../layout";

export default component$(() => {
  const nav = useNavigate();
  const username = useSignal("");
  const password = useSignal("");

  const role = useContext(roleContext);
  const user = useContext(usernameContext);

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

        <div>
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
              Username
            </label>
            <input
              type="text"
              required
              bind:value={username}
              placeholder="username"
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

          <div
            class={css({
              mb: "1rem",
            })}
          >
            <label
              class={css({
                display: "block",
                mb: "0.5rem",
                fontWeight: "semibold",
              })}
            >
              Password
            </label>
            <input
              type="password"
              required
              bind:value={password}
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

          <div
            class={flex({
              justify: "flex-end",
              mb: "1.5rem",
            })}
          >
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
              _hover: { bg: "primaryDark" },
              transition: "background 0.2s",
            })}
            onClick$={async () => {
              const response = await fetch("http://localhost:4000/sign-in", {
                body: JSON.stringify({
                  username: username.value,
                  password: password.value,
                }),
                credentials: "include",
                method: "POST",
              });
              const body = await response.json();

              nav("http://localhost:5173/");

              user.value = body.userData.username;
              role.value = body.userData.role;

              console.log("username:", user.value);
              console.log("role:", role.value);
            }}
          >
            Sign In
          </button>

          <p
            class={css({
              textAlign: "center",
              color: "secondary",
            })}
          >
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
  meta: [
    {
      name: "description",
      content: "Sign in to your PTI account",
    },
  ],
};
