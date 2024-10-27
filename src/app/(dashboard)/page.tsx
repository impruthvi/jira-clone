import { getCurrent } from "@/features/auth/actions";
import { redirect } from "next/navigation";

type Props = {};

const Home = async (props: Props) => {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  return <div>This is a home page</div>;
};

export default Home;
