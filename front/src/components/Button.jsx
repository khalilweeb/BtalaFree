export default function Button({ children, onClick, type = "button" }) {
    return (
      <button onClick={onClick} type={type} style={{ padding: "8px 16px", margin: "4px" }}>
        {children}
      </button>
    );
  }
  