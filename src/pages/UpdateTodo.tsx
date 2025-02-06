import { useLazyQuery, useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { DELETE_TODO, GET_TODO_BY_ID, UPDATE_TODO } from "../gql/todos";
import { Priority, Status, Todo } from "../types";
import Btn from "../ui/btn";
import RadioBtn from "../ui/radio-btn";

function UpdateTodo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fetchTodo, { loading: dataLoading, data, error: dataLoadingError }] =
    useLazyQuery<{ todoById: Todo }, { id: number }>(GET_TODO_BY_ID);
  const [
    updateTodo,
    { loading: updateLoading, data: updateData, error: updateError },
  ] = useMutation<
    {
      updateTodo: { message: string };
    },
    Todo
  >(UPDATE_TODO);
  const [
    deleteTodo,
    { loading: deleteLoading, data: deleteData, error: deleteError },
  ] = useMutation(DELETE_TODO);
  useEffect(() => {
    if (id && !isNaN(+id)) {
      fetchTodo({ variables: { id: +id } });
      
    }
  }, [id]);
  if (!id || isNaN(+id)) {
    return (
      <div className="w-screen h-screen text-9xl flex items-center justify-center">
        Please provide appropriate id
      </div>
    );
  }

  if (dataLoading) {
    return <div>Loading...</div>;
  }

  if (dataLoadingError) {
    return <div>Error {dataLoadingError.message}</div>;
  }

  if (updateError) {
    toast.error(updateError.message, { transition: Bounce });
  }

  if (updateData && !updateError) {
    toast.success(updateData.updateTodo.message, {
      transition: Bounce,
    });
    navigate("/");
  }

  if (deleteError) {
    toast.error(deleteError.message, { transition: Bounce });
  }

  if (deleteData && !deleteError) {
    toast.success(deleteData.deleteTodo.message, {
      transition: Bounce,
    });
    navigate("/");
  }

  if (data === undefined) {
    return <div>Loading yet...</div>;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formdata);
    updateTodo({
      variables: {
        id: +id,
        title: formValues.title as string,
        description: formValues.description as string,
        due_date: formValues.due_date + ", " + formValues.due_time,
        status: formValues.status as Status,
        priority: formValues.priority as Priority,
      },
    });
  };
  const handleDelete = () => {
    deleteTodo({
      variables: {
        id: +id,
      },
    });
  };
  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex flex-col items-center min-w-[300px] justify-center w-fit mx-auto my-auto p-5 px-7 bg-white rounded-xl shadow-xl">
          <h1 className="sm:text-3xl text-2xl font-bold mb-5">Edit Todo</h1>
          <form className="w-full max-w-md" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className="mt-1 block w-full rounded-md px-4 py-2  shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border border-gray-300"
                required
                defaultValue={data?.todoById.title}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                rows={3}
                className="mt-1 px-4 py-2 border block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
                defaultValue={data?.todoById.description}
              ></textarea>
            </div>
            <div className="mb-4 flex flex-col sm:flex-row">
              <div className="mb-4 flex-1 sm:mb-0 sm:mr-4">
                <label
                  htmlFor="due_date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Due Date
                </label>
                <input
                  type="date"
                  name="due_date"
                  id="due_date"
                  className="mt-1 block w-full rounded-md px-4 py-2  shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border border-gray-300"
                  required
                  min={new Date().toISOString().slice(0, 10)}
                  max={new Date(
                    new Date().setFullYear(new Date().getFullYear() + 1)
                  )
                    .toISOString()
                    .slice(0, 10)}
                  defaultValue={data?.todoById.due_date.split(", ")[0]}
                />
              </div>
              <div className="mb-4 flex-1 sm:mb-0 sm:mr-4">
                <label
                  htmlFor="due_time"
                  className="block text-sm font-medium text-gray-700"
                >
                  Due Time
                </label>
                <input
                  type="time"
                  name="due_time"
                  id="due_time"
                  className="mt-1 block w-full rounded-md px-4 py-2  shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border border-gray-300"
                  required
                  defaultValue={data.todoById.due_date
                    .split(", ")[1]
                    .slice(0, 5)}
                />
              </div>
            </div>
            <div className="mb-4">
              <legend className="block text-base text-left  font-medium text-gray-700">
                Status
              </legend>
              <fieldset className="mb-4 rounded-md  border border-gray-300 p-4 rounded-box">
                <div className="flex  items-center justify-center sm:flex-row flex-col gap-4">
                  <RadioBtn
                    value="pending"
                    groupName="status"
                    labelText="Pending"
                    className="bg-yellow-500 "
                    defaultChecked={data?.todoById.status === "pending"}
                  />
                  <RadioBtn
                    value="in_progress"
                    groupName="status"
                    labelText="In Progress"
                    className="bg-blue-500"
                    defaultChecked={data?.todoById.status === "in_progress"}
                  />
                  <RadioBtn
                    value="completed"
                    groupName="status"
                    labelText="Completed"
                    className="bg-green-500"
                    defaultChecked={data?.todoById.status === "completed"}
                  />
                </div>
              </fieldset>
            </div>
            <div className="mb-4">
              <legend className="block text-base text-left   font-medium text-gray-700">
                Priority
              </legend>
              <fieldset className="mb-4 rounded-md  border  border-gray-300 p-4 rounded-box">
                <div className="flex sm:flex-row flex-col items-center justify-center gap-4">
                  <RadioBtn
                    value="HIGH"
                    groupName="priority"
                    labelText="High"
                    className="bg-red-500 "
                    defaultChecked={data?.todoById.priority === "HIGH"}
                  />
                  <RadioBtn
                    value="MEDIUM"
                    groupName="priority"
                    labelText="Medium"
                    className="bg-yellow-500"
                    defaultChecked={data?.todoById.priority === "MEDIUM"}
                  />
                  <RadioBtn
                    value="LOW"
                    groupName="priority"
                    labelText="Low"
                    className="bg-gray-500"
                    defaultChecked={data?.todoById.priority === "LOW"}
                  />
                </div>
              </fieldset>
            </div>
            <div className="flex flex-row items-center  justify-center mb-2 gap-4">
              <input
                type="submit"
                defaultValue={updateLoading ? "Loading..." : "Edit"}
                disabled={updateLoading}
                className="bg-blue-600 grow rounded-lg text-center  text-white font-semibold px-4 py-2"
              />

              <Btn
                onClick={handleDelete}
                disabled={deleteLoading}
                ClassName="bg-red-600 grow px-4 py-2 text-white font-semibold"
              >
                {deleteLoading ? "Loading..." : "Delete"}
              </Btn>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateTodo;
