"use client";

import { useCurrent } from "@/features/auth/api/use-current";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/features/auth/api/use-logout";

type Props = {};

const Home = (props: Props) => {
  const router = useRouter();
  const { data, isLoading } = useCurrent();
  const { mutate } = useLogout();
  useEffect(() => {
    if (!isLoading && !data) {
      router.push("/sign-in");
    }
  }, [data]);
  return (
    <div>
      Only authenticated users can see this page.
      <Button onClick={() => mutate()}>Logout</Button>
    </div>
  );
};

export default Home;
