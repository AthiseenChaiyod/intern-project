import { component$, useSignal, $, useContext } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { roleContext, usernameContext } from "~/routes/layout";
import { css } from "~/styled-system/css";
import { flex } from "~/styled-system/patterns";

export default component$(() => {
  const nav = useNavigate();

  const role = useContext(roleContext);
  const user = useContext(usernameContext);

  const isMenuOpen = useSignal(false);

  const toggleMenu = $(() => {
    isMenuOpen.value = !isMenuOpen.value;
  });

  const handleNavigate = $((path: string) => {
    nav(path);
    isMenuOpen.value = false;
  });

  const handleSignOut = $(async () => {
    await fetch("http://localhost:4000/sign-out", {
      method: "POST",
      credentials: "include",
    });

    user.value = "";
    role.value = "guest";
    handleNavigate("/sign-in");
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
          <div
            onClick$={() => handleNavigate("/")}
            class={css({
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "6px",

              _hover: { opacity: 0.9 },
            })}
          >
            <img
              src="/pti.jpg"
              alt="PTI Logo"
              class={css({
                height: "2.5rem",
                width: "auto",
                objectFit: "contain",
              })}
            />
          </div>

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
              })}
            >
              Contact
            </button>

            {role.value !== "guest" && user.value ? (
              <div class={flex({ align: "center", gap: "1rem" })}>
                <span class={css({ color: "gray.700", fontWeight: "medium" })}>
                  Hi, {user.value}
                </span>
                <button
                  onClick$={handleSignOut}
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
                  })}
                >
                  Sign Out
                </button>
              </div>
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
          >
            ☰
          </button>
        </div>

        <div
          class={css({
            display: { base: "flex", md: "none" },
            flexDirection: "column",
            gap: "1rem",
            maxHeight: isMenuOpen.value ? "500px" : "0",
            overflow: "hidden",
            transition: "max-height 0.3s ease",
            pb: isMenuOpen.value ? "1rem" : "0",
          })}
        >
          <button
            onClick$={() => handleNavigate("/")}
            class={css({
              textAlign: "left",
              py: "0.5rem",
              color: "dark",
              bg: "transparent",
              border: "none",
              _hover: { color: "amber.400" },
            })}
          >
            Home
          </button>
          <button
            onClick$={() => handleNavigate("/products")}
            class={css({
              textAlign: "left",
              py: "0.5rem",
              color: "dark",
              bg: "transparent",
              border: "none",
              _hover: { color: "amber.400" },
            })}
          >
            Products
          </button>
          <button
            onClick$={() => handleNavigate("/blog")}
            class={css({
              textAlign: "left",
              py: "0.5rem",
              color: "dark",
              bg: "transparent",
              border: "none",
              _hover: { color: "amber.400" },
            })}
          >
            Blog
          </button>
          <button
            onClick$={() => handleNavigate("/contact")}
            class={css({
              textAlign: "left",
              py: "0.5rem",
              color: "dark",
              bg: "transparent",
              border: "none",
              _hover: { color: "amber.400" },
            })}
          >
            Contact
          </button>

          {role.value !== "guest" && user.value ? (
            <>
              <div
                class={css({
                  px: "0.5rem",
                  py: "0.75rem",
                  color: "gray.700",
                  fontWeight: "medium",
                  borderTop: "1px solid",
                  borderColor: "gray.200",
                })}
              >
                Hi, {user.value}
              </div>
              <button
                onClick$={handleSignOut}
                class={css({
                  mx: "0.5rem",
                  bg: "gray.800",
                  color: "amber.400",
                  border: "none",
                  px: "1.5rem",
                  py: "0.75rem",
                  borderRadius: "6px",
                  fontWeight: "semibold",
                })}
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              onClick$={() => handleNavigate("/sign-in")}
              class={css({
                mx: "0.5rem",
                bg: "gray.800",
                color: "amber.400",
                border: "none",
                px: "1.5rem",
                py: "0.75rem",
                borderRadius: "6px",
                fontWeight: "semibold",
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
