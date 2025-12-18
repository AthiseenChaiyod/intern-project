import {
  component$,
  useSignal,
  useContext,
  useResource$,
  Resource,
} from "@builder.io/qwik";
import { routeLoader$, useLocation, useNavigate } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import { roleContext, usernameContext } from "~/routes/layout";
import { css } from "~/styled-system/css";

const usePost = routeLoader$(async (loaderEvent) => {
  const response = await fetch(
    `http://localhost:4000/post/get/id/${loaderEvent.params["id"]}`,
    { method: "GET" }
  );
  const body = await response.json();

  return body.data;
});

export default component$(() => {
  const nav = useNavigate();
  const loc = useLocation();

  const post = usePost().value;

  const user = useContext(usernameContext);
  const role = useContext(roleContext);

  const commentContent = useSignal("");

  const commentTrigger = useSignal(0);
  const isCommentLoading = useSignal(false);
  const commentSection = useResource$(async ({ track }) => {
    track(() => commentTrigger.value);

    const response = await fetch(
      `http://localhost:4000/comment/get/${loc.params["id"]}`,
      { method: "GET" }
    );
    const body = await response.json();

    return body.data;
  });

  if (!post) {
    return (
      <div
        class={css({
          py: "4rem",
          px: { base: "1rem", md: "2rem" },
          bg: "light",
          minH: "calc(100vh - 70px)",
        })}
      >
        <div
          class={css({
            maxW: "1400px",
            mx: "auto",
            textAlign: "center",
          })}
        >
          <h1
            class={css({
              fontSize: "2rem",
              fontWeight: "bold",
              mb: "1rem",
            })}
          >
            Post Not Found
          </h1>
          <p
            class={css({
              color: "secondary",
              mb: "2rem",
            })}
          >
            The blog post you're looking for doesn't exist.
          </p>
          <button
            onClick$={() => nav("/blog")}
            class={css({
              bg: "amber.400",
              color: "gray.800",
              px: "2rem",
              py: "0.75rem",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: "semibold",
            })}
          >
            ← Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      class={css({
        py: { base: "2rem", md: "4rem" },
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
        <button
          onClick$={() => nav("/blog")}
          class={css({
            color: "gray.800",
            fontSize: "1rem",
            cursor: "pointer",
            bg: "transparent",
            border: "none",
            mb: "2rem",
            _hover: { textDecoration: "underline" },
            fontWeight: "semibold",
          })}
        >
          ← Back to Blog
        </button>

        <article
          class={css({
            bg: "white",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "md",
            mb: "3rem",
          })}
        >
          <div
            class={css({
              bg: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
              color: "white",
              p: { base: "2rem", md: "3rem" },
            })}
          >
            <div
              class={css({
                display: "inline-block",
                bg: "rgba(255, 255, 255, 0.2)",
                color: "white",
                px: "0.75rem",
                py: "0.25rem",
                borderRadius: "4px",
                fontSize: "0.75rem",
                fontWeight: "semibold",
                mb: "1rem",
              })}
            >
              {post.category}
            </div>
            <h1
              class={css({
                fontSize: { base: "1.75rem", md: "2.5rem" },
                fontWeight: "bold",
                mb: "1rem",
                lineHeight: 1.2,
                color: "amber.400",
              })}
            >
              {post.title}
            </h1>
            <div
              class={css({
                display: "flex",
                gap: "2rem",
                flexWrap: "wrap",
                fontSize: "0.95rem",
                opacity: 0.9,
              })}
            >
              <span>By {post.author}</span>
              <span>
                {new Intl.DateTimeFormat("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",

                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                }).format(new Date(post.date))}
              </span>
            </div>
          </div>

          <div
            class={css({
              p: { base: "2rem", md: "3rem" },
            })}
          >
            <div
              class={css({
                fontSize: "1.1rem",
                lineHeight: 1.8,
                color: "dark",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              })}
            >
              {post.content}
            </div>
          </div>
        </article>

        <div
          class={css({
            bg: "white",
            borderRadius: "12px",
            boxShadow: "md",
            overflow: "hidden",
          })}
        >
          <div
            class={css({
              p: { base: "2rem", md: "3rem" },
              borderBottom: "1px solid",
              borderColor: "gray.200",
            })}
          >
            <h2
              class={css({
                fontSize: "1.75rem",
                fontWeight: "bold",
                mb: "0.5rem",
                color: "dark",
              })}
            >
              Comments
            </h2>
            <p
              class={css({
                color: "secondary",
              })}
            >
              Share your thoughts and feedback on this article
            </p>
          </div>

          <Resource
            value={commentSection}
            onPending={() => (
              <div
                class={css({
                  p: { base: "2rem", md: "3rem" },
                  textAlign: "center",
                  color: "secondary",
                })}
              >
                Loading comments...
              </div>
            )}
            onRejected={() => (
              <div
                class={css({
                  p: { base: "2rem", md: "3rem" },
                  textAlign: "center",
                  color: "red.600",
                })}
              >
                Error loading comments
              </div>
            )}
            onResolved={(comments) => {
              return (
                <div
                  class={css({
                    p: { base: "2rem", md: "3rem" },
                    borderBottom: "1px solid",
                    borderColor: "gray.200",
                  })}
                >
                  {comments.length === 0 ? (
                    <p
                      class={css({
                        color: "secondary",
                        textAlign: "center",
                        py: "2rem",
                      })}
                    >
                      No comments yet. Be the first to comment!
                    </p>
                  ) : (
                    <div
                      class={css({
                        display: "flex",
                        flexDirection: "column",
                        gap: "2rem",
                      })}
                    >
                      {comments.map((comment: any) => (
                        <div
                          key={comment.id}
                          class={css({
                            pb: "2rem",
                            borderBottom: "1px solid",
                            borderColor: "gray.100",
                            _last: {
                              borderBottom: "none",
                              pb: "0",
                            },
                          })}
                        >
                          <div
                            class={css({
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "flex-start",
                              mb: "0.75rem",
                            })}
                          >
                            <div>
                              <h3
                                class={css({
                                  fontWeight: "semibold",
                                  color: "dark",
                                  mb: "0.25rem",
                                })}
                              >
                                {comment.user}
                              </h3>
                              <p
                                class={css({
                                  fontSize: "0.875rem",
                                  color: "secondary",
                                })}
                              >
                                {new Intl.DateTimeFormat("en-US", {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                }).format(new Date(comment.date))}
                              </p>
                            </div>

                            {user.value && comment.user === user.value && (
                              <button
                                onClick$={async () => {
                                  if (
                                    confirm(
                                      "Are you sure you want to delete this comment?"
                                    )
                                  ) {
                                    await fetch(
                                      `http://localhost:4000/comment/${comment.id}`,
                                      {
                                        method: "DELETE",
                                        credentials: "include",
                                      }
                                    );
                                    commentTrigger.value++;
                                  }
                                }}
                                class={css({
                                  color: "red.600",
                                  fontSize: "0.875rem",
                                  bg: "transparent",
                                  border: "none",
                                  cursor: "pointer",
                                  px: "0.75rem",
                                  py: "0.25rem",
                                  borderRadius: "4px",
                                  _hover: { bg: "red.100" },
                                })}
                              >
                                Delete
                              </button>
                            )}
                          </div>
                          <p
                            class={css({
                              color: "dark",
                              lineHeight: 1.6,
                              whiteSpace: "pre-wrap",
                            })}
                          >
                            {comment.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            }}
          />
          {role.value !== "guest" && (
            <div
              class={css({
                p: { base: "2rem", md: "3rem" },
                bg: "light",
              })}
            >
              <h3
                class={css({
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  mb: "1.5rem",
                  color: "dark",
                })}
              >
                Leave a Comment
              </h3>

              <div>
                <div class={css({ mb: "1.5rem" })}>
                  <label
                    class={css({
                      display: "block",
                      mb: "0.5rem",
                      fontWeight: "semibold",
                      color: "dark",
                    })}
                  >
                    Comment *
                  </label>
                  <textarea
                    required
                    rows={5}
                    bind:value={commentContent}
                    placeholder="Share your thoughts..."
                    disabled={isCommentLoading.value}
                    class={css({
                      w: "full",
                      p: "0.75rem",
                      border: "1px solid",
                      borderColor: "gray.300",
                      borderRadius: "6px",
                      fontSize: "1rem",
                      resize: "vertical",
                      bg: "white",
                      _focus: {
                        outline: "none",
                        borderColor: "gray.800",
                        boxShadow: "0 0 0 3px rgba(37, 99, 235, 0.1)",
                      },
                      _disabled: { opacity: 0.7, cursor: "not-allowed" },
                    })}
                  />
                </div>

                <button
                  onClick$={async () => {
                    if (!commentContent.value.trim()) return;

                    isCommentLoading.value = true;
                    try {
                      await fetch("http://localhost:4000/comment", {
                        method: "POST",
                        credentials: "include",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          postId: loc.params["id"],
                          content: commentContent.value.trim(),
                          username: user.value,
                        }),
                      });

                      commentContent.value = "";
                      commentTrigger.value++;
                    } catch {
                      alert("Failed to post comment. Please try again.");
                    } finally {
                      isCommentLoading.value = false;
                    }
                  }}
                  disabled={
                    isCommentLoading.value || !commentContent.value.trim()
                  }
                  class={css({
                    bg: "amber.400",
                    color: "gray.800",
                    px: "2rem",
                    py: "0.75rem",
                    borderRadius: "6px",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "1rem",
                    fontWeight: "semibold",
                    transition: "background 0.2s",
                    _hover: { bg: "amber.500" },
                    _disabled: {
                      bg: "gray.300",
                      color: "gray.500",
                      cursor: "not-allowed",
                    },
                  })}
                >
                  {isCommentLoading.value ? "Posting..." : "Post Comment"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = () => {
  return {
    title: "Blog Post - PTI",
  };
};
