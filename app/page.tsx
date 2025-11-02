import ListLink from "@/components/ListLink";
import { todoLists } from "@/data/todoLists";

export default function Home() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex flex-col justify-center gap-2">
        {todoLists.map((list) => (
          <ListLink key={list.id} list={list} />
        ))}
      </div>
    </div>
  );
}
