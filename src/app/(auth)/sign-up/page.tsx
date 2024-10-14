import { getCurrent } from "@/features/auth/actions";
import SignUpCard from "@/features/auth/components/sign-up-card";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const SignUpPage = async (props: Props) => {
  const user = await getCurrent();

  if (user) return redirect("/");
  return <SignUpCard />;
};

export default SignUpPage;
