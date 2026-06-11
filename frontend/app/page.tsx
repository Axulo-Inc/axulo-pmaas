export default function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Axulo PMaaS</h1>
      <p>AI-Powered Project Manager-as-a-Service</p>
      <a href="/wizard">
        <button style={{ padding: '10px 20px', fontSize: '16px' }}>
          Start New Project
        </button>
      </a>
    </div>
  );
}
