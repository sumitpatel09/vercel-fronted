import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function TaskList({ tasks, onEdit, onDelete }) {
  const [filter, setFilter] = useState({
    status: '',
    priority: '',
    search: '',
  });

  const filteredTasks = tasks.filter(task => {
    const matchesStatus = filter.status ? task.status === filter.status : true;
    const matchesPriority = filter.priority ? task.priority === filter.priority : true;
    const matchesSearch = filter.search
      ? task.title.toLowerCase().includes(filter.search.toLowerCase()) ||
        (task.description && task.description.toLowerCase().includes(filter.search.toLowerCase()))
      : true;
    return matchesStatus && matchesPriority && matchesSearch;
  });

  return (
    <div className="mt-4">
      {/* Filter Section */}
      <div className="row mb-3 g-2">
        <div className="col-md-4">
          <input
            className="form-control"
            placeholder="Search by title or description"
            value={filter.search}
            onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          >
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={filter.priority}
            onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
          >
            <option value="">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      {/* Task Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Due Date</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Assigned To</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.length > 0 ? (
              filteredTasks.map(task => (
                <tr key={task._id}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</td>
                  <td>{task.priority}</td>
                  <td>{task.status}</td>
                  <td>{task.assignedTo ? task.assignedTo.username : 'Unassigned'}</td>
                  <td>
                    <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(task._id)}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => onDelete(task._id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">No tasks found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}