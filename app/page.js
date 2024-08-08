"use client";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  const navigate = (page) => {
    router.push(page);
  };

  return (
    <section>
      <h1>useRouter</h1>
      <button className="border px-2 py-4" onClick={() => navigate("about")}>
        Go to About Page
      </button> 
      <button className="border px-2 py-4" onClick={() => navigate("login")}>
        Go TO login Page
      </button>
    </section>
  );
};

export default page;
