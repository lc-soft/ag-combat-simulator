export default function 按钮({ className = '', ...props }) {
  return (
    <button
      type="button"
      className={['按钮', className].filter(Boolean).join(' ')}
      {...props}
    />
  );
}
