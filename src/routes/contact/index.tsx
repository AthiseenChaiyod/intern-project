import { component$, useSignal, $ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { css } from "~/styled-system/css";
import { grid } from "~/styled-system/patterns";
import { LuClock, LuMapPin, LuPhone, LuMail } from "@qwikest/icons/lucide";

export default component$(() => {
  const name = useSignal("");
  const email = useSignal("");
  const phone = useSignal("");
  const company = useSignal("");
  const message = useSignal("");

  const handleSubmit = $((e: Event) => {
    e.preventDefault();

    // ============================================
    // TODO: BACKEND INTEGRATION REQUIRED
    // ============================================
    // Integrate with your backend API to submit contact form data
    //
    // const response = await fetch('/api/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     name: name.value,
    //     email: email.value,
    //     phone: phone.value,
    //     company: company.value,
    //     message: message.value
    //   })
    // });
    //
    // if (response.ok) {
    //   // Show success message to user
    //   // Reset form fields
    //   name.value = "";
    //   email.value = "";
    //   phone.value = "";
    //   company.value = "";
    //   message.value = "";
    // } else {
    //   // Handle error (show error message to user)
    // }
    // ============================================

    // Temporary: Reset form (replace with actual API integration)
    name.value = "";
    email.value = "";
    phone.value = "";
    company.value = "";
    message.value = "";
  });

  return (
    <>
      <div
        class={css({
          bg: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
          color: "amber.400",
          py: { base: "3rem", md: "4rem" },
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
              fontSize: { base: "2rem", md: "3rem" },
              fontWeight: "bold",
              mb: "1rem",
            })}
          >
            Contact Us
          </h1>
          <p
            class={css({
              fontSize: { base: "1rem", md: "1.2rem" },
              opacity: 0.9,
              color: "white",
            })}
          >
            Get in touch with our team for inquiries and support
          </p>
        </div>
      </div>

      <section
        class={css({
          py: { base: "3rem", md: "5rem" },
        })}
      >
        <div
          class={css({
            maxW: "1200px",
            mx: "auto",
            px: { base: "1rem", md: "2rem" },
          })}
        >
          <div
            class={grid({
              columns: { base: 1, md: 2 },
              gap: "3rem",
            })}
          >
            <div>
              <h2
                class={css({
                  fontSize: "1.75rem",
                  fontWeight: "bold",
                  mb: "1.5rem",
                })}
              >
                Send Us a Message
              </h2>
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
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    bind:value={name}
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
                    Phone
                  </label>
                  <input
                    type="tel"
                    bind:value={phone}
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
                    Company
                  </label>
                  <input
                    type="text"
                    bind:value={company}
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
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    bind:value={message}
                    class={css({
                      w: "full",
                      p: "0.75rem",
                      border: "1px solid",
                      borderColor: "gray.300",
                      borderRadius: "6px",
                      fontSize: "1rem",
                      resize: "vertical",
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
                    bg: "amber.400",
                    color: "gray.800",
                    p: "0.875rem",
                    borderRadius: "6px",
                    fontSize: "1.1rem",
                    fontWeight: "semibold",
                    cursor: "pointer",
                    border: "none",
                    transition: "background 0.2s",
                    _hover: { bg: "amber.300" },
                  })}
                >
                  Send Message
                </button>
              </form>
            </div>

            <div>
              <h2
                class={css({
                  fontSize: "1.75rem",
                  fontWeight: "bold",
                  mb: "1.5rem",
                })}
              >
                Contact Information
              </h2>

              <div
                class={css({
                  mb: "2rem",
                })}
              >
                <div
                  class={css({
                    bg: "light",
                    p: "1.5rem",
                    borderRadius: "8px",
                    mb: "1rem",
                  })}
                >
                  <h3
                    class={css({
                      display: "flex",
                      flexDir: "row",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontSize: "1.1rem",
                      fontWeight: "semibold",
                      mb: "0.5rem",
                      color: "gray.800",
                    })}
                  >
                    <LuMail /> Email
                  </h3>
                  <p class={css({ color: "secondary" })}>
                    parkpoom.lue@parktechinnovations.co.th
                  </p>
                  <p class={css({ color: "secondary" })}>
                    info@parktechinnovations.co.th
                  </p>
                </div>

                <div
                  class={css({
                    bg: "light",
                    p: "1.5rem",
                    borderRadius: "8px",
                    mb: "1rem",
                  })}
                >
                  <h3
                    class={css({
                      display: "flex",
                      flexDir: "row",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontSize: "1.1rem",
                      fontWeight: "semibold",
                      mb: "0.5rem",
                      color: "gray.800",
                    })}
                  >
                    <LuPhone /> Phone
                  </h3>
                  <p class={css({ color: "secondary" })}>
                    086-306-4298 (Parkpoom)
                  </p>
                  <p class={css({ color: "secondary" })}>
                    02-117-4329 (Office)
                  </p>
                </div>

                <div
                  class={css({
                    bg: "light",
                    p: "1.5rem",
                    borderRadius: "8px",
                    mb: "1rem",
                  })}
                >
                  <h3
                    class={css({
                      display: "flex",
                      flexDir: "row",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontSize: "1.1rem",
                      fontWeight: "semibold",
                      mb: "0.5rem",
                      color: "gray.800",
                    })}
                  >
                    <LuMapPin /> Address
                  </h3>
                  <p class={css({ color: "secondary" })}>
                    7/1, Soi Onnut 74/1
                    <br />
                    Yaek 1, Onnut Road
                    <br />
                    Prawet District, Bangkok 10250
                    <br />
                    Thailand
                  </p>
                </div>

                <div
                  class={css({
                    bg: "light",
                    p: "1.5rem",
                    borderRadius: "8px",
                  })}
                >
                  <h3
                    class={css({
                      display: "flex",
                      flexDir: "row",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontSize: "1.1rem",
                      fontWeight: "semibold",
                      mb: "0.5rem",
                      color: "gray.800",
                    })}
                  >
                    <LuClock /> Business Hours
                  </h3>
                  <p class={css({ color: "secondary" })}>
                    Monday - Friday: 9:00 AM - 5.30 PM
                    <br />
                    Saturday - Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
});

export const head: DocumentHead = {
  title: "Contact Us - PTI",
  meta: [
    {
      name: "description",
      content:
        "Get in touch with PTI for inquiries about our parking solutions",
    },
  ],
};
