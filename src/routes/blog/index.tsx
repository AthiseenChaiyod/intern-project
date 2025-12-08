import { component$, $, useSignal, useContext } from "@builder.io/qwik";
import { routeLoader$, useNavigate } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import { css } from "~/styled-system/css";
import { flex, grid } from "~/styled-system/patterns";
import { roleContext } from "../layout";

export const usePost = routeLoader$(async () => {
  const response = await fetch("http://localhost:4000/post/get", {
    method: "GET",
  });
  const body = await response.json();

  return body.data;
});

export default component$(() => {
  const nav = useNavigate();
  const displayedPostsCount = useSignal(6);

  const posts = usePost().value;

  const role = useContext(roleContext);

  const handleNavigate = $((path: string) => {
    nav(path);
  });

  const handleSeeMore = $(() => {
    displayedPostsCount.value += 6;
  });

  const displayedPosts = posts.slice(0, displayedPostsCount.value);
  const hasMorePosts = displayedPostsCount.value < posts.length;

  return (
    <>
      <div
        class={css({
          bg: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
          color: "white",
          py: { base: "3rem", md: "4rem" },
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
            class={css({
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
            })}
          >
            <div>
              <h1
                class={css({
                  fontSize: { base: "2rem", md: "3rem" },
                  fontWeight: "bold",
                  mb: "1rem",
                  color: "amber.400",
                })}
              >
                Blog
              </h1>
              <p
                class={css({
                  fontSize: { base: "1rem", md: "1.2rem" },
                  opacity: 0.9,
                })}
              >
                Insights and updates from the world of parking solutions
              </p>
            </div>
            {role.value === "admin" && (
              <button
                onClick$={() => handleNavigate("/blog/create")}
                class={css({
                  bg: "amber.400",
                  color: "gray.800",
                  px: "1.5rem",
                  py: "0.75rem",
                  borderRadius: "6px",
                  fontSize: "1rem",
                  fontWeight: "semibold",
                  cursor: "pointer",
                  border: "none",
                  _hover: {
                    transform: "translateY(-2px)",
                    boxShadow: "lg",
                    color: "gray.800",
                  },
                  transition: "all 0.2s",
                })}
              >
                Create Post
              </button>
            )}
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
          {posts.length ? (
            <div
              class={grid({
                columns: { base: 1, sm: 2, md: 3 },
                gap: "2rem",
              })}
            >
              {displayedPosts.map((post: any) => (
                <div
                  key={post.id}
                  onClick$={() => handleNavigate(`/blog/${post.id}`)}
                  class={css({
                    bg: "white",
                    borderRadius: "12px",
                    boxShadow: "md",
                    overflow: "hidden",
                    _hover: { transform: "translateY(-4px)", boxShadow: "lg" },
                    transition: "all 0.3s",
                    cursor: "pointer",
                  })}
                >
                  <div
                    class={css({
                      p: "1.5rem",
                    })}
                  >
                    <div
                      class={css({
                        display: "inline-block",
                        bg: "amber.400",
                        color: "gray.800",
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
                    <h2
                      class={css({
                        fontSize: "1.25rem",
                        fontWeight: "bold",
                        mb: "0.75rem",
                        color: "dark",
                      })}
                    >
                      {post.title}
                    </h2>
                    <p
                      class={css({
                        color: "secondary",
                        mb: "1rem",
                        lineHeight: 1.6,
                      })}
                    >
                      {post.excerpt}
                    </p>
                    <div
                      class={css({
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: "0.875rem",
                        color: "secondary",
                        pt: "1rem",
                        borderTop: "1px solid",
                        borderColor: "gray.200",
                      })}
                    >
                      <span>{post.author}</span>
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
                </div>
              ))}
            </div>
          ) : (
            <div
              class={css({
                textAlign: "center",
                mt: "3rem",
                p: "2rem",
                color: "secondary",
                fontSize: "1rem",
              })}
            >
              There is no post left to show!
            </div>
          )}

          {hasMorePosts && (
            <div
              class={flex({
                justify: "center",
                mt: "3rem",
              })}
            >
              <button
                onClick$={handleSeeMore}
                class={css({
                  bg: "amber.400",
                  color: "gray.800",
                  px: "3rem",
                  py: "1rem",
                  borderRadius: "8px",
                  fontSize: "1.05rem",
                  fontWeight: "semibold",
                  cursor: "pointer",
                  border: "none",
                  _hover: { transform: "translateY(-2px)" },
                  transition: "all 0.2s",
                })}
              >
                See More Blog Posts
              </button>
            </div>
          )}

          {!hasMorePosts && displayedPosts.length > 6 && (
            <div
              class={css({
                textAlign: "center",
                mt: "3rem",
                p: "2rem",
                color: "secondary",
                fontSize: "1rem",
              })}
            >
              You've reached the end of all blog posts!
            </div>
          )}
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Blog - PTI",
  meta: [
    {
      name: "description",
      content:
        "Read the latest insights and updates about parking solutions and technology",
    },
  ],
};
