import { component$, useSignal, $ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import { css } from "~/styled-system/css";

export default component$(() => {
  const nav = useNavigate();
  const name = useSignal("");
  const email = useSignal("");
  const password = useSignal("");
  const confirmPassword = useSignal("");

  const handleNavigate = $((path: string) => {
    nav(path);
  });

  return (
    <section
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
              Username *
            </label>
            <input
              type="text"
              required
              bind:value={name}
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
              Password *
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
              Confirm Password *
            </label>
            <input
              type="password"
              required
              bind:value={confirmPassword}
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
            })}
            onClick$={async () => {
              const result = await fetch("http://localhost:4000/sign-up", {
                body: JSON.stringify({
                  username: name.value,
                  password: password.value,
                  email: email.value,
                }),
                method: "POST",
                credentials: "include",
              });

              console.log((await result.json()).message);
            }}
          >
            Create Account
          </button>

          <p
            class={css({
              textAlign: "center",
              color: "secondary",
            })}
          >
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
    </section>
  );
});

export const head: DocumentHead = {
  title: "Sign Up - PTI",
  meta: [
    {
      name: "description",
      content: "Create a PTI account",
    },
  ],
};
