import { component$, useSignal, $, useContext } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { roleContext, usernameContext } from "~/routes/layout";
import { css } from "~/styled-system/css";
import { flex } from "~/styled-system/patterns";

export default component$(() => {
  const nav = useNavigate();
  const isMenuOpen = useSignal(false);

  const role = useContext(roleContext);
  const user = useContext(usernameContext);

  const toggleMenu = $(() => {
    isMenuOpen.value = !isMenuOpen.value;
  });

  const handleNavigate = $((path: string) => {
    nav(path);
    isMenuOpen.value = false;
  });

  return (
    <nav
      class={css({
        position: "sticky",
        top: 0,
        zIndex: 1000,
        bg: "white",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      })}
    >
      <div
        class={css({
          maxW: "1400px",
          mx: "auto",
          px: { base: "1rem", md: "2rem" },
        })}
      >
        <div
          class={flex({
            justify: "space-between",
            align: "center",
            h: "70px",
          })}
        >
          <button
            onClick$={() => handleNavigate("/")}
            class={css({
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "amber.400",
              p: "0.5rem",
              cursor: "pointer",
              bg: "gray.800",
              borderRadius: "lg",
            })}
          >
            PTI
          </button>

          <div
            class={css({
              display: { base: "none", md: "flex" },
              gap: "2rem",
              alignItems: "center",
            })}
          >
            <button
              onClick$={() => handleNavigate("/")}
              class={css({
                cursor: "pointer",
                bg: "transparent",
                border: "none",
                fontSize: "1rem",
                color: "dark",
                _hover: { color: "amber.400" },
                transition: "color 0.2s",
              })}
            >
              Home
            </button>
            <button
              onClick$={() => handleNavigate("/products")}
              class={css({
                cursor: "pointer",
                bg: "transparent",
                border: "none",
                fontSize: "1rem",
                color: "dark",
                _hover: { color: "amber.400" },
                transition: "color 0.2s",
              })}
            >
              Products
            </button>
            <button
              onClick$={() => handleNavigate("/blog")}
              class={css({
                cursor: "pointer",
                bg: "transparent",
                border: "none",
                fontSize: "1rem",
                color: "dark",
                _hover: { color: "amber.400" },
                transition: "color 0.2s",
              })}
            >
              Blog
            </button>
            <button
              onClick$={() => handleNavigate("/contact")}
              class={css({
                cursor: "pointer",
                bg: "transparent",
                border: "none",
                fontSize: "1rem",
                color: "dark",
                _hover: { color: "amber.400" },
                transition: "color 0.2s",
              })}
            >
              Contact
            </button>

            {role.value !== "guest" ? (
              <button
                onClick$={async () => {
                  await fetch("http://localhost:4000/sign-out", {
                    method: "POST",
                    credentials: "include",
                  });

                  handleNavigate("/sign-in");
                  role.value = "guest";
                }}
                class={css({
                  cursor: "pointer",
                  bg: "gray.800",
                  color: "amber.400",
                  border: "none",
                  px: "1.5rem",
                  py: "0.5rem",
                  borderRadius: "6px",
                  fontSize: "1rem",
                  fontWeight: "semibold",
                  transition: "background 0.2s",
                })}
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick$={() => handleNavigate("/sign-in")}
                class={css({
                  cursor: "pointer",
                  bg: "gray.800",
                  color: "amber.400",
                  border: "none",
                  px: "1.5rem",
                  py: "0.5rem",
                  borderRadius: "6px",
                  fontSize: "1rem",
                  fontWeight: "semibold",
                  transition: "background 0.2s",
                })}
              >
                Sign In
              </button>
            )}
          </div>

          <button
            onClick$={toggleMenu}
            class={css({
              display: { base: "block", md: "none" },
              bg: "transparent",
              border: "none",
              fontSize: "1.5rem",
              cursor: "pointer",
              color: "dark",
            })}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>

        <div
          class={css({
            display: { base: "flex", md: "none" },
            flexDirection: "column",
            gap: "1rem",
            pb: "1rem",
            maxHeight: isMenuOpen.value ? "500px" : "0",
            overflow: "hidden",
            transition: "max-height 0.3s ease",
          })}
        >
          <button
            onClick$={() => handleNavigate("/")}
            class={css({
              cursor: "pointer",
              bg: "transparent",
              border: "none",
              fontSize: "1rem",
              color: "dark",
              textAlign: "left",
              py: "0.5rem",
              _hover: { color: "amber.400" },
            })}
          >
            Home
          </button>
          <button
            onClick$={() => handleNavigate("/products")}
            class={css({
              cursor: "pointer",
              bg: "transparent",
              border: "none",
              fontSize: "1rem",
              color: "dark",
              textAlign: "left",
              py: "0.5rem",
              _hover: { color: "amber.400" },
            })}
          >
            Products
          </button>
          <button
            onClick$={() => handleNavigate("/blog")}
            class={css({
              cursor: "pointer",
              bg: "transparent",
              border: "none",
              fontSize: "1rem",
              color: "dark",
              textAlign: "left",
              py: "0.5rem",
              _hover: { color: "amber.400" },
            })}
          >
            Blog
          </button>
          <button
            onClick$={() => handleNavigate("/contact")}
            class={css({
              cursor: "pointer",
              bg: "transparent",
              border: "none",
              fontSize: "1rem",
              color: "dark",
              textAlign: "left",
              py: "0.5rem",
              _hover: { color: "amber.400" },
            })}
          >
            Contact
          </button>

          {role.value !== "guest" ? (
            <button
              onClick$={async () => {
                await fetch("http://localhost:4000/sign-out", {
                  method: "POST",
                  credentials: "include",
                });

                handleNavigate("/sign-in");

                user.value = "";
                role.value = "guest";

                console.log("out username:", user.value);
                console.log("out role", role.value);
              }}
              class={css({
                cursor: "pointer",
                bg: "gray.800",
                color: "amber.400",
                border: "none",
                px: "1.5rem",
                py: "0.5rem",
                borderRadius: "6px",
                fontSize: "1rem",
                fontWeight: "semibold",
                transition: "background 0.2s",
              })}
            >
              Sign Out
            </button>
          ) : (
            <button
              onClick$={() => handleNavigate("/sign-in")}
              class={css({
                cursor: "pointer",
                bg: "gray.800",
                color: "amber.400",
                border: "none",
                px: "1.5rem",
                py: "0.5rem",
                borderRadius: "6px",
                fontSize: "1rem",
              })}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
});
