import {
  component$,
  createContextId,
  type Signal,
  Slot,
  useContextProvider,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import { css } from "~/styled-system/css";
import InternNavbar from "~/components/intern/internNavbar/internNavbar";
import InternFooter from "~/components/intern/internFooter/internFooter";

export const roleContext = createContextId<Signal<"user" | "admin" | "guest">>(
  "intern.role-context"
);
export const usernameContext = createContextId<Signal<string>>(
  "intern.username-context"
);
export const postCountContext = createContextId<Signal<number>>(
  "intern.postCount-context"
);

export default component$(() => {
  const role = useSignal<"user" | "admin" | "guest">("guest");
  useContextProvider(roleContext, role);
  const username = useSignal<string>("");
  useContextProvider(usernameContext, username);
  const postCount = useSignal<number>(1);
  useContextProvider(postCountContext, postCount);

  useVisibleTask$(async ({ track, cleanup }) => {
    const response = await fetch("http://localhost:4000/auth-status", {
      method: "GET",
      credentials: "include",
    });
    const body = await response.json();

    role.value = body.userData.role;
    username.value = body.userData.username;
  });

  return (
    <div
      class={css({
        display: "flex",
        flexDirection: "column",
        minH: "screen",
      })}
    >
      <InternNavbar />

      <main
        class={css({
          flex: 1,
        })}
      >
        <Slot />
      </main>

      <InternFooter />
    </div>
  );
});
