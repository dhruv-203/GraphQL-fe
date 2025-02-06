import { useQuery } from "@apollo/client";
import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GET_TODOS_CARDS_DATA } from "../gql/todos";
import { FilterBy, Priority, Status, TodoCardType } from "../types";
import Btn from "../ui/btn";
import Dropdown from "../ui/dropdown";
import TodoCard from "../ui/TodoItem";
function Home() {
  const [sortByDropdown, setSortByDropdown] = useState("created_at: DESC");
  const [variables, setVariables] = useState<{
    filterBy: FilterBy;
    sortBy: { [x: string]: "ASC" | "DESC" };
  }>({
    filterBy: {
      status: null,
      priority: null,
    },
    sortBy: {
      created_at: "DESC",
    },
  });
  const { loading, error, data, refetch } = useQuery<
    {
      todos: TodoCardType[];
    },
    {
      filterBy: FilterBy;
      sortBy: { [key: string]: "ASC" | "DESC" };
    }
  >(GET_TODOS_CARDS_DATA, {
    variables: {
      filterBy: {
        status: null,
        priority: null,
      },
      sortBy: {
        created_at: "ASC",
        due_date: "ASC",
      },
    },
  });

  useEffect(() => {
    refetch(variables);
  }, [variables]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error {JSON.stringify(error)}</div>;
  }

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center gap-3  p-3 xl:flex-row w-full">
          <Btn ClassName="bg-blue-500 hover:bg-blue-700 text-white font-bold  grow max-w-[150px] w-full xl:w-1/4">
            <Link to={"/addTodo"} className="w-full h-full py-2 px-4 block">
              Create Todo
            </Link>
          </Btn>
          {/* status dropdown */}
          <div className="grow  flex px-4 py-2 items-center text-center gap-3 justify-center w-full xl:w-1/5">
            <div className="  font-semibold text-base sm:text-lg px-2 py-2">
              Status
            </div>
            <Dropdown
              data={[
                ["In Progess", "in_progress"],
                ["Completed", "completed"],
                ["Pending", "pending"],
              ]}
              value={variables.filterBy.status}
              handleChange={(e: ChangeEvent<HTMLSelectElement>) => {
                setVariables((prevState) => ({
                  ...prevState,
                  filterBy: {
                    ...prevState.filterBy,
                    status: `${e.target.value}` as Status,
                  },
                }));
              }}
              name="status"
            />
          </div>
          <div className="grow  flex px-4 py-2 items-center text-center gap-3 justify-center w-full xl:w-1/5">
            <div className="  font-semibold text-base sm:text-lg px-2 py-2">
              Priority
            </div>
            <Dropdown
              data={[
                ["High", "HIGH"],
                ["Mediun", "MEDIUM"],
                ["Low", "LOW"],
              ]}
              handleChange={(e: ChangeEvent<HTMLSelectElement>) => {
                setVariables((prevState) => {
                  return {
                    ...prevState,
                    filterBy: {
                      ...prevState.filterBy,
                      priority: `${e.target.value}` as Priority,
                    },
                  };
                });
              }}
              value={variables.filterBy.priority}
              name="priority"
            />
          </div>
          <div className="grow px-4 py-2 flex text-center items-center gap-3 justify-center w-full xl:w-1/5">
            <div className=" font-semibold text-base sm:text-lg px-2 py-2">
              Sort By
            </div>

            <Dropdown
              data={[
                ["Oldest", "created_at: ASC"],
                ["Newly Created", "created_at: DESC"],
                ["Nearest Due Date", "due_date: ASC"],
                ["Farthest Due Date", "due_date: DESC"],
              ]}
              handleChange={(e: ChangeEvent<HTMLSelectElement>) => {
                setSortByDropdown(e.target.value);
                setVariables((prevState) => ({
                  ...prevState,
                  sortBy: {
                    [`${e.target.value.split(": ")[0]}`]: `${
                      e.target.value.split(": ")[1]
                    }` as "ASC" | "DESC",
                  },
                }));
              }}
              value={sortByDropdown}
              name="sort"
            />
          </div>
          <Btn
            ClassName="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 grow max-w-[150px] w-full xl:w-1/4"
            onClick={() => {
              setVariables({
                filterBy: { status: null, priority: null },
                sortBy: { created_at: "ASC", due_date: "ASC" },
              });
            }}
          >
            Clear Filters
          </Btn>
        </div>
        {data &&
          data.todos.map((todo, ind) => (
            <Link key={todo.id} to={`/updateTodo/${todo.id}`}>
              <TodoCard {...{ ...todo, id: ind + 1 }} />
            </Link>
          ))}
      </div>
    </div>
  );
}

export default Home;
