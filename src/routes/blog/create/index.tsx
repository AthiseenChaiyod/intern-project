import { component$, useSignal, $, useContext } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import { usernameContext } from "~/routes/layout";
import { css } from "~/styled-system/css";

export default component$(() => {
  const nav = useNavigate();

  const user = useContext(usernameContext);

  const title = useSignal("");
  const category = useSignal("Technology");
  const excerpt = useSignal("");
  const content = useSignal("");

  const successMessage = useSignal<string | null>(null);
  const errorMessage = useSignal<string | null>(null);
  const isLoading = useSignal(false);

  const handleNavigate = $((path: string) => {
    nav(path);
  });

  // แทนที่ส่วน handlePublish เดิมด้วยอันนี้

  const handlePublish = $(async () => {
    successMessage.value = null;
    errorMessage.value = null;
    isLoading.value = true;

    try {
      const response = await fetch("http://localhost:4000/post", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.value.trim(),
          category: category.value.toLowerCase(),
          excerpt: excerpt.value.trim(),
          content: content.value.trim(),
          author: user.value,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to publish post");
      }

      // สำเร็จ!
      successMessage.value = "Blog post published successfully!";

      // เคลียร์ฟอร์ม
      title.value = "";
      excerpt.value = "";
      content.value = "";
      category.value = "Technology";

      // เลื่อนหน้าไปด้านบนสุดทันที
      window.scrollTo({ top: 0, behavior: "smooth" });

      // ข้อความหายเองหลัง 5 วินาที
      setTimeout(() => {
        successMessage.value = null;
      }, 5000);
    } catch (err: any) {
      errorMessage.value =
        err.message || "Something went wrong. Please try again.";
    } finally {
      isLoading.value = false;
    }
  });

  return (
    <div
      class={css({
        py: { base: "3rem", md: "4rem" },
        bg: "light",
        minH: "calc(100vh - 70px)",
      })}
    >
      <div
        class={css({
          maxW: "900px",
          mx: "auto",
          px: { base: "1rem", md: "2rem" },
        })}
      >
        <div
          class={css({
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: "2rem",
          })}
        >
          <h1
            class={css({
              fontSize: { base: "1.75rem", md: "2.5rem" },
              fontWeight: "bold",
            })}
          >
            Create Blog Post
          </h1>

          <button
            onClick$={() => handleNavigate("/blog")}
            class={css({
              color: "gray.600",
              fontSize: "1rem",
              cursor: "pointer",
              bg: "transparent",
              border: "none",
              _hover: { textDecoration: "underline" },
            })}
          >
            ← Back to Blog
          </button>
        </div>

        {successMessage.value && (
          <div
            class={css({
              bg: "green.100",
              color: "green.800",
              p: "1rem",
              borderRadius: "8px",
              mb: "1.5rem",
              textAlign: "center",
              fontWeight: "medium",
              border: "1px solid",
              borderColor: "green.300",
            })}
          >
            {successMessage.value}
          </div>
        )}

        {errorMessage.value && (
          <div
            class={css({
              bg: "red.100",
              color: "red.800",
              p: "1rem",
              borderRadius: "8px",
              mb: "1.5rem",
              textAlign: "center",
              fontWeight: "medium",
              border: "1px solid",
              borderColor: "red.300",
            })}
          >
            {errorMessage.value}
          </div>
        )}

        <div
          class={css({
            bg: "white",
            p: { base: "1.5rem", md: "2.5rem" },
            borderRadius: "12px",
            boxShadow: "md",
          })}
        >
          <div>
            <div class={css({ mb: "1.5rem" })}>
              <label
                class={css({
                  display: "block",
                  mb: "0.5rem",
                  fontWeight: "semibold",
                })}
              >
                Title *
              </label>
              <input
                type="text"
                required
                bind:value={title}
                placeholder="Enter blog post title"
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
                display: "grid",
                gridTemplateColumns: { base: "1fr", sm: "1fr 1fr" },
                gap: "1.5rem",
                mb: "1.5rem",
              })}
            >
              <div>
                <label
                  class={css({
                    display: "block",
                    mb: "0.5rem",
                    fontWeight: "semibold",
                  })}
                >
                  Category *
                </label>
                <select
                  required
                  bind:value={category}
                  class={css({
                    w: "full",
                    p: "0.75rem",
                    border: "1px solid",
                    borderColor: "gray.300",
                    borderRadius: "6px",
                    fontSize: "1rem",
                    bg: "white",
                    _focus: {
                      outline: "none",
                      borderColor: "gray.800",
                      boxShadow: "0 0 0 3px rgba(37, 99, 235, 0.1)",
                    },
                  })}
                >
                  <option value="Technology">Technology</option>
                  <option value="Business">Business</option>
                  <option value="Security">Security</option>
                  <option value="News">News</option>
                </select>
              </div>

              <div>
                <label
                  class={css({
                    display: "block",
                    mb: "0.5rem",
                    fontWeight: "semibold",
                  })}
                >
                  Author *
                </label>
                <input
                  type="text"
                  value={user.value || "Guest"}
                  disabled
                  class={css({
                    w: "full",
                    p: "0.75rem",
                    fontWeight: "semibold",
                    border: "1px solid",
                    borderColor: "gray.300",
                    borderRadius: "6px",
                    fontSize: "1rem",
                    bg: "gray.50",
                  })}
                />
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
                Excerpt *
              </label>
              <textarea
                required
                rows={3}
                bind:value={excerpt}
                placeholder="A brief summary of your blog post"
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

            <div class={css({ mb: "2rem" })}>
              <label
                class={css({
                  display: "block",
                  mb: "0.5rem",
                  fontWeight: "semibold",
                })}
              >
                Content *
              </label>
              <textarea
                required
                rows={15}
                bind:value={content}
                placeholder="Write your blog post content here..."
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

            <div
              class={css({
                display: "flex",
                gap: "1rem",
                justifyContent: "flex-end",
              })}
            >
              <button
                onClick$={() => handleNavigate("/blog")}
                disabled={isLoading.value}
                class={css({
                  px: "2rem",
                  py: "0.75rem",
                  borderRadius: "6px",
                  fontSize: "1rem",
                  fontWeight: "semibold",
                  cursor: "pointer",
                  bg: "gray.200",
                  color: "gray.700",
                  border: "none",
                  _hover: { bg: "gray.300" },
                  _disabled: { opacity: 0.6, cursor: "not-allowed" },
                })}
              >
                Cancel
              </button>

              <button
                onClick$={handlePublish}
                disabled={
                  isLoading.value ||
                  !title.value.trim() ||
                  !excerpt.value.trim() ||
                  !content.value.trim()
                }
                class={css({
                  px: "2rem",
                  py: "0.75rem",
                  borderRadius: "6px",
                  fontSize: "1rem",
                  fontWeight: "semibold",
                  cursor: "pointer",
                  bg: "amber.400",
                  color: "gray.800",
                  border: "none",
                  _hover: { bg: "amber.500" },
                  _disabled: {
                    bg: "gray.300",
                    color: "gray.500",
                    cursor: "not-allowed",
                  },
                })}
              >
                {isLoading.value ? "Publishing..." : "Publish Post"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Create Blog - PTI",
};
