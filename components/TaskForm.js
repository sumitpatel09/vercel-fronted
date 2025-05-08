import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router';

export default function TaskForm({ onSubmit, initialData = null, users = [], onCancelEdit }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Medium',
    status: 'Pending',
    assignedTo: '',
  });

  const router = useRouter();

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        dueDate: initialData.dueDate ? initialData.dueDate.substring(0, 10) : '',
        priority: initialData.priority || 'Medium',
        status: initialData.status || 'Pending',
        assignedTo: initialData.assignedTo?._id || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleCancel = () => {
    if (onCancelEdit) {
      onCancelEdit();
    } else {
      router.push('/tasklist');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-light mb-4">
      <h5>{initialData ? 'Edit Task' : 'Create Task'}</h5>

      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input
          name="title"
          id="title"
          className="form-control"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea
          name="description"
          id="description"
          className="form-control"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="dueDate" className="form-label">Due Date</label>
        <input
          type="date"
          name="dueDate"
          id="dueDate"
          className="form-control"
          value={formData.dueDate}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="priority" className="form-label">Priority</label>
        <select
          name="priority"
          id="priority"
          className="form-select"
          value={formData.priority}
          onChange={handleChange}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="status" className="form-label">Status</label>
        <select
          name="status"
          id="status"
          className="form-select"
          value={formData.status}
          onChange={handleChange}
        >
          <option>Pending</option>        
          <option>In Progress</option>
          <option>Completed</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="assignedTo" className="form-label">Assigned To</label>
        <select
          name="assignedTo"
          id="assignedTo"
          className="form-select"
          value={formData.assignedTo}
          onChange={handleChange}
        >
          <option value="">Unassigned</option>
          {users.map(user => (
            <option key={user._id} value={user._id}>
              {user.username}
            </option>
          ))}
        </select>
      </div>

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary">
          {initialData ? 'Update Task' : 'Create Task'}
        </button>
        {initialData && (
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
