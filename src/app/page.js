import { createClient } from "@/utils/supabase/client";

export default async function Home() {
  const supabase = createClient();
  const { data: projects } = await supabase.from("portfolio").select();
  console.log(projects);

  return (
   <>
      <h1>Welcome to the Minimal Portfolio Website.</h1>
      <ul>
        {
          projects.map(p=> 
          <li key={p.id}>
            <h3>{p.title}</h3>
            <p>{p.content}</p>
          </li>)
        }
      </ul>
   </>
  );
}
