import { component$, $ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import { css } from "~/styled-system/css";
import { flex, grid } from "~/styled-system/patterns";
import {
  LuDoorClosed,
  LuZap,
  LuLockKeyhole,
  LuMonitorSmartphone,
  LuCar,
  LuLayoutDashboard,
  LuUserCheck,
  LuArrowUpDown,
} from "@qwikest/icons/lucide";

export default component$(() => {
  const nav = useNavigate();

  const handleNavigate = $((path: string) => {
    nav(path);
  });

  return (
    <>
      <div
        class={css({
          bg: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
          color: "white",
          py: { base: "3rem", md: "5rem" },
        })}
      >
        <div
          class={css({
            maxW: "1400px",
            mx: "auto",
            px: { base: "1rem", md: "2rem" },
            textAlign: "center",
          })}
        >
          <h1
            class={css({
              fontSize: { base: "2rem", sm: "2.5rem", md: "3.5rem" },
              fontWeight: "bold",
              mb: "1.5rem",
              color: "amber.400",
            })}
          >
            Smart Parking Solutions for Modern Cities
          </h1>
          <p
            class={css({
              fontSize: { base: "1rem", md: "1.25rem" },
              mb: "2rem",
              maxW: "800px",
              mx: "auto",
              opacity: 0.9,
            })}
          >
            Revolutionize your parking management with our cutting-edge access
            control systems and intelligent parking solutions.
          </p>
          <div
            class={flex({
              gap: "1rem",
              justify: "center",
              flexWrap: "wrap",
            })}
          >
            <button
              onClick$={() => handleNavigate("/products")}
              class={css({
                bg: "amber.400",
                color: "gray.800",
                px: "2rem",
                py: "0.75rem",
                borderRadius: "8px",
                fontSize: "1.1rem",
                fontWeight: "semibold",
                cursor: "pointer",
                border: "none",
                transition: "all 0.2s",

                _hover: { transform: "translateY(-2px)", boxShadow: "lg" },
              })}
            >
              View Products
            </button>
            <button
              onClick$={() => handleNavigate("/contact")}
              class={css({
                bg: "transparent",
                color: "amber.400",
                px: "2rem",
                py: "0.75rem",
                borderRadius: "8px",
                fontSize: "1.1rem",
                fontWeight: "semibold",
                cursor: "pointer",
                borderWidth: "2px",
                transition: "all 0.2s",

                _hover: { bg: "amber.400", color: "gray.800" },
              })}
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>

      <div
        class={css({
          py: { base: "3rem", md: "5rem" },
          bg: "light",
        })}
      >
        <div
          class={css({
            maxW: "1400px",
            mx: "auto",
            px: { base: "1rem", md: "2rem" },
          })}
        >
          <h2
            class={css({
              fontSize: { base: "1.75rem", md: "2.5rem" },
              fontWeight: "bold",
              textAlign: "center",
              mb: "3rem",
            })}
          >
            Our Products
          </h2>
          <div
            class={grid({
              columns: { base: 1, sm: 2, md: 3 },
              gap: "2rem",
            })}
          >
            <div
              class={css({
                bg: "white",
                p: "2rem",
                borderRadius: "12px",
                boxShadow: "md",
                transition: "all 0.3s",

                _hover: { transform: "translateY(-4px)", boxShadow: "lg" },
              })}
            >
              <div
                class={css({
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "3rem",
                  mb: "1rem",
                  textAlign: "center",
                })}
              >
                <LuCar />
              </div>
              <h3
                class={css({
                  fontSize: "1.25rem",
                  fontWeight: "semibold",
                  mb: "0.75rem",
                  textAlign: "center",
                })}
              >
                Car Parking System
              </h3>
              <p
                class={css({
                  color: "secondary",
                  textAlign: "center",
                })}
              >
                Advanced automated parking systems with barrier gates and access
                control for seamless vehicle management.
              </p>
            </div>

            <div
              class={css({
                bg: "white",
                p: "2rem",
                borderRadius: "12px",
                boxShadow: "md",
                transition: "all 0.3s",

                _hover: { transform: "translateY(-4px)", boxShadow: "lg" },
              })}
            >
              <div
                class={css({
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "3rem",
                  mb: "1rem",
                  textAlign: "center",
                })}
              >
                <LuDoorClosed />
              </div>
              <h3
                class={css({
                  fontSize: "1.25rem",
                  fontWeight: "semibold",
                  mb: "0.75rem",
                  textAlign: "center",
                })}
              >
                Turnstiles Gate
              </h3>
              <p
                class={css({
                  color: "secondary",
                  textAlign: "center",
                })}
              >
                High-security turnstile gates for pedestrian access control in
                parking facilities and commercial buildings.
              </p>
            </div>

            <div
              class={css({
                bg: "white",
                p: "2rem",
                borderRadius: "12px",
                boxShadow: "md",
                transition: "all 0.3s",

                _hover: { transform: "translateY(-4px)", boxShadow: "lg" },
              })}
            >
              <div
                class={css({
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "3rem",
                  mb: "1rem",
                  textAlign: "center",
                })}
              >
                <LuLayoutDashboard />
              </div>
              <h3
                class={css({
                  fontSize: "1.25rem",
                  fontWeight: "semibold",
                  mb: "0.75rem",
                  textAlign: "center",
                })}
              >
                Software & Application
              </h3>
              <p
                class={css({
                  color: "secondary",
                  textAlign: "center",
                })}
              >
                Comprehensive parking management software with real-time
                monitoring and reporting capabilities.
              </p>
            </div>

            <div
              class={css({
                bg: "white",
                p: "2rem",
                borderRadius: "12px",
                boxShadow: "md",
                transition: "all 0.3s",

                _hover: { transform: "translateY(-4px)", boxShadow: "lg" },
              })}
            >
              <div
                class={css({
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "3rem",
                  mb: "1rem",
                  textAlign: "center",
                })}
              >
                <LuUserCheck />
              </div>
              <h3
                class={css({
                  fontSize: "1.25rem",
                  fontWeight: "semibold",
                  mb: "0.75rem",
                  textAlign: "center",
                })}
              >
                Visitor Management
              </h3>
              <p
                class={css({
                  color: "secondary",
                  textAlign: "center",
                })}
              >
                Streamlined visitor registration and tracking system for
                enhanced security and convenience.
              </p>
            </div>

            <div
              class={css({
                bg: "white",
                p: "2rem",
                borderRadius: "12px",
                boxShadow: "md",
                transition: "all 0.3s",

                _hover: { transform: "translateY(-4px)", boxShadow: "lg" },
              })}
            >
              <div
                class={css({
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "3rem",
                  mb: "1rem",
                  textAlign: "center",
                })}
              >
                <LuArrowUpDown />
              </div>
              <h3
                class={css({
                  fontSize: "1.25rem",
                  fontWeight: "semibold",
                  mb: "0.75rem",
                  textAlign: "center",
                })}
              >
                Parking Guidance
              </h3>
              <p
                class={css({
                  color: "secondary",
                  textAlign: "center",
                })}
              >
                Smart parking guidance system to help drivers find available
                spaces quickly and efficiently.
              </p>
            </div>
          </div>
        </div>
      </div>

      <section
        class={css({
          py: { base: "3rem", md: "5rem" },
        })}
      >
        <div
          class={css({
            maxW: "1400px",
            mx: "auto",
            px: { base: "1rem", md: "2rem" },
            textAlign: "center",
          })}
        >
          <h2
            class={css({
              fontSize: { base: "1.75rem", md: "2.5rem" },
              fontWeight: "bold",
              mb: "1.5rem",
            })}
          >
            Why Choose Park Tech Innovation?
          </h2>
          <p
            class={css({
              fontSize: { base: "1rem", md: "1.1rem" },
              color: "secondary",
              mb: "3rem",
              maxW: "800px",
              mx: "auto",
            })}
          >
            We provide innovative parking solutions that combine cutting-edge
            technology with reliability and ease of use.
          </p>
          <div
            class={grid({
              columns: { base: 1, sm: 2, md: 3 },
              gap: "2rem",
            })}
          >
            <div>
              <div
                class={css({
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "2.5rem",
                  mb: "1rem",
                  color: "amber.400",
                })}
              >
                <LuZap />
              </div>
              <h3
                class={css({
                  fontSize: "1.25rem",
                  fontWeight: "semibold",
                  mb: "0.5rem",
                })}
              >
                Fast & Reliable
              </h3>
              <p class={css({ color: "secondary" })}>
                High-performance systems designed for maximum uptime
              </p>
            </div>
            <div>
              <div
                class={css({
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "2.5rem",
                  mb: "1rem",
                  color: "amber.400",
                })}
              >
                <LuLockKeyhole />
              </div>
              <h3
                class={css({
                  fontSize: "1.25rem",
                  fontWeight: "semibold",
                  mb: "0.5rem",
                })}
              >
                Secure
              </h3>
              <p class={css({ color: "secondary" })}>
                Advanced security features to protect your facility
              </p>
            </div>
            <div>
              <div
                class={css({
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "2.5rem",
                  mb: "1rem",
                  color: "amber.400",
                })}
              >
                <LuMonitorSmartphone />
              </div>
              <h3
                class={css({
                  fontSize: "1.25rem",
                  fontWeight: "semibold",
                  mb: "0.5rem",
                })}
              >
                Smart Integration
              </h3>
              <p class={css({ color: "secondary" })}>
                Seamlessly integrate with existing infrastructure
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
});

export const head: DocumentHead = {
  title: "Home - PTI",
};
