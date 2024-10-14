import { getCurrent } from "@/features/auth/actions";
import SignInCard from "@/features/auth/components/sign-in-card";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const SignInPage = async (props: Props) => {
  const user = await getCurrent();

  if (user) return redirect("/");

  return <SignInCard />;
};

export default SignInPage;
