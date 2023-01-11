import { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Tasks from "./Tasks";
import { db } from "./firebase";
import {
	query,
	collection,
	onSnapshot,
	updateDoc,
	doc,
	addDoc,
	deleteDoc,
} from "firebase/firestore";

const style = {
	bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
	container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
	heading: `text-3xl font-bold text-center text-gray-800 p-2`,
	form: `flex justify-between`,
	input: `border p-2 w-full text-xl`,
	button: `border p-4 ml-2 bg-green-600 text-slate-100`,
	count: `text-center p-2`,
	tasksContainer: `overflow-y-auto max-h-96 mt-8`,
};

function App() {
	const [tasks, setTasks] = useState([]);
	const [input, setInput] = useState("");

	//* Create Task
	const createTask = async (e) => {
		e.preventDefault(e);
		if (input !== "") {
			await addDoc(collection(db, "tasks"), {
				text: input,
				completed: false,
			});
		}
		setInput("");
	};

	//* Read Task from Firebase
	useEffect(() => {
		const q = query(collection(db, "tasks"));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			let tasksArr = [];
			querySnapshot.forEach((doc) => {
				tasksArr.push({ ...doc.data(), id: doc.id });
			});
			setTasks(tasksArr);
		});
		return () => unsubscribe;
	}, []);

	//* Update Task in Firebase
	const toggleComplete = async (task) => {
		await updateDoc(doc(db, "tasks", task.id), {
			completed: !task.completed,
		});
	};

	//* Delete Task
	const deleteTask = async (id) => {
		await deleteDoc(doc(db, "tasks", id));
	};

	return (
		<div className={style.bg}>
			<div className={style.container}>
				<h3 className={style.heading}>Task Tracker</h3>
				<form className={style.form} onSubmit={createTask}>
					<input
						type="text"
						placeholder="Add Task..."
						className={style.input}
						value={input}
						onChange={(e) => setInput(e.target.value)}
						maxLength={55}
					/>
					<button className={style.button}>
						<AiOutlinePlus size={30} />
					</button>
				</form>
				<div className={style.tasksContainer}>
					<ul>
						{tasks.map((task, index) => (
							<Tasks
								key={index}
								task={task}
								toggleComplete={toggleComplete}
								deleteTask={deleteTask}
							/>
						))}
					</ul>
				</div>
				<p className={style.count}>
					{tasks.length === 0 ? "" : `You have ${tasks.length} tasks`}
				</p>
			</div>
		</div>
	);
}

export default App;
