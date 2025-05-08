export default function NotificationList({ notifications, onMarkRead }) {
  return (
    <div>
      <h2>Notifications</h2>
      {notifications.length === 0 && <p>No new notifications</p>}
      <ul>
        {notifications.map(notification => (
          <li key={notification._id}>
            <p>{notification.message}</p>
            <button onClick={() => onMarkRead(notification._id)}>Mark as read</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
