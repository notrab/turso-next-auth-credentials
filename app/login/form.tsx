"use client";

import { useFormState, useFormStatus } from "react-dom";
import { loginOrRegister } from "./actions";

export function LoginForm() {
  const [errorMessage, dispatch] = useFormState(loginOrRegister, undefined);

  return (
    <form action={dispatch}>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="jamie@turso.tech"
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Password"
      />
      <SubmitButton />

      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} aria-disabled={pending}>
      Login
    </button>
  );
}
