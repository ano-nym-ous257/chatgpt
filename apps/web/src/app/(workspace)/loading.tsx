export default function WorkspaceLoading() {
  return (
    <div className="page-container page-stack" aria-label="Loading workspace">
      <div className="loading-block loading-block--title" />
      <div className="loading-grid">
        <div className="loading-block" /><div className="loading-block" /><div className="loading-block" /><div className="loading-block" />
      </div>
      <div className="loading-block loading-block--panel" />
      <span className="sr-only">Loading PaymentFlow workspace…</span>
    </div>
  );
}
