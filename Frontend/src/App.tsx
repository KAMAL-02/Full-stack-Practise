import AddTask from "./components/AddTask"
import ViewTasks from "./components/ViewTasks"

const App = () => {
  return (
    <div className="flex justify-evenly items-center">
      <AddTask />
      <ViewTasks />
    </div>
  )
}

export default App
