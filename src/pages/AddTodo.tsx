import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { ADD_TODOS } from "../gql/todos";
import Btn from "../ui/btn";
import RadioBtn from "../ui/radio-btn";
function AddTodo() {
  const [addTodo, { loading, data, error }] = useMutation(ADD_TODOS);
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formdata = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formdata);
    
    addTodo({
      variables: {
        ...formValues,
        due_date: formValues.due_date + ", " + formValues.due_time,
      },
    });
  };
  if (data) {
    toast.success(data.createTodo.message, {
      transition: Bounce,
    });
    navigate("/");
  }
  if (error) {
    toast.error(error.message);
  }
  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex flex-col items-center min-w-[300px] justify-center w-fit mx-auto my-auto p-5 px-7 bg-white rounded-xl shadow-xl">
          <h1 className="sm:text-3xl text-2xl font-bold mb-5">Add Todo</h1>
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
                  />
                  <RadioBtn
                    value="in_progress"
                    groupName="status"
                    labelText="In Progress"
                    className="bg-blue-500"
                  />
                  <RadioBtn
                    value="completed"
                    groupName="status"
                    labelText="Completed"
                    className="bg-green-500"
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
                  />
                  <RadioBtn
                    value="MEDIUM"
                    groupName="priority"
                    labelText="Medium"
                    className="bg-yellow-500"
                  />
                  <RadioBtn
                    value="LOW"
                    groupName="priority"
                    labelText="Low"
                    className="bg-gray-500"
                  />
                </div>
              </fieldset>
            </div>
            <div className="flex items-center justify-center mb-2 flex-col gap-4">
              <Btn ClassName="bg-blue-600 w-52 px-4 py-2 text-white font-semibold">
                <input
                  type="submit"
                  value={loading ? "Loading..." : "Submit"}
                  disabled={loading}
                />
              </Btn>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTodo;
