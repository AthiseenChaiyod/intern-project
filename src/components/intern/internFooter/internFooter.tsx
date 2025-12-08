import { component$, $ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { css } from "~/styled-system/css";
import { flex, grid } from "~/styled-system/patterns";

export default component$(() => {
  //* VARIABLE DECLARATION
  const nav = useNavigate();

  //* REUSABLE LOGIC
  const handleNavigate = $((path: string) => {
    nav(path);
  });

  return (
    <footer
      class={css({
        bg: "dark",
        color: "white",
        mt: "auto",
      })}
    >
      <div
        class={css({
          maxW: "1400px",
          mx: "auto",
          px: { base: "1rem", md: "2rem" },
          py: { base: "2rem", md: "3rem" },
        })}
      >
        <div
          class={grid({
            columns: { base: 1, sm: 2, md: 4 },
            gap: { base: "2rem", md: "3rem" },
            pb: "2rem",
          })}
        >
          <div>
            <h3
              class={css({
                fontSize: "1.25rem",
                fontWeight: "bold",
                mb: "1rem",
                color: "amber.400",
              })}
            >
              Park Tech Innovations
            </h3>
            <p class={css({ color: "gray.400", lineHeight: 1.6 })}>
              Leading provider of intelligent car parking solutions and access
              control systems.
            </p>
          </div>

          <div>
            <h4
              class={css({
                fontSize: "1rem",
                fontWeight: "semibold",
                mb: "1rem",
                color: "amber.400",
              })}
            >
              Quick Links
            </h4>
            <div class={flex({ direction: "column", gap: "0.5rem" })}>
              <button
                onClick$={() => handleNavigate("/")}
                class={css({
                  bg: "transparent",
                  border: "none",
                  color: "gray.400",
                  textAlign: "left",
                  cursor: "pointer",
                  _hover: { color: "amber.300" },
                  transition: "color 0.2s",
                })}
              >
                Home
              </button>
              <button
                onClick$={() => handleNavigate("/product")}
                class={css({
                  bg: "transparent",
                  border: "none",
                  color: "gray.400",
                  textAlign: "left",
                  cursor: "pointer",
                  _hover: { color: "amber.300" },
                  transition: "color 0.2s",
                })}
              >
                Products
              </button>
              <button
                onClick$={() => handleNavigate("/blog")}
                class={css({
                  bg: "transparent",
                  border: "none",
                  color: "gray.400",
                  textAlign: "left",
                  cursor: "pointer",
                  _hover: { color: "amber.300" },
                  transition: "color 0.2s",
                })}
              >
                Blog
              </button>
              <button
                onClick$={() => handleNavigate("/contact")}
                class={css({
                  bg: "transparent",
                  border: "none",
                  color: "gray.400",
                  textAlign: "left",
                  cursor: "pointer",
                  _hover: { color: "amber.300" },
                  transition: "color 0.2s",
                })}
              >
                Contact
              </button>
            </div>
          </div>

          <div>
            <h4
              class={css({
                fontSize: "1rem",
                fontWeight: "semibold",
                mb: "1rem",
                color: "amber.400",
              })}
            >
              Products
            </h4>
            <div class={flex({ direction: "column", gap: "0.5rem" })}>
              <p
                class={css({
                  color: "gray.400",
                  fontSize: "0.9rem",
                  _hover: { cursor: "pointer", color: "amber.300" },
                })}
                onClick$={() => nav("/products/1")}
              >
                Car Parking System
              </p>
              <p
                class={css({
                  color: "gray.400",
                  fontSize: "0.9rem",
                  _hover: { cursor: "pointer", color: "amber.300" },
                })}
              >
                Turnstiles Gate
              </p>
              <p
                class={css({
                  color: "gray.400",
                  fontSize: "0.9rem",
                  _hover: { cursor: "pointer", color: "amber.300" },
                })}
              >
                Software & Application
              </p>
              <p
                class={css({
                  color: "gray.400",
                  fontSize: "0.9rem",
                  _hover: { cursor: "pointer", color: "amber.300" },
                })}
              >
                Visitor Management
              </p>
              <p
                class={css({
                  color: "gray.400",
                  fontSize: "0.9rem",
                  _hover: { cursor: "pointer", color: "amber.300" },
                })}
              >
                Parking Guidance
              </p>
            </div>
          </div>

          <div>
            <h4
              class={css({
                fontSize: "1rem",
                fontWeight: "semibold",
                mb: "1rem",
                color: "amber.400",
              })}
            >
              Contact Info
            </h4>
            <div class={flex({ direction: "column", gap: "0.5rem" })}>
              <p class={css({ color: "gray.400", fontSize: "0.9rem" })}>
                Email: info@parktechinnovations.co.th
              </p>
              <p class={css({ color: "gray.400", fontSize: "0.9rem" })}>
                Phone: 02-117-4329
              </p>
              <p class={css({ color: "gray.400", fontSize: "0.9rem" })}>
                Address: 7/1, Soi Onnut 74/1 Yaek 1, Onnut Road Prawet District,
                Bangkok 10250, Thailand
              </p>
            </div>
          </div>
        </div>

        <div
          class={css({
            borderTop: "1px solid",
            borderColor: "gray.700",
            pt: "2rem",
            textAlign: "center",
          })}
        >
          <p class={css({ color: "gray.400", fontSize: "0.9rem" })}>
            Park Tech Innovations © 2025 | All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
});
